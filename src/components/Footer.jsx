import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Moaz Hany El Mahdy</p>
      <div className="footer-links">
        <a href="mailto:moazhany27@gmail.com" target="_blank" rel="noreferrer">📧 Email</a>
        <a href="https://github.com/EngMoazHany" target="_blank" rel="noreferrer">💻 GitHub</a>
        <a href="https://linkedin.com/in/moazhany27" target="_blank" rel="noreferrer">🔗 LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
