import React, { useEffect, useState } from "react";
import Card from "./Card";
import Result from "./Result";
import DifficultySwitch from "./DifficultySwitch";

const App = () => {
  const [totalCards, setTotalCards] = useState(8);
  const [cards, setCards] = useState({});
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      console.log("card already clicked");
      if (clickedCards.length > bestScore) setBestScore(clickedCards.length);
      setGameResult("lost");
      setClickedCards([]);
    } else {
      console.log("new card clicked");
      setClickedCards([...clickedCards, id]);
    }
  };

  const showShuffleCards = () =>
    Object.keys(cards)
      .map((card) => ({ sort: Math.random(), value: card }))
      .sort((a, b) => a.sort - b.sort)
      .map((card) => card.value)
      .map((card) => (
        <Card
          key={card}
          id={card}
          cardObject={cards[card]}
          handleCardClick={handleCardClick}
        />
      ));

  const getPokemon = async (cardCount) => {
    // style them as tiles (look up library project)
    setLoading(true);

    const pokemonIds = [];
    for (let i = 0; i < cardCount; i += 1) {
      pokemonIds.push(Math.floor(Math.random() * 898));
    }

    await Promise.all(
      pokemonIds.map(async (id, i) => {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          mode: "cors",
        });
        response = await response.json();
        setCards((prevState) => ({
          ...prevState,
          [i]: {
            name: response.name,
            imgUrl: response.sprites.front_default,
          },
        }));
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    setCards({});
    getPokemon(totalCards);
    setClickedCards([]);
    console.log(`# total cards ${totalCards}`);
  }, [totalCards]);

  useEffect(() => {
    if (
      clickedCards.length === Object.keys(cards).length &&
      Object.keys(cards).length > 0
    ) {
      setGameResult("won");
      setClickedCards([]);
      setCards({});
      getPokemon(totalCards);
      console.log("WON!!!");
    }
    console.log(`# clickedCards: ${clickedCards.length}`);
    console.log(`# totalCards: ${Object.keys(cards).length}`);
  }, [cards, clickedCards.length, totalCards]);

  // useEffect(() => {
  //   console.log(`shuffled cards:`);
  //   console.log(cards);
  // }, [cards]);

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
        {/* add select to increase difficulty */}
        {/* add new cards btn */}
      </div>
      <div id="cards">
        {gameResult && <Result result={gameResult} setResult={setGameResult} />}
        {loading ? <div>loading...</div> : showShuffleCards()}
      </div>
    </>
  );
};

export default App;

// project outline:
// Scoreboard: counts the current score, and a “Best Score”, which shows the best
//   score you achieved thus far
// Cards: couple of cards that display images and possibly informational text.
// Randomise order: function that displays the cards in a random order anytime a
//   user clicks one (invoke on mount)
//
