"use client";
import React, { useState } from 'react';
// import './styles2.css';
import './styles3.css';


const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

const handleLogin = async () => {
    try {
      const response = await fetch('https://tradingbotgaj-63bedfbb34ac.herokuapp.com/authenticate_user', {  // Updated endpoint
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
        localStorage.setItem('username', username);
        window.location.href = '/Community';  // Redirect to user dashboard
      } else {
        alert(`Error: ${data.error || 'Login failed. Please check your credentials.'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to login.");
    }
  };
  

  return (
    <div className="popup-overlay">
      <div className="logo-container">
        <img src="./Assets/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="popup-content">
        <h1>Log In</h1>
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

        <button className="register-btn" onClick={handleLogin}>
  Sign In
</button>

        <p>
          New here? <a href="/signup">Register Here</a>
        </p>
        <hr />
        {/* <div className="social-buttons">
          <button className="google-btn">Continue with Google</button>
          <button className="apple-btn">Continue with Apple</button>
        </div> */}
      </div>
      <div className="glitter-container">
        <img src="./Assets/glitter.png" alt="Logo" className="glitter" />
      </div>
    </div>
  );
};

export default Page;
