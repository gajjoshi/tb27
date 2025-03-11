"use client";
import React, { useState } from 'react';
// import './styles2.css';
import '../styles2.css';


const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('https://tradingbotgaj-63bedfbb34ac.herokuapp.com/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
                // Store username in localStorage
                localStorage.setItem('username', username);
                // Use window.location to navigate to /user page
                window.location.href = '/user';  // Redirect to /user page
      } else {
        alert(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register user.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="logo-container">
        <img src="./Assets/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="popup-content">
        <h1>Sign In</h1>
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="password-field">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>
        <p>
          Already signed in? <a href="/login">Continue here.</a>
        </p>
        <hr />
        <div className="social-buttons">
          <button className="google-btn">Continue with Google</button>
          <button className="apple-btn">Continue with Apple</button>
        </div>
      </div>
      <div className="glitter-container">
        <img src="./Assets/glitter.png" alt="Logo" className="glitter" />
      </div>
    </div>
  );
};

export default Page;
