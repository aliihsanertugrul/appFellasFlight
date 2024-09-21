import React from "react";

import "./PriceItem.css";

const PriceItem = ({card}) => {
    const {name, price} = card
  return (
    <div className="price-card">
      <p className="price">${price}</p>
      <p className="status">{name}</p>
    </div>
  );
};

export default PriceItem;
