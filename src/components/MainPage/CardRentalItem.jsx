import React from "react";
import { FaUmbrellaBeach, FaCar, FaHotel } from "react-icons/fa"; // Iconları import et

import "./CardRentalItem.css";
const CardRentalItem = ({ rentalData }) => {
  const { name, icon, backgroundImage,filter } = rentalData;

  const renderIcon = () => {
    switch (icon) {
      case "umbrella-beach":
        return <FaUmbrellaBeach size={30} />;
      case "car":
        return <FaCar size={30} />;
      case "hotel":
        return <FaHotel size={30} />;
      default:
        return null;
    }
  };

  return (
    <li
      className="rental-container"
      style={{ backgroundImage: `url(${backgroundImage})` , filter:filter}}
    >
      <div className="rental-info">
        <div className="icon">{renderIcon()}</div>
        <p>{name}</p>
      </div>
    </li>
  );
};

export default CardRentalItem;
