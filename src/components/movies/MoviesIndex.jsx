import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import MovieListing from "./MovieListing";

import ErrorMessage from "../errors/ErrorMessage";

import { getAllMovies } from "../../api/fetch";

import "../shows/ShowsIndex.css"

function filterMovies(searchWord, allOfTheMovies) {
  return allOfTheMovies.filter((singleMovie) => {
    return singleMovie.title.toLowerCase().match(searchWord.toLowerCase());
  });
}

export default function MoviesIndex() {

  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [loadingError, setLoadingError] = useState(false)

  function handleTextChange(event){
    const inputTitle = event.target.value;
    // console.log(title)
    const result = inputTitle.length ? filterMovies(inputTitle, allMovies) : allMovies;
    setSearchTitle(inputTitle);
    setMovies(result);
  }


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
      {/* {console.log(movies)} */}
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="/movies/new">Add a new Movie</Link>
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
            {/* <!-- MovieListing components --> */}
            {movies.map((movie) => {
            return <MovieListing movie={movie} key={movie.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  )}

