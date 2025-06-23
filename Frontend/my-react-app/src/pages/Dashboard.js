// dashboards.js

import React from "react";
import styles from "./Dashboard.module.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Activity, Plus, Bell } from "lucide-react";

const glucoseData = [
  { day: "Mon", value: 95 },
  { day: "Tue", value: 110 },
  { day: "Wed", value: 105 },
  { day: "Thu", value: 98 },
  { day: "Fri", value: 115 },
  { day: "Sat", value: 102 },
  { day: "Sun", value: 100 },
];

const mealData = [
  { time: "Breakfast", meals: 3 },
  { time: "Lunch", meals: 5 },
  { time: "Dinner", meals: 4 },
];

const medicationAdherence = [
  { name: "Taken", value: 85 },
  { name: "Missed", value: 15 },
];

const COLORS = ["#34d399", "#f87171"];

const Dashboard = () => {
  const today = new Date().toLocaleDateString();

  return (
    <div className={styles.dashboardApp}>
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.title}>DiaTrack Dashboard</div>
          <div className={styles.status}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>Monitoring active</span>
          </div>
        </div>
        <div className={styles.dateInfo}>
          <div className={styles.today}>Today</div>
          <div className={styles.date}>{today}</div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.summary}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>7.0</div>
              <div className={styles.statLabel}>Avg. Glucose</div>
              <div className={styles.statUnit}>mmol/L</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>6</div>
              <div className={styles.statLabel}>Meals Logged</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>98%</div>
              <div className={styles.statLabel}>Med Adherence</div>
            </div>
          </div>
        </section>

        <section className={styles.visuals}>
          <div className={styles.graphContainer}>
            <div className={styles.sectionTitle}>Weekly Glucose Levels</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={glucoseData}>
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
                <CartesianGrid stroke="#e5e7eb" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.graphContainer}>
            <div className={styles.sectionTitle}>Meals by Time of Day</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mealData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="meals" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.graphContainer}>
            <div className={styles.sectionTitle}>Medication Adherence</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={medicationAdherence}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {medicationAdherence.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className={styles.actionButtons}>
          <button className={styles.actionBtn}>
            <Activity className={styles.btnIcon} /> Log Glucose
          </button>
          <button className={styles.actionBtn}>
            <Plus className={styles.btnIcon} /> Add Meal
          </button>
          <button className={styles.actionBtn}>
            <Bell className={styles.btnIcon} /> Set Reminder
          </button>
        </div>
      </main>

      <footer className={styles.footer}>© 2025 DiaTrack. All rights reserved.</footer>
    </div>
  );
};

export default Dashboard;
