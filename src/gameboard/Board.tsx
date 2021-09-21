import React, { useState, useEffect } from "react";
import loadCards from "./loadCards";
import Card from "./Card";

interface BoardProps {
  totalCards: number;
  clickedCards: number[];
  setClickedCards: (clickedCards: number[]) => void;
  bestScore: number;
  setBestScore: (bestScore: number) => void;
  setGameResult: (gameResult: "lost" | "won" | null) => void;
}

interface pokemonObject {
  [i: number]: {
    name: string;
    imgUrl: string;
  };
}

// Cards component
const Board = ({
  totalCards,
  clickedCards,
  setClickedCards,
  bestScore,
  setBestScore,
  setGameResult,
}: BoardProps) => {
  const [cards, setCards] = useState<pokemonObject>({});
  const [isLoading, setIsLoading] = useState(false);

  // Game logic component
  const handleCardClick = (id: number) => {
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
          .map((card) => Number(card.value))
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
