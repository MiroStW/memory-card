import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Board } from "../gameboard/Board";
import Result from "../gameboard/Result";
import DifficultySwitch from "./DifficultySwitch";

const App = () => {
  const [totalCards, setTotalCards] = useState(8);
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [bestScore, setBestScore] = useState<number>(0);
  const [gameResult, setGameResult] = useState<"lost" | "won" | null>(null);

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
        {/* add basename="/memory-card" for gh-pages deployment - remove if deploying to custom domain */}
        <Router>
          <Routes>
            <Route
              path={`/`}
              element={
                <>
                  {gameResult && <Navigate to="/result" />}
                  <Board
                    totalCards={totalCards}
                    clickedCards={clickedCards}
                    setClickedCards={setClickedCards}
                    bestScore={bestScore}
                    setBestScore={setBestScore}
                    setGameResult={setGameResult}
                  />
                </>
              }
            />
            <Route
              path={`/result`}
              element={
                <>
                  {!gameResult && <Navigate to="/" />}
                  <Result
                    gameResult={gameResult}
                    setGameResult={setGameResult}
                  />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
