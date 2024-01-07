import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ErrorMessage from "../errors/ErrorMessage";
import MovieListing from "./MovieListing"

import { getAllMovies } from "../../api/fetch";

import "../shows/ShowsIndex.css";

function filterShows(search, movies) {
  return movies.filter((movie) => {
    return movie.title.toLowerCase().match(search.toLowerCase());
  });
}

export default function ShowsIndex() {
  const [movies, setMovies] = useState([]);
  const [loadingError, setLoadingError] = useState(false)
  const [allMovies, setAllMovies] = useState([])
  const [searchTitle, setSearchTitle] = useState("")

  function handleTextChange(event) {
    const inputTitle = event.target.value;
    const result = inputTitle.length ? filterMovies(inputTitle, allMovies) : allMovies;
  
    setSearchTitle(inputTitle);
    setMovies(result);
  }
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setAllMovies(data)
        setMovies(data)
        setLoadingError(false)
      })
      .catch((error) => {
        console.error(error)
        setLoadingError(true)
      });
  }, []);

  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="/moviess/new">Add a new movie</Link>
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
          <section className="shows-index">
            {/* <!-- ShowListing components --> */}
            {movies.map((movie) => {
              return <MovieListing movie={movie} key={movie.id} />
            })}
          </section>
        </section>
      )}
    </div>
  );
}
