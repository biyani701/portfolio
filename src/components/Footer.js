import React from 'react';
import './Contact.css'; // reuse existing footer styles

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="https://linkedin.com" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="/user-guide" className="footer-link">User Guide</a>
        </div>
        <p style={{ color: 'white', fontSize: '0.75rem', marginTop: '0.5rem' }}>
          © {new Date().getFullYear()} Your Project Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
