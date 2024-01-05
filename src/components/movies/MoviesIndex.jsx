import { Link } from "react-router-dom"; // to navigate views without refreshing page
import ErrorMessage from "../errors/ErrorMessage";
import { getAllMovies } from "../../api/fetch";

import { useState } from "react";
import MovieListing from "./MovieListing";

export default function MoviesIndex() {
  // create listing component to import to see movie list when clicking button "movie list" (must map through array of objects)
  // useState to change view of movieListing
  // create handleTextChangeMovies with useState for the text change for searchbar

  const [movies, setMovies] = useState([]); // to get movie data
  const [earWaxError, setEarWaxError] = useState(false); //toggle whether or not earwax is false (ERROR!!)
  const [allEarWax, setAllEarWax] = useState([]); // initial state is no earwax in array
  const [searchEarWaxTitle, setSearchEarWaxTitle] = useState(""); // for search bar input

  const handleTextChangeEarWax = () => {};


  return (
  <div>
    <section className="shows-index-wrapper">
      <h2>All Movies</h2>
      <button>
      <Link to="/movies/new">Add a new movie</Link>
      </button>
      <br />
      {/* create HTML for searchbar */}
      <label htmlFor="searchEarWaxTitle">
        Search Movies:
        {/* type is text bc string, value is the useState, id must match useState name, add the onChange fx */}
        <input
          type="text"
          value={searchEarWaxTitle}
          id="seachEarWaxTitle"
          onChange={handleTextChangeEarWax}
        />
      </label>
    <section className="shows-index">
      {movies.map((movie) => {
        return <MovieListing movie={movie} key={movie.id} />;
        })}
    </section>
    </section>
  </div>
  );
}