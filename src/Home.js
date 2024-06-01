import { useState } from "react";
import useFetch from "./useFetch";

const Home = () => {
  const [pokemon, setPokemon] = useState("");
  const { data, id, error, fetchPokemon } = useFetch();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPokemon(pokemon.toLowerCase());
  };

  const fetchNextPokemon = () => {
    fetchPokemon(id + 1);
  };

  const fetchPrevPokemon = () => {
    fetchPokemon(id - 1);
  };

  return (
    <main>
      <div className="h-screen flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
          <label className="block">Find out more about a Pokemon below!</label>
          <input
            type="text"
            required
            placeholder="Type pokemon name or pokedex nr"
            value={pokemon}
            onChange={(e) => setPokemon(e.target.value)}
            className="border-2 w-full"
          />
          <button className="border-2 w-full bg-slate-400">Search</button>
        </form>
        {data && (
          <div className="text-center">
            <div className="flex">
              <button
                onClick={fetchPrevPokemon}
                className="border-2 bg-slate-400"
              >
                Previous
              </button>
              <button
                onClick={fetchNextPokemon}
                className="border-2 bg-slate-400"
              >
                Next
              </button>
            </div>

            <h1>{data.name}</h1>
            <h2>{data.id}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </main>
  );
};

export default Home;
