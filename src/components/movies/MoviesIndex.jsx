import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getAllMovies } from "../../api/fetch";
import MovieListing from "./MovieListing";
import "./MoviesIndex.css";
import ErrorMessage from "../errors/ErrorMessage";

function filterMovies(search, movies) {
  return movies.filter((movie) => {
    return movie.title.toLowerCase().match(search.toLowerCase());
  })
}

export default function MoviesIndex() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [loadingError, setLoadingError] = useState(false)


  function handleMovieTextChange(event) {
    const inputTitle = event.target.value;
    const result = inputTitle.length ? filterMovies(inputTitle, allMovies) : allMovies;
    setSearchTitle(inputTitle);
    setMovies(result);
  }
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setAllMovies(data)
        setMovies(data);
        setLoadingError(false)
      })
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }, []);



  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="movies-index-wrapper">
          <h2>All Movies</h2>
          <button>
              <Link to="/movies/new">Add a new show</Link>
          </button>
          <br />
          <label htmlFor="searchMovieTitle">
            Search Movies:
            <input
              type="text"
              value={searchTitle}
              id="searchMovieTitle"
              onChange={handleMovieTextChange}
              />
          </label>
            <section className="movies-index">
              {movies.map((movie) => {
                return <MovieListing movie={movie} key={movie.id}/>
              })}
            </section>
      </section>
    )}
    </div>
  )
}
