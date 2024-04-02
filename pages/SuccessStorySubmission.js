import React, { useState } from 'react';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../components/firebase';

const commonButtonStyle = {
  backgroundColor: '#0052cc',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  marginTop: '10px', 
};

const SuccessStorySubmission = () => {
  const [story, setStory] = useState('');
  const db = getFirestore();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('You must be logged in to submit a story.');
      return;
    }

    try {
      await addDoc(collection(db, "successStories"), {
        user: auth.currentUser.email,
        story: story,
        timestamp: new Date()
      });
      setStory('');
      alert('Story submitted successfully!');
    } catch (error) {
      console.error('Error submitting story: ', error);
      alert('Failed to submit story.');
    }
  };

  return (
    <div>
      <h2>Submit Your Success Story</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Share your success story"
          rows="6"
          style={{ width: '100%', padding: '10px' }}
        />
        <button type="submit" style={{ ...commonButtonStyle, marginLeft: '100px' }}>
  Submit Story
</button>

      </form>
    </div>
  );
};

export default SuccessStorySubmission;
