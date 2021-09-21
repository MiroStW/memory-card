import React from "react";

interface resultProps {
  gameResult: "lost" | "won" | null;
  setGameResult: (gameResult: null) => void;
}

const Result = (props: resultProps) => {
  if (props.gameResult === "won") {
    return (
      <div
        id="result"
        className="won"
        onClick={() => props.setGameResult(null)}
      >
        <div>You won :-)</div>
      </div>
    );
  }

  return (
    <div id="result" className="lost" onClick={() => props.setGameResult(null)}>
      <div>You lost :-(</div>
    </div>
  );
};

export default Result;
