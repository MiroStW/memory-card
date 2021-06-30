import React from "react";

const Card = (props) => {
  return (
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
};

export default Card;

// div onClick:
// 1. randomise order
// 3. alreadyClicked ? setBestScore : setCurrentScore
//
