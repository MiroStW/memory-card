import React from "react";
import PropTypes from "prop-types";

const Result = (props) => {
  if (props.result === "won") {
    return (
      <div id="result" className="won" onClick={() => props.setResult(null)}>
        <div>You won :-)</div>
      </div>
    );
  }

  return (
    <div id="result" className="lost" onClick={() => props.setResult(null)}>
      <div>You lost :-(</div>
    </div>
  );
};

Result.propTypes = {
  result: PropTypes.oneOf(["won", "lost"]),
  setResult: PropTypes.func,
};

export default Result;
