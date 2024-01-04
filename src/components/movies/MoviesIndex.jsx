import { useEffect, useState } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import { getAllMovies } from "../../api/fetch";
import MoviesListing from "./MoviesListing";

export default function MoviesIndex() {
  const [loadingError, setLoadingError] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
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
      {loadingError && <ErrorMessage />}
      {movies.map((movie) => (
        <MoviesListing movie={movie} key={movie.id} />
      ))}
    </div>
  );
}
