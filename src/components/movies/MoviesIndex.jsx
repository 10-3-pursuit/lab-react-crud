import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import MovieListing from "./MovieListing";

import ErrorMessage from "../errors/ErrorMessage";

import { getAllMovies } from "../../api/fetch";

import "./MoviesIndex.css";

function filterMovies(searchWord, allOfTheMovies) {
  return allOfTheMovies.filter((singleMovie) => {
    // this .title is coming from the backend api key called title
    return singleMovie.title.toLowerCase().match(searchWord.toLowerCase());
  });
}


export default function MoviesIndex() {
// this will render movies on the page after the search
const [movies, setMovies] = useState([]);
// this will ALWAYS be the full set of show data
const [allMovies, setAllMovies] = useState([]);
const [searchTitle, setSearchTitle] = useState("");
const [loadingError, setLoadingError] = useState(false);
function handleTextChange(event) {
  const inputTitle = event.target.value;
  const result = inputTitle.length
    ? filterMovies(inputTitle, allMovies)
    : allMovies;
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
  {loadingError ? (
    <ErrorMessage />
  ) : (
<section className="movies-index-wrapper">
  <p>Movie List</p>
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
<section className="movies-index">
{/* movie listing components */}
{movies.map((movie) => {
  return <MovieListing movie={movie} key={movie.id} />;

})}
</section>
  </section>

  )}
  </div>
  );
}
