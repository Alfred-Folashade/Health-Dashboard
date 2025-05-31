import React from 'react';
import styles from './GlucoseLogging.module.css';

const GlucoseLogger = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles['header-info']}>
          <h1 className={styles.title}>Glucose Logger</h1>
          <div className={styles.status}>
            <span className={styles['status-dot']}></span>
            <span className={styles['status-text']}>Ready to Log</span>
          </div>
        </div>
        <div className={styles['date-info']}>
          <div className={styles.today}>Today</div>
          <div className={styles.date}>May 31</div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles['log-form']}>
          <h2 className={styles['section-title']}>Log New Reading</h2>
          
          <div className={styles['form-group']}>
            <label className={styles.label}>Glucose Reading</label>
            <div className={styles['input-with-unit']}>
              <input 
                type="number" 
                className={styles['glucose-input']}
                placeholder="Enter reading"
              />
              <span className={styles.unit}>mmol/L</span>
            </div>
          </div>

          <div className={styles['form-group']}>
            <label className={styles.label}>Test Type</label>
            <select className={styles.select}>
              <option value="">Select test type</option>
              <option value="fasting">Fasting (8+ hours)</option>
              <option value="before-meal">Before Meal</option>
              <option value="after-meal">After Meal (1-2 hours)</option>
              <option value="bedtime">Bedtime</option>
              <option value="random">Random</option>
            </select>
          </div>

          <div className={styles['form-group']}>
            <label className={styles.label}>Date & Time</label>
            <div className={styles['datetime-inputs']}>
              <input type="date" className={styles.input} />
              <input type="time" className={styles.input} />
            </div>
          </div>
          
          <div className={styles['form-group']}>
            <label className={styles.label}>Notes (Optional)</label>
            <textarea 
              className={styles.textarea}
              placeholder="Meal details, medication, exercise, etc..."
              rows="3"
            ></textarea>
          </div>
          
          <div className={styles['form-buttons']}>
            <button className={`${styles.btn} ${styles['btn-primary']}`}>Save Entry</button>
            <button className={`${styles.btn} ${styles['btn-secondary']}`}>Clear Form</button>
          </div>
        </section>

        <section className={styles['action-buttons']}>
          <button className={styles['action-btn']}>
            <span className={styles['btn-icon']}>📊</span>
            View Charts
          </button>
          <button className={styles['action-btn']}>
            <span className={styles['btn-icon']}>📤</span>
            Export Data
          </button>
        </section>

        <section className={styles['recent-entries']}>
          <h3 className={styles['section-title']}>Recent Entries</h3>
          <div className={styles['entries-list']}>
            <div className={`${styles.entry} ${styles.high}`}>
              <div className={styles['entry-details']}>
                <span className={styles.reading}>142 mg/dL</span>
                <span className={styles['test-type']}>After Meal</span>
                <span className={styles.notes}>Pizza dinner</span>
              </div>
              <div className={styles['entry-time']}>
                <span className={styles.time}>2:30 PM</span>
                <span className={styles.day}>Today</span>
              </div>
              <div className={styles['status-indicator']}></div>
            </div>
            
            <div className={`${styles.entry} ${styles.normal}`}>
              <div className={styles['entry-details']}>
                <span className={styles.reading}>98 mg/dL</span>
                <span className={styles['test-type']}>Fasting</span>
                <span className={styles.notes}>Morning reading</span>
              </div>
              <div className={styles['entry-time']}>
                <span className={styles.time}>7:15 AM</span>
                <span className={styles.day}>Today</span>
              </div>
              <div className={styles['status-indicator']}></div>
            </div>
            
            <div className={`${styles.entry} ${styles['very-high']}`}>
              <div className={styles['entry-details']}>
                <span className={styles.reading}>185 mg/dL</span>
                <span className={styles['test-type']}>After Meal</span>
                <span className={styles.notes}>Forgot medication</span>
              </div>
              <div className={styles['entry-time']}>
                <span className={styles.time}>8:20 PM</span>
                <span className={styles.day}>Yesterday</span>
              </div>
              <div className={styles['status-indicator']}></div>
            </div>

            <div className={`${styles.entry} ${styles.normal}`}>
              <div className={styles['entry-details']}>
                <span className={styles.reading}>105 mg/dL</span>
                <span className={styles['test-type']}>Before Meal</span>
                <span className={styles.notes}>Pre-dinner</span>
              </div>
              <div className={styles['entry-time']}>
                <span className={styles.time}>6:45 PM</span>
                <span className={styles.day}>Yesterday</span>
              </div>
              <div className={styles['status-indicator']}></div>
            </div>
          </div>
          
          <button className={styles['view-all-btn']}>View All Entries</button>
        </section>

        <section className={styles.summary}>
          <h3 className={styles['section-title']}>Weekly Summary</h3>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles['stat-value']}>128</div>
              <div className={styles['stat-label']}>Average</div>
              <div className={styles['stat-unit']}>mg/dL</div>
            </div>
            <div className={styles.stat}>
              <div className={styles['stat-value']}>23</div>
              <div className={styles['stat-label']}>Total Entries</div>
              <div className={styles['stat-unit']}>this week</div>
            </div>
            <div className={styles.stat}>
              <div className={styles['stat-value']}>74%</div>
              <div className={styles['stat-label']}>In Target</div>
              <div className={styles['stat-unit']}>goal: 70-140</div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Last sync: Just now</span>
        <span>23 entries this month</span>
      </footer>
    </div>
  );
};

export default GlucoseLogger;
