
"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Geologica } from "next/font/google";

const geologica = Geologica({
  subsets: ["latin"], // Include necessary subsets
  weight: ["400", "700"], // Include the required font weights
});


export default function Page() {
  // Inside your component
const [isMobile, setIsMobile] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);


useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768); // Mobile width threshold
  handleResize(); // Check on mount
  window.addEventListener("resize", handleResize); // Listen for window resize
  return () => window.removeEventListener("resize", handleResize); // Cleanup
}, []);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize(); // Check on mount
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize); // Cleanup
}, []);
  // State to track the active toggle
  const [activeToggle, setActiveToggle] = useState("COURSE 1");

  // Function to handle toggle activation
  const activateToggle = (course) => {
    setActiveToggle(course);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="background">
  {/* Navbar */}
  <div className="navbar">
        <img src="/Assets/logo.png" alt="Logo" className="logo" />
        {!isMobile && (
          <div className="navbar-items">
            <div>Courses</div>
            <div>About Us</div>
            <div>Contact Us</div>
          </div>
        )}
        {isMobile && (
          <div className="menu-toggle" onClick={toggleMenu}>
            ☰ {/* Hamburger Icon */}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#a">A</a>
        <a href="#b">B</a>
        <a href="#c">C</a>
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
  {isMobile ? (
    <p>
   Leverage cutting-edge AI technology to stay ahead in the markets. Our bot
      analyzes market trends and executes trades with precision, ensuring you
      maximize your profits while minimizing risks. Enjoy a seamless trading
      experience with our user-friendly interface and comprehensive analytics
      dashboard.
    </p>
  ) : (
    <p>
      Leverage cutting-edge AI technology to stay ahead in the markets. Our bot
      analyzes market trends and executes trades with precision, ensuring you
      maximize your profits while minimizing risks. Enjoy a seamless trading
      experience with our user-friendly interface and comprehensive analytics
      dashboard.
    </p>
  )}
</div>

              <button className="small-button">BUY A COURSE NOW</button>
            </div>

            {/* Second Column: Bitcoin Image */}
            <img
              src="./Assets/btc2.png"
              alt="Bitcoin Logo"
              className="btcimage"
            />

            {/* Third Column: Placeholder (optional) */}
            {/* Third Column: Users and Star Images */}
            <div className="third-column">
              <img
                src="./Assets/users.png"
                alt="Users"
                className="users-image"
              />
              <img src="./Assets/star.png" alt="Star" className="star-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Add the About Image Below */}
      <div className="about-section">
        <img src="./ABOUT4.png" alt="About" className="about-image" />
      </div>
      <h1 className="testimonials">Testimonials</h1>
      <div className="testimonial-section">
        <div className="wave-overlay">
          <img src="/./Assets/flake.png" alt="Wave" className="wave-image" />
        </div>
        <div className="card-container">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="card">
              <div className="card-image">
                <img src="./Assets/image 8.png" alt={`Card Image ${index + 1}`} />
              </div>
              <div className="card-content">
                <div className="inner-card">
                  <h2>COURSE</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam aliquet nisi nisi, eu lorem ipsum dolor sit amet.
                  </p>
                  <div className="date">23/12/2024</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Buttons */}
      <h1 className="testimonials">Toggle Courses</h1>
      <div className="toggle-container">
        <button
          className={`toggle-button ${
            activeToggle === "COURSE 1" ? "active" : ""
          }`}
          onClick={() => activateToggle("COURSE 1")}
        >
          COURSE 1
        </button>
        <button
          className={`toggle-button ${
            activeToggle === "COURSE 2" ? "active" : ""
          }`}
          onClick={() => activateToggle("COURSE 2")}
        >
          COURSE 2
        </button>
        <button
          className={`toggle-button ${
            activeToggle === "COURSE 3" ? "active" : ""
          }`}
          onClick={() => activateToggle("COURSE 3")}
        >
          COURSE 3
        </button>
      </div>
      <div className="course-images-container">
  <img
    src="/Assets/course1.png"
    alt="Course 1"
    className={`course-image ${
      activeToggle === "COURSE 1" ? "active-image" : ""
    }`}
  />
  <img
    src="/Assets/course1overview.png"
    alt="Course 1 Overview"
    className={`course-image-overview ${
      activeToggle === "COURSE 1" ? "active-image" : ""
    }`}
  />
</div>





<div className="course-images-container2">
  <img src="/Assets/course2.png" alt="Course 2" className="course-image" />
  <img
    src="/Assets/course2overview.png"
    alt="Course 2 Overview"
    className="course-image-overview"
  />
</div>


<div className="flake-container">
  <img src="/Assets/flake3.png" alt="Flake" className="flake-image" />
</div>
<hr className="bright-yellow-hr" />



<div className="emptycode">

<footer className="footer">
        <div className="contactInfo">
          <h2>Contact Us</h2>
          <p>
            address, lorem ipsum dolor sit amet,<br />
            consectetur adipiscing elit. aliquam
          </p>
          <p>abc@email.com</p>
          <p>xx - xxx - xxxxx</p>
          <p>xx - xxx - xxxxx</p>
        </div>
        <div className="socialLinks">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TWITTER</a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WHATSAPP</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
        </div>
      </footer>
      </div>









    </div>
    
  );
}
