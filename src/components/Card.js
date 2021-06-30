import React from "react";

const Card = (props) => (
  <div
    className="card"
    onClick={() => {
      props.handleCardClick(props.id);
    }}
  >
    <img src={props.imgUrl} alt={props.name} />
    <p>{props.name}</p>
  </div>
);

export default Card;
