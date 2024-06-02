import { useState } from "react";
import useFetch from "./useFetch";
import pokedexLogo from "./assets/pokedex_logo.png";

const Home = () => {
  const [pokemon, setPokemon] = useState("");
  const { data, id, error, fetchPokemon, fetchPokemonList } = useFetch();

  const handleChange = (e) => {
    const newPokemon = e.target.value;
    setPokemon(newPokemon);
    fetchPokemonList(newPokemon.toLowerCase());
  };

  const fetchNextPokemon = () => {
    fetchPokemon(id + 1);
  };

  const fetchPrevPokemon = () => {
    fetchPokemon(id - 1);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div
        className="border-sm rounded-md p-4 bg-white w-96 shadow-lg"
        style={{ height: "550px" }}
      >
        <form>
          <img src={pokedexLogo} alt="Pokedex logo" className="h-16 mx-auto" />
          <input
            type="text"
            required
            placeholder="Search Pokemon..."
            value={pokemon}
            onChange={handleChange}
            className="border-2 rounded w-full pl-3 my-3"
          />
        </form>
        {data && (
          <div className="text-center p-5">
            <h1 className="mb-2">Name: {data.name}</h1>
            <h2>Pokédex number: #{data.id}</h2>
            <img
              className="h-64 mx-auto"
              src={data.sprites.front_default}
              alt={data.name}
            />
            <button
              onClick={fetchPrevPokemon}
              className="border-2 rounded-md bg-slate-400"
            >
              Previous
            </button>
            <button
              onClick={fetchNextPokemon}
              className="border-2 rounded-md bg-slate-400"
            >
              Next
            </button>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </main>
  );
};

export default Home;
