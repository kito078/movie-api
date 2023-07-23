import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setEror] = useState(null);

  async function fetchMovieHandler() {
    setEror(null);
    setIsLoading(true);
    try {
      const response = await fetch(" https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const data = await response.json();
      console.log(data);

      const convertedMovies = data.results.map((newData) => {
        return {
          id: newData.episode_id,
          title: newData.title,
          releaseDate: newData.release_date,
          openingText: newData.opening_crawl,
        };
      });
      setMovies(convertedMovies);
      setIsLoading(false);
    } catch (error) {
      setEror(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovieHandler();
  }, []);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {movies.length === 0 && !isLoading && !error && <p>No Items</p>}
        {movies.length > 0 && !isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>loading...</p>}
        {error && !isLoading && <>{error}</>}
      </section>
    </React.Fragment>
  );
}

export default App;
