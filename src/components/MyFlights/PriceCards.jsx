import React from "react";

import PriceItem from "./PriceItem";
import PriceCardJson from "./PriceData.json"
import "./PriceCards.css";

const PriceCards = () => {
  return (
    <div className="price-container">
   {
     PriceCardJson.map((card) => (
       <PriceItem key={card.id} card={card} />
     ))
   }
    </div>
  )
};

export default PriceCards;
