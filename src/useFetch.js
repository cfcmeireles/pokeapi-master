import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch pokemon list
  const fetchPokemonList = async (pokemon) => {
    if (!pokemon) {
      return;
    }
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
      if (!res.ok) {
        setError("Pokemon list not found :(");
      }
      const fetchedData = await res.json();
      // Filter results based on the letters a pokemon name starts with
      const matchingPokemon = fetchedData.results.filter((pokemonData) => {
        const pokemonName = pokemonData.name;
        return pokemonName.startsWith(pokemon);
      });
      // If a pokemon match is found, fetch the first result
      if (matchingPokemon.length > 0) {
        const matchedPokemonName = matchingPokemon[0].name;
        fetchPokemon(matchedPokemonName);
        setError(null);
      } else {
        setError("Pokemon not found :(");
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      setData(null);
    }
  };

  // Fetch pokemon name
  const fetchPokemon = async (pokemon) => {
    if (!pokemon) {
      return;
    }
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      if (!res.ok) {
        setError("Pokemon not found :(");
      }
      const fetchedData = await res.json();
      setData(fetchedData);
      setError(null);
      setId(fetchedData.id);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setData(null);
    }
  };

  return { data, id, error, fetchPokemon, fetchPokemonList };
};

export default useFetch;
