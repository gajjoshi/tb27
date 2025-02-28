import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmile,
  faPaperPlane,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaCog,
  FaEnvelope,
  FaHome,
  FaPlus,
  FaTelegramPlane,
  FaUser,
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
    <div>
      <div className="background-container">
        <img
          src="/Assets/Rectangle 79.png"
          alt="Bottom Left"
          className="rect-image"
        />
        <div className="sidebar-icon1"></div>
        <img
          src="/Assets/top.png"
          alt="Top Right"
          className="top-right-image"
        />
        <img
          src="/Assets/chat box.png"
          alt="chatbox img"
          className="sidebar-icon2"
        />
        {/* <img
          src="/Assets/name.png"
          alt="chatbox img"
          className="sidebar-icon2"
        /> */}
        <div className="chat-input">
          <button className="icon-button">
            <FontAwesomeIcon icon={faSmile} />
          </button>
          <input type="text" placeholder="Type here" />
          <button className="icon-button">
            <FontAwesomeIcon icon={faImage} />
          </button>
          <button className="send-button">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          {/* <button><i class="fa fa-paper-plane"></i></button> */}
        </div>
        <div className="sidebar">
          {sidebarIcons.map((item, index) => (
            <div className="sidebar-icon" key={index}>
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default page;
