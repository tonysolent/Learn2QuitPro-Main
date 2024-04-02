import React, { useState } from 'react'; 
import Link from 'next/link'; 

const Layout = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Success Story Submission', path: '/SuccessStorySubmission' },
    { name: 'Success Stories', path: '/SuccessStories' },
    { name: 'Quit Smoking Info', path: '/QuitSmokingInfo' },
    { name: 'Quit Smoking Videos', path: '/QuitSmokingVideos' },
    { name: 'Progress Tracker', path: '/ProgressTracker' },
    { name: 'About Us', path: '/AboutUs' }, 
    
  ];

  return (
    <div>
      {children}
      <footer style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {pages.map((page, index) => (
            <React.Fragment key={page.name}>
              <Link href={page.path} legacyBehavior>
                <a style={{ margin: '5px', color: '#666', textDecoration: 'none' }}>{page.name}</a>
              </Link>
              {index < pages.length - 1 && <span style={{ margin: '5px', color: '#999' }}>|</span>}
            </React.Fragment>
          ))}
        </div>
        {isLoggedIn && <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          &copy; {new Date().getFullYear()} Your E-Commerce Site. All rights reserved.
        </p>}
      </footer>
    </div>
  );
};

export default Layout;
