import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
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

const usernameStyle = {
  fontWeight: 'bold', 
};

const SuccessStories = ({ isAdmin }) => {
  const [stories, setStories] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchStories = async () => {
      const q = query(collection(db, "successStories"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const storiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStories(storiesData);
    };

    fetchStories();
  }, [db]);

  const handleDeleteStory = async (storyId) => {
    try {
      await deleteDoc(doc(db, "successStories", storyId));
      setStories(stories.filter(story => story.id !== storyId));
      alert("Story deleted successfully.");
    } catch (error) {
      console.error("Error deleting story: ", error);
      alert("Failed to delete the story.");
    }
  };

  const getEmailName = (email) => {
    
    const name = email.split('@')[0];
    return name;
  };

  return (
    <div>
      <h2>Success Stories</h2>
      {stories.map(story => (
        <div key={story.id}>
          <p style={usernameStyle}>{getEmailName(story.user)}</p>
          <p>{story.story}</p>
          {isAdmin && (
            <button
              onClick={() => handleDeleteStory(story.id)}
              style={commonButtonStyle}
            >
              Delete Story
            </button>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SuccessStories;
