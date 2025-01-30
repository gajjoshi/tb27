"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { FaPaperPlane } from "react-icons/fa";

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
  const [isWhiteContainerVisible, setIsWhiteContainerVisible] = useState(false); // Control the white container visibility


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
  const groups = ["Crypto", "Stocks", "Forex"]; // List of group names
  const handleGroupClick = (index) => {
    if (isMobile) {
      if (activeGroup === index) {
        // If active group clicked again, deactivate and expand
        setActiveGroup(null);
        setLeftDivWidth("101vw");
        setIsWhiteContainerVisible(false);
      } else {
        // Otherwise, activate clicked group and contract
        setActiveGroup(index);
        setLeftDivWidth("15vw");
  
        // Delay white container appearance for a smooth effect
        setTimeout(() => {
          setIsWhiteContainerVisible(true);
        }, 400); // Delay slightly to match the sliding animation
      }
    } else {
      // For desktop, toggle the active group
      setActiveGroup(index === activeGroup ? null : index);
    }
  };
  


  // Expand the left-div when clicking outside the group buttons
  const handleLeftDivClick = (e) => {
    // if (e.target.closest(".group-item") || e.target.closest(".white-container")) return;

    // // Prevent expansion if the target is a group button
    // if (e.target.closest(".group-item")) return;

    // if (isMobile) {
    //   setLeftDivWidth("101vw"); // Expand the width
    // }
  };



  return (
    <div className="background-container">
      <img
        src="/Assets/Rectangle 79.png"
        alt="Bottom Left"
        className="rect-image"
      />
        <img
    src="/Assets/newflake3.png"
    alt="Bottom Left Decoration"
    className="bottom-left-image"
  />
    <div
  className="left-div"
  style={{
    width: leftDivWidth, // Dynamically set width
    borderRadius: leftDivWidth === "15vw" ? "10px" : "50px", // Decrease border radius in contracted mode
    transition: "width 1s ease-in-out, border-radius 0.5s ease-in-out", // Smooth transition for width and border radius
  }}
  onClick={handleLeftDivClick} // Handle clicks on the left-div
>
  <div
    className="chat-header"
    style={{
      opacity: leftDivWidth === "15vw" ? 0 : 1, // Hide in contracted mode
      transition: "opacity 0.5s ease-in-out", // Smooth fade effect
    }}
  >
    <h2>Community Chat</h2>
    {/* <div className="chat-section-title">Trading</div> */}
  </div>
  <div className="group-list">
    {groups.map((group, index) => (
      <div
        key={index}
        className={`group-item ${activeGroup === index ? "active" : ""}`}
        onClick={() => handleGroupClick(index)}
      >
        <span
          style={{
            opacity: leftDivWidth === "15vw" ? 0 : 1, // Hide text in contracted mode
            transition: "opacity 0.5s ease-in-out", // Smooth fade effect
          }}
        >
          {group}
        </span>
        <span
        style={{
          transform: leftDivWidth === "15vw" ? "translateX(-55px)" : "translateX(0)", // Move pin left
          transition: "transform 0.5s ease-in-out", // Smooth movement
        }}
      >
        📌
      </span>
      </div>
    ))}
  </div>

      {/* White Container */}
      {isWhiteContainerVisible && (
        <div className="white-container">
          <div className="entry-box">
      <input type="text" placeholder="Type Here" />
      <button>
        <FaPaperPlane />
      </button>  
        </div>
        </div>
      )}
        {/* <div className="categories">
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
        </div> */}
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
