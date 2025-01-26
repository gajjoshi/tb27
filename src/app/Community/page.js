import React from "react";
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
      <img
        src="/Assets/Rectangle 79.png"
        alt="Bottom Left"
        className="rect-image"
      />
      <div className="left-div">
        <div className="chat-header">
          <h2>Community Chat</h2>
          <div className="chat-section-title">Trading</div>
        </div>
        <div className="group-list">
          {/* Groups */}
          <div className="group-item active">
            <span>Group 1</span>
            <span>📌</span>
          </div>
          <div className="group-item">
            <span>Group 2</span>
            <span>📌</span>
          </div>
          <div className="group-item">
            <span>Group 3</span>
            <span>📌</span>
          </div>
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
