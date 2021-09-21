interface pokemonObject {
  [i: number]: {
    name: string;
    imgUrl: string;
  };
}

interface pokemonResponse<T> extends Response {
  parsedBody?: T;
}

const LoadCards = async <T,>(cardCount: number): Promise<pokemonObject> => {
  const pokemonIds = [];
  let pokemons = {};
  for (let i = 0; i < cardCount; i += 1) {
    pokemonIds.push(Math.floor(Math.random() * 898));
  }

  await Promise.all(
    pokemonIds.map(async (id, i) => {
      const response: pokemonResponse<T> = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
        {
          mode: "cors",
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      const body = await response.json();
      pokemons = {
        ...pokemons,
        [i]: {
          name: body.name.charAt(0).toUpperCase() + body.name.slice(1),
          imgUrl: body.sprites.front_default,
        },
      };
    })
  );

  return pokemons;
};

export default LoadCards;
