import React, { useState } from "react";
import Board from "../gameboard/Board";
import DifficultySwitch from "./DifficultySwitch";

const App = () => {
  const [totalCards, setTotalCards] = useState(8);
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);

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
        {/* add new cards btn */}
      </div>
      <div id="cards">
        <Board
          totalCards={totalCards}
          clickedCards={clickedCards}
          setClickedCards={setClickedCards}
          bestScore={bestScore}
          setBestScore={setBestScore}
        />
      </div>
    </>
  );
};

export default App;
