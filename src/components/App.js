import React, { useEffect, useState } from "react";
import Card from "./Card";

const App = (props) => {
  const [cards, setCards] = useState({});
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      console.log("card already clicked");
      if (clickedCards.length > bestScore) setBestScore(clickedCards.length);
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

  useEffect(() => {
    const getPokemon = async (cardCount) => {
      // style them as tiles (look up library project)
      setLoading(true);

      const pokemonIds = [];
      for (let i = 0; i < cardCount; i++) {
        pokemonIds.push(Math.floor(Math.random() * 898));
      }

      await Promise.all(
        pokemonIds.map(async (id, i) => {
          let response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
            { mode: "cors" }
          );
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
    getPokemon(6);
  }, []);

  useEffect(() => {
    console.log(`clickedCards: ${clickedCards}`);
  }, [clickedCards]);

  useEffect(() => {
    console.log(`cards (1.org 2.shuffled):`);
    console.log(cards);
  }, [cards]);

  return (
    <>
      <h1>Memory card game</h1>
      <p>current score: {clickedCards.length}</p>
      <p>best score: {bestScore}</p>
      <div id="cards">
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
