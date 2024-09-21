import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";

import MyFlightsCardItem from "./MyFlightsCardItem";
import TopHeader from "./TopHeader";

const MyFlightsCard = () => {
  return (
    <div>
     <TopHeader/>
      <MyFlightsCardItem />
    </div>
  );
};

export default MyFlightsCard;
