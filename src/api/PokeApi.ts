export const getPokemon = async () => {
  const getData = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
  );
  const response = await getData.json();
  return response;
};

export const getPokemonDetails = async (pokeDetail: string) => {
  const response = await fetch(`${pokeDetail}`);
  const data = await response.json();
  return data;
};