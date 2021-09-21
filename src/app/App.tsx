import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Board from "../gameboard/Board";
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
        <Router>
          <Switch>
            <Route path={`/`} exact>
              {gameResult && <Redirect to="/result" />}
              <Board
                totalCards={totalCards}
                clickedCards={clickedCards}
                setClickedCards={setClickedCards}
                bestScore={bestScore}
                setBestScore={setBestScore}
                setGameResult={setGameResult}
              />
            </Route>
            <Route path={`/result`}>
              {!gameResult && <Redirect to="/" />}
              <Result gameResult={gameResult} setGameResult={setGameResult} />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
