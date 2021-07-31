import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import loadCards from "./loadCards";
import Card from "./Card";

// Cards component
const Board = ({
  totalCards,
  clickedCards,
  setClickedCards,
  bestScore,
  setBestScore,
  setGameResult,
}) => {
  const [cards, setCards] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Game logic component
  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      console.log("card already clicked");
      if (clickedCards.length > bestScore) setBestScore(clickedCards.length);
      setGameResult("lost");
      setClickedCards([]);
    } else {
      console.log("new card clicked");
      setClickedCards([...clickedCards, id]);
    }
  };

  // if no of total cards is changed (e.g. game started or difficulty changed)
  useEffect(() => {
    setClickedCards([]);
    (async () => {
      setIsLoading(true);
      setCards(await loadCards(totalCards));
      setIsLoading(false);
    })();
    // console.log(`# total cards ${totalCards}`);
  }, [totalCards]);

  useEffect(() => {
    // if all cards clicked // WON
    if (
      clickedCards.length === Object.keys(cards).length &&
      clickedCards.length > 0
    ) {
      setGameResult("won");
      setClickedCards([]);
      (async () => {
        setIsLoading(true);
        setCards(await loadCards(totalCards));
        setIsLoading(false);
      })();
      console.log("WON!!!");
    }
  }, [cards, clickedCards, setClickedCards, totalCards]);

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        Object.keys(cards)
          .map((card) => ({ sort: Math.random(), value: card }))
          .sort((a, b) => a.sort - b.sort)
          .map((card) => card.value)
          .map((card) => (
            <Card
              key={card}
              id={card}
              cardObject={cards[card]}
              handleCardClick={handleCardClick}
            />
          ))
      )}
    </>
  );
};

export default Board;

Board.propTypes = {
  totalCards: PropTypes.number,
  clickedCards: PropTypes.array,
  setClickedCards: PropTypes.func,
  bestScore: PropTypes.number,
  setBestScore: PropTypes.func,
  gameResult: PropTypes.oneOf(["won", "lost"]),
  setGameResult: PropTypes.func,
};
