import { useEffect, useState } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import { getAllMovies } from "../../api/fetch";
import MoviesListing from "./MoviesListing";
import { Link } from "react-router-dom";

export default function MoviesIndex() {
  const [loadingError, setLoadingError] = useState(false);

  // movies will be used to update depending on user input
  const [movies, setMovies] = useState([]);

  // allMovies will show the preset movies
  const [allMovies, setAllMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const handleTextChange = (event) => {
    const title = event.target.value;
    const result = title.length ? filterMovies(title, allMovies) : allMovies;
    setSearchTitle(title);
    setMovies(result);
  };

  const filterMovies = (search, movies) => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().match(search.toLowerCase())
    );
  };

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data);
        setAllMovies(data);
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
        <section className="shows-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="../movies/new">Add a new movie</Link>
          </button>
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
            {movies.map((movie) => (
              <MoviesListing movie={movie} key={movie.id} />
            ))}
          </section>
        </section>
      )}
    </div>
  );
}
