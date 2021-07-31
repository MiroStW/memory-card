import React from "react";
import PropTypes from "prop-types";

const Result = (props) => {
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

Result.propTypes = {
  gameResult: PropTypes.oneOf(["won", "lost"]),
  setGameResult: PropTypes.func,
};

export default Result;
