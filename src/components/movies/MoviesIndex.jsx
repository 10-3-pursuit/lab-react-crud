import { Link } from "react-router-dom"; // to navigate views without refreshing page
import ErrorMessage from "../errors/ErrorMessage";
import { getAllMovies } from "../../api/fetch";

import { useState } from "react";
import MovieListing from "./MovieListing";

export default function MoviesIndex() {
  // create listing component to import to see movie list when clicking button "movie list" (must map through array of objects)
  // useState to change view of movieListing
  const [movies, setMovies] = useState([]);
  return (
  <div>
    <section className="shows-index-wrapper">
      <h2>All Movies</h2>
      <button>
      <Link to="/movies/new">Add a new movie</Link>
      </button>

    <section className="shows-index">
      {movies.map((movie) => {
        return <MovieListing movie={movie} key={movie.id} />;
        })}
    </section>
    </section>
  </div>
  );
}
