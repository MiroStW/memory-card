import React, { useEffect, useState } from "react";
import Card from "./Card";

const cards = {
  1: {
    imgUrl: "https://picsum.photos/100",
    name: "lorem",
  },
  2: {
    imgUrl: "https://picsum.photos/100",
    name: "ipsum",
  },
  3: {
    imgUrl: "https://picsum.photos/100",
    name: "lorem",
  },
};

const App = (props) => {
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      console.log("card already clicked");
      if (clickedCards.length > bestScore) setBestScore(clickedCards.length);
      setClickedCards([]);
    } else {
      console.log("new card clicked");
      setClickedCards([...clickedCards, id]);
    }
    // randomise order
  };

  useEffect(() => {
    console.log(clickedCards);
  }, [clickedCards]);

  return (
    <>
      <h1>Memory card game</h1>
      <p>current score: {clickedCards.length}</p>
      <p>best score: {bestScore}</p>
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
