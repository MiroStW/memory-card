import React from "react";
import Card from "./Card";

// Cards component
const Board = (props) =>
  Object.keys(props.cards)
    .map((card) => ({ sort: Math.random(), value: card }))
    .sort((a, b) => a.sort - b.sort)
    .map((card) => card.value)
    .map((card) => (
      <Card
        key={card}
        id={card}
        cardObject={props.cards[card]}
        handleCardClick={props.handleCardClick}
      />
    ));

export default Board;
