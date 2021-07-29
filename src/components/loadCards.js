const LoadCards = async (cardCount) => {
  const pokemonIds = [];
  let pokemons = {};
  for (let i = 0; i < cardCount; i += 1) {
    pokemonIds.push(Math.floor(Math.random() * 898));
  }

  await Promise.all(
    pokemonIds.map(async (id, i) => {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        mode: "cors",
      });
      response = await response.json();
      pokemons = {
        ...pokemons,
        [i]: {
          name: response.name.charAt(0).toUpperCase() + response.name.slice(1),
          imgUrl: response.sprites.front_default,
        },
      };
    })
  );

  return pokemons;
};

export default LoadCards;
