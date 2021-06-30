import React, { useEffect, useState } from "react";
import Card from "./Card";

const cards = {
  1: {
    imgUrl: "https://picsum.photos/200",
    name: "lorem",
  },
  2: {
    imgUrl: "https://picsum.photos/200",
    name: "ipsum",
  },
  3: {
    imgUrl: "https://picsum.photos/200",
    name: "lorem",
  },
};

const App = (props) => {
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      console.log("card already clicked");
    } else setClickedCards([...clickedCards, id]);
  };

  useEffect(() => {
    console.log(clickedCards);
  }, [clickedCards]);

  return (
    <>
      <h1>Memory card game</h1>
      {Object.keys(cards).map((card) => (
        <Card
          key={card}
          id={card}
          name={cards[card].name}
          imgUrl={cards[card].imgUrl}
          handleCardClick={handleCardClick}
        />
      ))}
    </>
  );
};

export default App;

// project outline:
// Scoreboard: counts the current score, and a “Best Score”, which shows the best
//   score you achieved thus far
// Cards: couple of cards that display images and possibly informational text.
// Randomise order: function that displays the cards in a random order anytime a
//   user clicks one (invoke on mount)
//
