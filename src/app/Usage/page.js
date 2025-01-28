
"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  FaHome,
  FaPlus,
  FaTelegramPlane,
  FaCog,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

const page = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial screen size when the component mounts
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const sidebarIcons = [
    { icon: <FaHome />, label: "Home" },
    { icon: <FaEnvelope />, label: "Messages" },
    { icon: <FaTelegramPlane />, label: "Send" },
    { icon: <FaPlus />, label: "Add" },
    { icon: <FaCog />, label: "Settings" },
    { icon: <FaUser />, label: "Profile" },
  ];
  return (
    <div className="background-container">
      {/* <div className="rectangle-container"></div> */}
      <img
        src="/Assets/Rectangle 79.png"
        alt="Bottom Left"
        className="rect-image"
      />
      {/* <div className="sidebar">
        <div className="sidebar-icon"> </div>
        <div className="sidebar-icon active"></div>
        <div className="sidebar-icon"></div>
        <div className="sidebar-icon"></div>
        <div className="sidebar-icon"></div>
        <div className="sidebar-icon"></div>
      </div> */}
      <div className="sidebar-icon1"></div>
      <div  className="sidebar-icon3">
      <h1 style={{ fontWeight: "bold" }}>Hi Alex,</h1>
      <p  style={{ fontSize:"0.8em" }}>Welcome to TradeNow...</p>

      </div>
  
      <div className="sidebar-icon2 course2"> 
        <div className="course-card">
          <div className="course-card-left">
            <img
              src="/Assets/bitcoincard.png"
              alt="Course Background"
              className="course-background"
            />
            <div className="course-content">
              <h2 className="course-title">Name of the Course</h2>
              <p className="course-description">Description</p>
              <div className="progress-bar">
                <div className="progress-line"></div>
                <div className="progress-points">
                  <span className="progress-point active">MODULE 1</span>
                  <span className="progress-point">MODULE 2</span>
                  <span className="progress-point">MODULE 3</span>
                </div>
              </div>
            </div>
          </div>
          <div className="course-card-right">
            <button className="finish-course-btn">
              <p>FINISH THE</p> COURSE
            </button>
            <div className="weekly-goals">
              <h3>SET WEEKLY GOALS</h3>
              <p>learn on chosen days</p>
              <div className="days">
                <span className="day active">M</span>
                <span className="day active">T</span>
                <span className="day ">W</span>
                <span className="day active">T</span>
                <span className="day active">F</span>
                <span className="day">S</span>
                <span className="day">S</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-icon2 course3">
        <div className="course-card">
          <div className="course-card-left">
            <img
              src="/Assets/course1card.png"
              alt="Course Background"
              className="course-background"
            />
            <div className="course-content">
              <h2 className="course-title">Name of the Course</h2>
              <p className="course-description">Description</p>
              <div className="progress-bar">
                <div className="progress-line"></div>
                <div className="progress-points">
                  <span className="progress-point active">MODULE 1</span>
                  <span className="progress-point">MODULE 2</span>
                  <span className="progress-point">MODULE 3</span>
                </div>
              </div>
            </div>
          </div>
          <div className="course-card-right">
            <button className="finish-course-btn">
              <p>FINISH THE</p> COURSE
            </button>
            <div className="weekly-goals">
              <h3>SET WEEKLY GOALS</h3>
              <p>learn on chosen days</p>
              <div className="days">
                <span className="day active">M</span>
                <span className="day active">T</span>
                <span className="day ">W</span>
                <span className="day active">T</span>
                <span className="day active">F</span>
                <span className="day">S</span>
                <span className="day">S</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar">
        {sidebarIcons.map((item, index) => (
          <div className="sidebar-icon" key={index}>
            {item.icon}
          </div>
        ))}
      </div>
      <img src="/Assets/top.png" alt="Top Right" className="top-right-image" />
    </div>
  );
};

export default page;
