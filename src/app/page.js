import React from "react";
import "./styles.css";
import { Geologica } from 'next/font/google';

const geologica = Geologica({
  subsets: ['latin'], // Include necessary subsets
  weight: ['400', '700'], // Include the required font weights
});


export default function Page() { 
  return (
    <div className="background">
      {/* Navbar */}
      <div className="navbar">
        <img src="/Assets/logo.png" alt="Logo" className="logo" />
        <div className="navbar-items">
    <div>Courses</div>
    <div>About Us</div>
    <div>Contact Us</div>
  </div>
      </div>

      {/* Background Image Container */}
      <div className="container">
        <div className="overlay"></div>
        <div className={`heading-container ${geologica.className}`}>
        <h1 className="main-heading">
          DISCOVER AI <span className="highlight">TRADING</span>
          </h1>
          <p className="sub-heading">
            Revolutionize your trading strategies with cutting-edge AI.
          </p>
          <div className="info-container">
  {/* First Column: Info Box */}
  <div className="info-column">
    <div className="info-box">
      <p>
      Leverage cutting-edge AI technology to stay ahead in the markets. Our bot analyzes market trends and executes trades with precision, ensuring you maximize your profits while minimizing risks. Enjoy a seamless trading experience with our user-friendly interface and comprehensive analytics dashboard      </p>
    </div>
    <button className="small-button">BUY A COURSE NOW</button>
  </div>

  {/* Second Column: Bitcoin Image */}
  <img src="./Assets/btc2.png" alt="Bitcoin Logo" className="btcimage" />

  {/* Third Column: Placeholder (optional) */}
  {/* Third Column: Users and Star Images */}
  <div className="third-column">
    <img src="./Assets/users.png" alt="Users" className="users-image" />
    <img src="./Assets/star.png" alt="Star" className="star-image" />
  </div></div>



        </div>
      </div>

      {/* Add the About Image Below */}
<div className="about-section">
  <img src="./Assets/about4.png" alt="About" className="about-image" />
</div>
<h1 className="testimonials">
  Testimonails
</h1>

<div className="card-container">
  {[...Array(6)].map((_, index) => (
    <div key={index} className="card">
      Card Number {index + 1}
    </div>
  ))}
</div>

    </div>
  );
}
