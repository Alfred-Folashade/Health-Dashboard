import React, { useState } from 'react';
import styles from './GlucoseLogging.module.css';
import axios from 'axios';
import useNavigate from 'react-router-dom';

const GlucoseLogger = () => {
  const[readingData, setReadingData] = useState({reading: '',
   test_type: '', 
   date: '', 
   time: '', 
   notes: ''});

  
  if(readingData.reading<0){
    readingData.reading=0;
  }
  if(readingData.reading>100){
    readingData.reading=100;
  }
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setReadingData(prev => ({
      ...prev, 
      [name]: value
    }));
  }
  const handleSubmit = async() => {
    try {
      
      console.log(readingData)
      const token = localStorage.getItem("token"); 
      console.log("Token:", token);
      const response = await axios.post('http://127.0.0.1:5000/readings-form', {readingData},
      {
        headers: {
          Authorization:`Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
    } catch (error) {
      alert( error);
      console.log(error.response.data)
    }
  }
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
            <label className={styles.label} >Glucose Reading</label>
            <div  className={styles['input-with-unit']}>
              <input 
                type="number" 
                className={styles['glucose-input']}
                placeholder="Enter reading"
                name="reading"
                value={readingData.reading}
                onChange={handleChange}
              />
              <span className={styles.unit}>mmol/L</span>
            </div>
          </div>

          <div className={styles['form-group']}>
            <label className={styles.label}>Test Type</label>
            <select className={styles.select} name="test_type" value={readingData.test_type} onChange={handleChange}>
              <option value="">Select test type</option>
              <option name="fasting" value="fasting">Fasting (8+ hours)</option>
              <option name="before-meal" value="before-meal">Before Meal</option>
              <option name="after-meal" value="after-meal">After Meal (1-2 hours)</option>
              <option name="bedtime" value="bedtime">Bedtime</option>
              <option name="random" value="random">Random</option>
            </select>
          </div>

          <div className={styles['form-group']}>
            <label className={styles.label}>Date & Time</label>
            <div className={styles['datetime-inputs']}>
              <input type="date" name="date" value={readingData.date} onChange={handleChange} className={styles.input} />
              <input type="time" name="time" value={readingData.time} onChange={handleChange} className={styles.input} />
            </div>
          </div>
          
          <div className={styles['form-group']}>
            <label className={styles.label}>Notes (Optional)</label>
            <textarea 
              className={styles.textarea}
              placeholder="Meal details, medication, exercise, etc..."
              name="notes"
              value={readingData.notes}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          
          <div className={styles['form-buttons']}>
            <button onClick={handleSubmit} className={`${styles.btn} ${styles['btn-primary']}` }>Save Entry</button>
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
