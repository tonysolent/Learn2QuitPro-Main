import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../components/firebase';

const QuitSmokingVideos = () => {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (videoCategories && videoCategories.length > 0) {
      return videoCategories[0].name;
    }
    return ""; 
  });

  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

const videoCategories = [
  {
    name: "Motivational Stories",
    videos: [
      { id: '-AT3J-_qwu4', title: "How I quit smoking: Morgan’s story | Ohio State Medical Center" },
      { id: 'vKS-dIj81rk', title: "How I quit smoking: David’s story | Ohio State Medical Center" },
      { id: 'fhHP1o34L-s', title: "Tips From Former Smokers: Laura's Story" },
      { id: 'jcwiZo6k8gw', title: "Donna's story - the benefits of quitting smoking" },
      { id: 'u0iWEmklmCY', title: "Eric’s stop smoking story" },
      { id: 'HFwNLOJ5Ldg', title: "Kath's story - Improvements in health and life through quitting smoking" },
      { id: 'ErNd6iZG-bg', title: "Trying to stop smoking – Brian’s story" },
      { id: 'rly-Ap7QwKs', title: "Quit Stories: Why Corrine Quit Smoking" },
      { id: 'fBWxerA0ef8', title: "She Smoked About Two Packs of Cigarettes a Day for 60 Years… And Quit" },
      { id: 'FmSmcC9qDF4', title: "I Quit Smoking | 100 Day Journey" }
    ]
  
  },
  {
    name: "How-To Guides",
    videos: [
      { id: 'QpnGsasp9j8', title: "How to Quit Smoking, Vaping or Dipping Tobacco | Dr. Andrew Huberman" },
      { id: 'NKE9BQ5QVfE', title: "How to Overcome Cigarette Cravings in 3 Minutes | Nasia Davos" },
      { id: 'qqtfavRqaMk', title: "How to Reprogram Your Mind to Quit Smoking" },
      { id: '6ZuX-gr4LoU', title: "This Is The Best Way To Quit Smoking" },
      { id: 'FdYIvEc7e-0', title: "How to QUIT SMOKING TODAY - 10 STEP GUIDE" },
      { id: '8_mvgaB--L8', title: "Wellness 101 - How to Quit Smoking" },
      { id: 'B7N9JNa0GJQ', title: "Tips to use when trying to quit smoking." },
      { id: '4WYvJ5NJa1M', title: "Quit Smoking | Stop Smoking | How To Quit Smoking" },
      { id: 'z16vhtjWKL0', title: "What is the Single Best Thing You Can Do to Quit Smoking?" },
      { id: 'kJasaMlgzNs', title: "7 ways to get past nicotine cravings" }
    ]
  },
  {
    name: "Health Benefits",
    videos: [
      { id: 'vN1vzXQ-O2s', title: "Health Benefits of Quitting Smoking" },
      { id: 'cFnMfUuHxo8', title: "Quitting smoking - a timeline of health benefits when you stop smoking" },
      { id: 'qbVu-qYLMkY', title: "What Happens When You Stop Smoking? | Benefits of Quitting Smoking | MedBoard" },
      { id: '7JwmrWwfVuk', title: "Quick Benefits of Stopping Smoking" },
      { id: 'o3I0mJ2RfU0', title: "What Happens When You Stop Smoking?" },
      { id: 'fLbQfMmrISE', title: "Quitting Smoking Timeline" },
      { id: 'BM4YW1rQ5qk', title: "The Changes To Your Body When You Quit Smoking For 1 Day, 1 Month, and 1 Year" },
      { id: 'mHB-6FdhkY4', title: "What If You STOP Smoking For 30 Days? (9 Health Benefits)" },
      { id: '_QEuv-Ed2Zw', title: "3 Little Known Benefits of Quitting Smoking" },
      { id: 'D8gygc4boZA', title: "This Is What Happens To Your Body When You Stop Smoking Tobacco" }
    ]
  },
  
];

const commonButtonStyle = {
  backgroundColor: '#d9534f',
  color: 'white',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '5px', 
};


const fetchComments = async () => {
  const fetchedComments = {};
  for (const category of videoCategories) {
    for (const video of category.videos) {
      const querySnapshot = await getDocs(collection(db, 'comments', video.id, 'userComments'));
      fetchedComments[video.id] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  }
  setComments(fetchedComments);
};

useEffect(() => {
  fetchComments();
}, []); 

const handleAddComment = async (videoId) => {
  if (!newComment.trim()) return; 
  try {
    const docRef = await addDoc(collection(db, 'comments', videoId, 'userComments'), {
      text: newComment,
      timestamp: Date.now(),
    });
    setNewComment('');
    
    const newCommentData = { text: newComment, timestamp: Date.now() };
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId] ? [...prevComments[videoId], newCommentData] : [newCommentData]
    }));
  } catch (error) {
    console.error("Could not add comment:", error);
  }
};

const handleDeleteComment = async (videoId, commentId) => {
  try {
    await deleteDoc(doc(db, 'comments', videoId, 'userComments', commentId));
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].filter(comment => comment.id !== commentId)
    }));
    alert("Comment deleted successfully.");
  } catch (error) {
    console.error("Error deleting comment: ", error);
    alert("Failed to delete the comment.");
  }
};

const opts = {
  height: '390',
  width: '640',
  playerVars: { autoplay: 0 },
};

return (
  <div>
    <h1>Quit Smoking Information Videos</h1>
    <div>
      {videoCategories.map((category) => (
        <button
          key={category.name}
          onClick={() => setSelectedCategory(category.name)}
          style={{
            margin: '5px',
            padding: '10px',
            backgroundColor: selectedCategory === category.name ? '#0052cc' : '#e0e9f1', 
            color: selectedCategory === category.name ? 'white' : '#000000',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
    {videoCategories.filter(cat => cat.name === selectedCategory).flatMap(cat =>
      cat.videos.map(video => (
        <div key={video.id}>
          <h3 style={{ fontWeight: 'bold' }}>{video.title}</h3>
          <YouTube videoId={video.id} opts={opts} />
          <div style={{ display: 'flex', alignItems: 'center' }}> 
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment"
            />
            <button
              onClick={() => handleAddComment(video.id)}
              style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#0052cc', color: 'white', border: 'none', cursor: 'pointer' }} // Styled submit button
            >
              Submit Comment
            </button>
          </div>
          {comments[video.id]?.map((comment, index) => (
            <p key={index}>{comment.text}</p>
          ))}
        </div>
      ))
    )}
  </div>
);
};

export default QuitSmokingVideos;