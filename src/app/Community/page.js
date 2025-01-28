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
  const [activeGroup, setActiveGroup] = useState(null); // State to track active group
  const [leftDivWidth, setLeftDivWidth] = useState("330px"); // Default width for desktop
  const [isMobile, setIsMobile] = useState(false); // Track if it's mobile view

  // Check for mobile screen on component mount and resize
  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth <= 768;
      setIsMobile(isCurrentlyMobile);

      // Set default width based on screen size
      setLeftDivWidth(isCurrentlyMobile ? "101vw" : "330px");
    };

    handleResize(); // Initial check
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
  const groups = ["Group 1", "Group 2", "Group 3"]; // List of group names

  // Handle group button click
  const handleGroupClick = (index) => {
    setActiveGroup(index); // Toggle active group state
    if (isMobile) {
      setLeftDivWidth("40vw"); // Contract width only on mobile
    }
  };

  // Expand the left-div when clicking outside the group buttons
  const handleLeftDivClick = (e) => {
    // Prevent expansion if the target is a group button
    if (e.target.closest(".group-item")) return;

    if (isMobile) {
      setLeftDivWidth("101vw"); // Expand the width
    }
  };



  return (
    <div className="background-container">
      <img
        src="/Assets/Rectangle 79.png"
        alt="Bottom Left"
        className="rect-image"
      />
      <div
        className="left-div"
        style={{
          width: leftDivWidth, // Dynamically set width
          transition: "width 1s ease-in-out", // Smooth transition
        }}
        onClick={handleLeftDivClick} // Handle clicks on the left-div
      >
       <div className="chat-header">
          <h2>Community Chat</h2>
          <div className="chat-section-title">Trading</div>
        </div>
        <div className="group-list">
          {groups.map((group, index) => (
            <div
              key={index}
              className={`group-item ${activeGroup === index ? "active" : ""}`}
              onClick={() => handleGroupClick(index)}
            >
              <span>{group}</span>
              <span>📌</span>
            </div>
          ))}
        </div>
        <div className="categories">
          <div className="category-item">
            <span>Cryptocurrency</span>
            <span>+</span>
          </div>
          <div className="category-item">
            <span>Stock Market</span>
            <span>+</span>
          </div>
          <div className="category-item">
            <span>Economics</span>
            <span>+</span>
          </div>
        </div>
      </div>
      <img
        src="/Assets/chat box.png"
        alt="chatbox img"
        className="sidebar-icon2"
      />
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
