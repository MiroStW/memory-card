import React from "react";
import PropTypes from "prop-types";

const DifficultySwitch = (props) => {
  const changeDifficulty = (count) => {
    props.setTotalCards(count);
  };

  return (
    <>
      <label htmlFor="difficulty">Difficulty </label>
      <select
        name="difficulty"
        id="difficultySwitch"
        onChange={(e) => changeDifficulty(e.target.value)}
        defaultValue={props.totalCards}
      >
        <option value="4">Easy</option>
        <option value="8">Medium</option>
        <option value="12">Hard</option>
      </select>
    </>
  );
};

DifficultySwitch.propTypes = {
  totalCards: PropTypes.number,
  setTotalCards: PropTypes.func,
};

export default DifficultySwitch;
