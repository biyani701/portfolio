import React from 'react';
import './Contact.css'; 

export default function Footer() {
  return (
    // <footer className="footer" style={{
    //   width: '100%',
    //   bottom: 0,
    //   left: 0,
    //   marginTop: '2rem',
    //   position: 'relative', // Changed from potential absolute/fixed positioning
    //   display: 'block' // Ensure it's displayed as a block element
    // }}>
      <div 
        className="container" 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          padding: '1rem', 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          backgroundColor: '#282c34',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a 
            href="https://linkedin.com" 
            className="footer-link" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com" 
            className="footer-link" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            GitHub
          </a>
          <a 
            href="/user-guide" 
            className="footer-link"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            User Guide
          </a>
        </div>
        <p style={{ color: 'white', fontSize: '0.75rem', margin: '0.5rem 0 0' }}>
          © {new Date().getFullYear()} Your Project Name. All rights reserved.
        </p>
      </div>    
  );
}