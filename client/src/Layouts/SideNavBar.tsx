import React, { useState } from "react";
import "./SideNavBar.css";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  const [activeLink, setActiveLink] = useState(""); // Initialize activeLink state

  // Function to handle the click event and set the active link
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const handleLogoClick = () => {
    setActiveLink("");
  };

  return (
    <div className="sidenav-container">
      <div className="nav-logo">
        <Link to={"/"} onClick={handleLogoClick}>
          <i className="fa-solid fa-users-viewfinder "></i>
        </Link>
      </div>

      <div className="nav-icons">
        <Link
          to={"/survey-blog"}
          onClick={() => handleLinkClick("/survey-blog")}
          className="nav-links"
        >
          <i
            className={`fa-solid fa-square-poll-vertical ${
              activeLink === "/survey-blog" ? "active-link" : ""
            }`}
          ></i>
          <span className="nav-label">Survey block</span>
        </Link>
        <Link
          to={"/video-blog"}
          onClick={() => handleLinkClick("/video-blog")}
          className="nav-links"
        >
          <i
            className={`fa-solid fa-video ${
              activeLink === "/video-blog" ? "active-link" : ""
            }`}
          ></i>
          <span className="nav-label">video block</span>
        </Link>
        <Link
          to={"/image-blog"}
          onClick={() => handleLinkClick("/image-blog")}
          className="nav-links"
        >
          <i
            className={`fa-solid fa-images ${
              activeLink === "/image-blog" ? "active-link" : ""
            }`}
          ></i>
          <span className="nav-label">image block</span>
        </Link>
        <Link
          to={"/analytics"}
          onClick={() => handleLinkClick("/analytics")}
          className="nav-links"
        >
          <i
            className={`fa-solid fa-chart-simple ${
              activeLink === "/analytics" ? "active-link" : ""
            } `}
          ></i>
          <span className="nav-label">analytics</span>
        </Link>
      </div>
    </div>
  );
};

export default SideNavBar;
