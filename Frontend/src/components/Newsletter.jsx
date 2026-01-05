import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      setMessage('Thank you for signing up!');
      // Handle actual submission here (e.g., send email to server)
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <section id="newsletter" className="section-p1">
      <div className="newstext">
        <h4>Sign Up for Newsletters</h4>
        <p>Get email updates about our latest shop and <span>special offers.</span></p>
      </div>
      <div className="form">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button className="btn normal" onClick={handleSubmit}>Sign Up</button>
        {message && <p className="message">{message}</p>}
      </div>
    </section>
  );
}

export default Newsletter;
