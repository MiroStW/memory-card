import { useEffect } from "react";
import { useGetCards } from "../api/useGetCards";
import Card from "./Card";

interface BoardProps {
  totalCards: number;
  clickedCards: number[];
  setClickedCards: (clickedCards: number[]) => void;
  bestScore: number;
  setBestScore: (bestScore: number) => void;
  setGameResult: (gameResult: "lost" | "won" | null) => void;
}

// Board component
const Board = ({
  totalCards,
  clickedCards,
  setClickedCards,
  bestScore,
  setBestScore,
  setGameResult,
}: BoardProps) => {
  const { cards, isLoading, error } = useGetCards(totalCards);

  // Game logic component
  const handleCardClick = (id: number) => {
    if (clickedCards.includes(id)) {
      console.log("card already clicked");
      if (clickedCards.length > bestScore) setBestScore(clickedCards.length);
      setGameResult("lost");
      setClickedCards([]);
    } else {
      console.log("new card clicked");
      if (clickedCards.length === totalCards - 1) {
        setGameResult("won");
        setClickedCards([]);
      } else {
        setClickedCards([...clickedCards, id]);
      }
    }
  };

  if (error) return <div>Error: {error.message}</div>;

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

export { Board };
