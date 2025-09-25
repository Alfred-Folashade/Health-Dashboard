import numpy as np
import pandas as pd
from datetime import timedelta
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans

SPIKE_THRESHOLD = 180.0  # mg/dL; adjust per your needs

def readings_to_df(readings):
    # readings: list[GlucoseReading]
    if not readings:
        return pd.DataFrame()
    df = pd.DataFrame([
        {
            "reading_time": r.reading_time,
            "value": float(r.glucose_reading) if r.glucose_reading is not None else np.nan,
            "test_type": (r.test_type or "").lower(),
            "notes": r.notes or "",
        }
        for r in readings
    ])
    df = df.dropna(subset=["value"])
    if df.empty:
        return df
    df = df.sort_values("reading_time").reset_index(drop=True)
    df["hour"] = df["reading_time"].dt.hour
    df["dow"] = df["reading_time"].dt.dayofweek
    df["delta_prev"] = df["value"].diff()
    df["mins_since_prev"] = df["reading_time"].diff().dt.total_seconds().div(60)
    df["rolling_mean_3"] = df["value"].rolling(3, min_periods=1).mean()
    df["rolling_std_3"] = df["value"].rolling(3, min_periods=1).std().fillna(0)
    return df

def spike_labels(df, threshold=SPIKE_THRESHOLD):
    return (df["value"] >= threshold).astype(int)

def build_features(df):
    X = pd.DataFrame({
        "hour": df["hour"],
        "dow": df["dow"],
        "value": df["value"],
        "delta_prev": df["delta_prev"].fillna(0),
        "mins_since_prev": df["mins_since_prev"].fillna(df["mins_since_prev"].median() or 0),
        "rolling_mean_3": df["rolling_mean_3"],
        "rolling_std_3": df["rolling_std_3"],
        "is_fasting": (df["test_type"] == "fasting").astype(int),
        "is_post_meal": (df["test_type"].str.contains("post") | df["test_type"].str.contains("meal")).astype(int),
    }).fillna(0)
    return X

def predict_spike_risk_by_hour(df):
    if df.shape[0] < 20:
        df = df.copy()
        df["is_spike"] = spike_labels(df)
        risks = df.groupby("hour")["is_spike"].mean().reindex(range(24), fill_value=0).fillna(0)
        return risks.to_dict(), {"method": "hourly_fraction", "n": int(df.shape[0])}

    df = df.copy()
    df["is_spike"] = spike_labels(df)
    X = build_features(df)
    y = df["is_spike"]

    if y.nunique() < 2:
        risks = df.groupby("hour")["is_spike"].mean().reindex(range(24), fill_value=0).fillna(0)
        return risks.to_dict(), {"method": "hourly_fraction_single_class", "n": int(df.shape[0])}

    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)

    template = X.median(numeric_only=True).to_dict()
    hour_risks = {}
    for h in range(24):
        feat = template.copy()
        feat["hour"] = h
        prob = float(model.predict_proba(pd.DataFrame([feat]))[:, 1])
        hour_risks[h] = prob

    return hour_risks, {"method": "logistic_regression", "n": int(df.shape[0])}

def suggest_check_times(df, top_k=3):
    risks, meta = predict_spike_risk_by_hour(df)
    risk_series = pd.Series(risks)

    var_by_hour = df.groupby("hour")["rolling_std_3"].mean().reindex(range(24), fill_value=0)

    score = 0.7 * risk_series + 0.3 * (var_by_hour / (var_by_hour.max() or 1))

    hours_sorted = list(score.sort_values(ascending=False).index)
    chosen = []
    for h in hours_sorted:
        if all(abs(h - c) >= 2 for c in chosen):
            chosen.append(h)
        if len(chosen) >= top_k:
            break

    return {
        "hours": chosen,
        "score_by_hour": score.round(3).to_dict(),
        "basis": {"risk_method": meta.get("method"), "weights": {"risk": 0.7, "variability": 0.3}}
    }

def cluster_daily_patterns(df, n_clusters=3, min_days=5):
    if df.empty:
        return {"clusters": [], "centroids": [], "meta": {"n_days": 0}}

    df = df.copy()
    df["date"] = df["reading_time"].dt.date
    df["is_morning"] = df["hour"].between(5, 11)

    daily = df.groupby("date").agg(
        mean=("value", "mean"),
        std=("value", "std"),
        min=("value", "min"),
        max=("value", "max"),
        morning_mean=("is_morning", lambda m: df.loc[m.index, "value"][m].mean() if m.any() else np.nan),
    )
    daily = daily.fillna(method="ffill").fillna(method="bfill")

    if len(daily) < min_days:
        return {"clusters": [], "centroids": [], "meta": {"n_days": int(len(daily)), "reason": "not_enough_days"}}

    feats = daily[["mean", "std", "min", "max", "morning_mean"]].fillna(daily.mean(numeric_only=True))
    k = min(n_clusters, max(1, len(daily) // 2))
    model = KMeans(n_clusters=k, n_init="auto", random_state=42)
    labels = model.fit_predict(feats)

    clusters = [{"date": str(d), "cluster": int(c)} for d, c in zip(daily.index, labels)]
    centroids = pd.DataFrame(model.cluster_centers_, columns=feats.columns).round(2).to_dict(orient="records")
    return {"clusters": clusters, "centroids": centroids, "meta": {"n_days": int(len(daily)), "k": int(k)}}