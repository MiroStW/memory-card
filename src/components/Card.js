import React from "react";

const Card = (props) => (
  <div
    className="card"
    onClick={() => {
      props.handleCardClick(props.id);
    }}
  >
    <img src={props.cardObject.imgUrl} alt={props.cardObject.name} />
    <p>{props.cardObject.name}</p>
  </div>
);

export default Card;
