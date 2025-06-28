import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Footer.css';

const Footer = () => {
  const [state, handleSubmit] = useForm("mwpbaykk");

  return (
    <footer className="footer">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2 className="contact-title">Contact Me</h2>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <textarea
          id="message"
          name="message"
          placeholder="Your Message"
          rows="4"
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <button type="submit" disabled={state.submitting}>
          Send Message
        </button>

        {state.succeeded && (
          <p className="success-msg">Thanks! Your message has been sent.</p>
        )}
      </form>

    
      <div className="footer-links">
        <p>© {new Date().getFullYear()} Moaz Hany El Mahdy</p>
        <div className="social">
          <a href="mailto:moazhany27@gmail.com" target="_blank" rel="noreferrer">📧 Email</a>
          <a href="https://github.com/EngMoazHany" target="_blank" rel="noreferrer">💻 GitHub</a>
          <a href="https://linkedin.com/in/moazhany27" target="_blank" rel="noreferrer">🔗 LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
