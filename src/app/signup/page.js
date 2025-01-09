import React from 'react'
// import './styles2.css'
import '../styles2.css'

const page = () => {
  return (
    <div className="popup-overlay">
        <div className="logo-container">
        <img src='./Assets/logo.png' alt="Logo" className="logo" />
      </div>
    <div className="popup-content">
      <h1>Sign In</h1>
      <input type="text" placeholder="Username" className="input-field" />
      <div className="password-field">
        <input type="password" placeholder="Password" className="input-field" />
        {/* <span className="show-password-icon">👁</span> */}
      </div>
      <input type="password" placeholder="Confirm Password" className="input-field" />
      <button className="register-btn">Register</button>
      <p>
        Already signed in? <a href="#" >Continue here.</a>
      </p>
      <hr/>
      <div className="social-buttons">
        <button className="google-btn">Continue with Google</button>
        <button className="apple-btn">Continue with Apple</button>
      </div>
    </div>
    <div className="glitter-container">
        <img src='./Assets/glitter.png' alt="Logo" className="glitter" />
      </div>
  </div>
  )
}

export default page