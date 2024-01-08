import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_API_URL;

import { getOneMovie } from "../../api/fetch";

import "./Movie.css";

import ErrorMessage from "../errors/ErrorMessage";

function Movie() {
  const [movie, setMovie] = useState([]);
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();
  //create a variable called navigate and invoke the function
  const navigate = useNavigate();

  const {
    id: showId,
    duration,
    listedIn,
    country,
    rating,
    dateAdded,
    description,
  } = movie;

  function handleDelete() {
    const options = { method: "DELETE" };
    return fetch(`${URL}/movies/${id}`, options)
      .then(() => navigate("/movies"))
      .catch((error) => {
        console.log(error);
        setLoadingError(true);
      });
  }

  // useEffect
  useEffect(() => {
    getOneMovie(id)
      .then((data) => {
        setMovie(data);
        if (Object.keys(data).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
      })
      .catch((error) => {
        setLoadingError(true);
      });
  }, [id]);

  return (
    <section className="movies-movie-wrapper">
      <h2>{movie.title}</h2>
      <section className="movies-movie">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {movie.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {movie.listedIn}
              </p>
              <p>
                <span>Country:</span> {movie.country}
              </p>
              <p>
                <span>Rating:</span> {movie.rating}
              </p>
              <p>
                <span>Date Added:</span> {movie.dateAdded}
              </p>
            </aside>
            <article>
              <p>{movie.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(movie.id)}>
                Remove movie
              </button>
              <Link to={`/movies/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Movie;
