import React from "react";
import star from "../../../assets/img/star.png";

const Card = ({ img, prodName, bag }) => {
  return (
    <div>
      <div>{img}</div>
      <div>
        <h2>{prodName}</h2>
        <h3>
          `${bag}{" "}
          <span>
            <img src={star} />
          </span>
          `
        </h3>
      </div>
      <div></div>
    </div>
  );
};

export default Card;
