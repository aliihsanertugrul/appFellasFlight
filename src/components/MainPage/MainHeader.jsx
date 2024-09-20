import React from "react";
import { Link } from "react-router-dom";
import { FaPlane } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { GiWorld } from "react-icons/gi";

import "./MainHeader.css";

const MainHeader = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><FaPlane  color="purple"/> PLANE SCAPE</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/"><FaTag color="purple"/> Deals</Link>
          </li>
          <li>
            <Link to="/my-flights"><GiWorld color="purple"/> Discover</Link>
          </li>
          <li>
            <Link to="/about">Joane Smith</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
