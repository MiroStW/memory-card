import React from "react";

type difficultySwitchProps = {
  totalCards: number;
  setTotalCards(totalCards: number): void;
};

const DifficultySwitch = (props: difficultySwitchProps) => {
  const changeDifficulty = (count: number) => props.setTotalCards(count);

  return (
    <>
      <label htmlFor="difficulty">Difficulty </label>
      <select
        name="difficulty"
        id="difficultySwitch"
        onChange={(e) => changeDifficulty(Number(e.target.value))}
        defaultValue={props.totalCards}
      >
        <option value="4">Easy</option>
        <option value="8">Medium</option>
        <option value="12">Hard</option>
      </select>
    </>
  );
};

export default DifficultySwitch;
