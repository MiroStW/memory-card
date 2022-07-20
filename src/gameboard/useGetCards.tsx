import { useEffect, useState } from "react";

interface Card {
  name: string;
  imgUrl: string;
}

interface PokemonApiBody {
  name: string;
  sprites: {
    front_default: string;
  };
  [i: string]: any;
}

const useGetCards = (cardCount: number) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const pokemonIds: number[] = [];
  for (let i = 0; i < cardCount; i += 1) {
    pokemonIds.push(Math.floor(Math.random() * 898));
  }

  useEffect(() => {
    try {
      (async () => {
        pokemonIds.map(async (id, i) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
            {
              mode: "cors",
            }
          );
          const data: PokemonApiBody = await response.json();
          setCards((prevState) => [
            ...prevState,
            {
              name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
              imgUrl: data.sprites.front_default,
            },
          ]);
        });
      })();
    } catch (err) {
      if (err instanceof Error) setError(err);
      else setError(new Error(JSON.stringify(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { cards, isLoading, error };
};

export { useGetCards };
