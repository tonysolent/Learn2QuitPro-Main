import React, { useState, useEffect } from 'react';

const healthMilestones = [
    { days: 1, message: "Blood pressure and heart rate drop to normal." },
    { days: 2, message: "Nicotine levels in the bloodstream significantly decrease." },
    { days: 3, message: "Lung function begins to improve." },
    { days: 14, message: "Circulation improves and lung function increases." },
    { days: 30, message: "Coughing and shortness of breath decrease." },
    { days: 60, message: "Risk of heart attack begins to decrease." },
    { days: 90, message: "Lung cilia regrow, increasing the ability to handle mucus." },
    { days: 180, message: "Risk of coronary heart disease is reduced to half that of a smoker's." },
    { days: 365, message: "Risk of coronary heart disease drops to half. Excess risk of heart disease is reduced by half." },
    { days: 730, message: "Risk of heart attack drops to near normal levels." },
    { days: 1095, message: "Risk of stroke falls to that of a non-smoker." },
    { days: 1825, message: "Risk of cancer of the mouth, throat, esophagus, and bladder is halved." },
    { days: 3650, message: "Risk of dying from lung cancer is about half that of a person who is still smoking." },
    { days: 5475, message: "Risk of pancreatic cancer decreases." },
    { days: 7300, message: "Risk of smoking-related cancers (such as lung, mouth, throat, esophagus, bladder, kidney, and pancreas) decreases significantly." },
    { days: 8030, message: "Risk of coronary heart disease is the same as that of a non-smoker." },
];

const calculateDuration = (quitDate) => {
  const today = new Date();
  const quit = new Date(quitDate);
  const diff = today - quit; 
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const calculateSavings = (daysSinceQuit, dailySpend) => {
  return daysSinceQuit * dailySpend;
};

const ProgressTracker = () => {
  const [quitDate, setQuitDate] = useState('');
  const [dailySpend, setDailySpend] = useState(0);
  const [daysSinceQuit, setDaysSinceQuit] = useState(0);
  const [savings, setSavings] = useState(0);
  const [achievedMilestones, setAchievedMilestones] = useState([]);

  useEffect(() => {
    if (quitDate) {
      const duration = calculateDuration(quitDate);
      setDaysSinceQuit(duration);
      setSavings(calculateSavings(duration, dailySpend));
      const milestonesAchieved = healthMilestones.filter(milestone => milestone.days <= duration);
      setAchievedMilestones(milestonesAchieved);
    }
  }, [quitDate, dailySpend]);

  return (
    <div>
      <h2>Quit Smoking Progress Tracker</h2>
      <div>
        <label>Quit Date:</label>
        <input
          type="date"
          value={quitDate}
          onChange={e => setQuitDate(e.target.value)}
        />
      </div>
      <div>
        <label>Daily Spending on Smoking ($):</label>
        <input
          type="number"
          value={dailySpend}
          onChange={e => setDailySpend(Number(e.target.value))}
        />
      </div>
      <div>
        <h3>Your Progress</h3>
        <p>Days since you quit: {daysSinceQuit}</p>
        <p>Total savings: ${savings.toFixed(2)}</p>
        <h4>Health Milestones Achieved</h4>
        {achievedMilestones.length > 0 ? (
          <ul>
            {achievedMilestones.map((milestone, index) => (
              <li key={index}>{milestone.days} days: {milestone.message}</li>
            ))}
          </ul>
        ) : (
          <p>No milestones achieved yet. Keep going!</p>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
