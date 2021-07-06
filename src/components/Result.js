import React, { useEffect } from "react";

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
  }, []);

  if (props.result === "won") {
    return (
      <div id="result" className="won">
        <div>You won :-)</div>
      </div>
    );
  }

  if (props.result === "lost") {
    return (
      <div id="result" className="lost">
        <div>You lost :-(</div>
      </div>
    );
  }
};

export default Result;
