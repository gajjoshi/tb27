
"use client";
import React, { useState } from "react";
import "./styles.css";
import { Geologica } from "next/font/google";

const geologica = Geologica({
  subsets: ["latin"], // Include necessary subsets
  weight: ["400", "700"], // Include the required font weights
});

export default function Page() {
  // State to track the active toggle
  const [activeToggle, setActiveToggle] = useState("COURSE 1");

  // Function to handle toggle activation
  const activateToggle = (course) => {
    setActiveToggle(course);
  };

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
                  Leverage cutting-edge AI technology to stay ahead in the
                  markets. Our bot analyzes market trends and executes trades
                  with precision, ensuring you maximize your profits while
                  minimizing risks. Enjoy a seamless trading experience with our
                  user-friendly interface and comprehensive analytics dashboard{" "}
                </p>
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
          {[...Array(5)].map((_, index) => (
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
  <img src="/Assets/course1.png" alt="Course 1" className="course-image" />
  <img
    src="/Assets/course1overview.png"
    alt="Course 1 Overview"
    className="course-image-overview"
  />
</div>


    </div>
  );
}
