import React, { useEffect, useState } from "react";
import Board from "./Board";
import Result from "./Result";
import DifficultySwitch from "./DifficultySwitch";
import loadCards from "./loadCards";

const App = () => {
  const [totalCards, setTotalCards] = useState(8);
  const [cards, setCards] = useState({});
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
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

  // useEffect(() => {
  //   console.log(`shuffled cards:`);
  //   console.log(cards);
  // }, [cards]);

  return (
    <>
      <h1>Memory card game</h1>
      <div>
        <p>
          Get points by clicking on an image but don&apos;t click the same more
          than once!
        </p>
      </div>
      <div>
        <p>Current score: {clickedCards.length}</p>
        <p>Best score: {bestScore}</p>
        <DifficultySwitch
          totalCards={totalCards}
          setTotalCards={setTotalCards}
        />
        {/* add select to increase difficulty */}
        {/* add new cards btn */}
      </div>
      <div id="cards">
        {gameResult && <Result result={gameResult} setResult={setGameResult} />}
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <Board cards={cards} handleCardClick={() => handleCardClick()} />
        )}
      </div>
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
