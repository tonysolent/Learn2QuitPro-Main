import React, { useState } from 'react';
import QuitSmokingQuiz from '../components/QuitSmokingQuiz';

const QuitSmokingInfo = () => {
  const [showQuiz, setShowQuiz] = useState(false); 
  return (
    <div style={{ padding: '20px' }}>
      <h1>Guide to Quitting Smoking</h1>
      
      {showQuiz ? ( 
        <QuitSmokingQuiz onClose={() => setShowQuiz(false)} />
      ) : (
        <>
          <button onClick={() => setShowQuiz(true)} style={{ backgroundColor: '#0052cc', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', marginTop: '10px' }}>
            Take Quit Smoking Quiz
          </button>

          <section>
            <h3>Understanding the Habit</h3>
            <p>
              Smoking is not just a physical addiction to nicotine but also a psychological habit. 
              The first step in quitting is understanding what triggers your smoking - stress, social settings, 
              after meals, etc. Recognize and acknowledge these triggers.
            </p>
          </section>

          <section>
            <h3>Preparing to Quit</h3>
            <p>
              Set a quit date and stick to it. Prepare yourself mentally; quitting smoking is a challenge but 
              also a great opportunity for personal growth. Inform your friends and family about your decision 
              and seek their support.
            </p>
          </section>

          <section>
            <h3>Developing a Quit Plan</h3>
            <p>
              Create a personalized quit plan. This could involve gradually reducing the number of cigarettes, 
              changing your routines, and finding healthy alternatives to smoking. Consider using nicotine replacement 
              therapies (NRT) or consulting a healthcare professional for medications.
            </p>
          </section>

          <section>
            <h3>Managing Cravings and Withdrawal</h3>
            <p>
              Cravings are intense but temporary. When a craving hits, delay, distract, and decide. Delay acting on 
              the urge, distract yourself with another activity, and then decide. Most cravings pass within a few minutes.
              Remember, withdrawal symptoms are a sign that your body is healing.
            </p>
          </section>

          <section>
            <h3>Staying Smoke-Free</h3>
            <p>
              Staying smoke-free is an ongoing process. Avoid triggers where possible, and continue to use your 
              support network. Engage in healthy activities and hobbies to replace smoking. Stay vigilant and 
              remember the reasons why you quit.
            </p>
          </section>

          <section>
            <h3>Seeking Help and Resources</h3>
            <p>
              Don't hesitate to seek help. Many resources are available, from quitlines to support groups. 
              Consult healthcare providers for professional advice and support. Remember, it's okay to seek help, 
              and doing so can significantly increase your chances of success.
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default QuitSmokingInfo;
