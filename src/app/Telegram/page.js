"use client";
import React, { useState, useEffect ,useRef} from "react";
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
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref to track last message


  useEffect(() => {
    let socket;
    const connectWebSocket = () => {
      socket = new WebSocket("wss://7695-103-133-248-68.ngrok-free.app");
  
      socket.onopen = () => console.log("WebSocket connected!");
      socket.onmessage = (event) => setMessages((prev) => [...prev, event.data]);

      
      socket.onerror = (error) => console.error("WebSocket Error:", error);
      socket.onclose = () => {
        console.log("WebSocket Disconnected. Reconnecting in 3s...");
        setTimeout(connectWebSocket, 3000);
      };
    };
  
    connectWebSocket();
    return () => socket && socket.close();
  }, []);
  // Function to scroll to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


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
                <div className="message-section">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className="message">{msg}</div>
          ))}
        </div>

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
