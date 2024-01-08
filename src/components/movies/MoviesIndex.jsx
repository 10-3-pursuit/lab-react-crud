import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import MovieListing from "./MovieListing";

import ErrorMessage from "../errors/ErrorMessage";
// which means we can fetch from the background
import { getAllMovies } from "../../api/fetch";

import "./MoviesIndex.css";

// doesnt handle any state so does not need to be in the component
//also it has parameters so we place it OUTSIDE of the function component
function filterMovies(search, movies) {
  return movies.filter((movie) => {
    return movie.title.toLowerCase().match(search.toLowerCase());
  });
}

export default function MoviesIndex() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [loadingError, setLoadingError] = useState(false);

  const handleTextChange = (event) => {
    const title = event.target.value;
    const result = title.length ? filterMovies(title, allMovies) : allMovies;
    // console.log(title);
    setSearchTitle(title);
    setMovies(result);
  };
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setAllMovies(data);
        setMovies(data);
        setLoadingError(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }, []);

  return (
    <div>
      {/* to check if the fetch was suceesful and the data is accessable */}
      {/* {console.log(movies)} */}
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="movies-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="/movies/new">Add a new movie</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Movies:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="movies-index">
            {movies.map((movie) => {
              return <MovieListing movie={movie} key={movie.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}
