import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Result = (props) => {
  useEffect(() => {
    document.querySelector("#result").addEventListener("click", () => {
      props.setResult(null);
    });
    return document
      .querySelector("#result")
      .removeEventListener("click", () => {
        props.setResult(null);
      });
  }, [props]);

  if (props.result === "won") {
    return (
      <div id="result" className="won">
        <div>You won :-)</div>
      </div>
    );
  }

  return (
    <div id="result" className="lost">
      <div>You lost :-(</div>
    </div>
  );
};

Result.propTypes = {
  result: PropTypes.oneOf(["won", "lost"]),
  setResult: PropTypes.func,
};

export default Result;
