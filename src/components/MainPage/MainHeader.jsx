import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosAirplane } from "react-icons/io";
import { FaTag } from "react-icons/fa6";
import { GiWorld } from "react-icons/gi";
import { MdAirplaneTicket } from "react-icons/md";

import "./MainHeader.css";
import { FlightContext } from "../../context/flightsContext";

const MainHeader = () => {
  const { reservations } = useContext(FlightContext);
  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><IoIosAirplane size={30}/> PLANE SCAPE</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="#"><FaTag color="purple"/> Deals</Link>
          </li>
          {
            reservations.length > 0 && (
              <li>
            <Link to="/my-flights"><MdAirplaneTicket color="purple"/> My Flights</Link>
          </li>
            )
          }
          
          <li>
            <Link to="#"><GiWorld color="purple"/> Discover</Link>
          </li>
          <li>
            <Link to="#"> <img src="/images/profile.jpg" alt="profile" width={30} height={30} style={{borderRadius:"50%"}}/> Joane Smith</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
