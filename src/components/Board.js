import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Result from "./Result";
import loadCards from "./loadCards";
import Card from "./Card";

// Cards component
const Board = ({
  totalCards,
  clickedCards,
  setClickedCards,
  bestScore,
  setBestScore,
}) => {
  const [cards, setCards] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [gameResult, setGameResult] = useState(null);

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
    setCards({});
    (async () => {
      setIsLoading(true);
      setCards(await loadCards(totalCards));
      setIsLoading(false);
    })();
    setClickedCards([]);
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

    if (totalCards === Object.keys(cards).length)
      console.log(
        `# clickedCards: ${clickedCards.length} / ${Object.keys(cards).length}`
      );
  }, [cards, clickedCards.length, totalCards]);

  return (
    <>
      {gameResult && <Result result={gameResult} setResult={setGameResult} />}
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
};
