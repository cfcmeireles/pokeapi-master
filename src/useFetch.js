import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemon = async (pokemon) => {
    if (!pokemon) {
      return;
    }
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      if (!res.ok) {
        setError("Pokemon not found");
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

  return { data, id, error, fetchPokemon };
};

export default useFetch;
