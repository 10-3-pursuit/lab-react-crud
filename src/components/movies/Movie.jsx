import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

// const URL = import.meta.env.VITE_BASE_API_URL

import { getOneMovie, destroyMovie } from "../../api/fetch"

import "./Movie.css";

import ErrorMessage from "../errors/ErrorMessage";

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const {
    id:movieId,
    duration,
    listedIn,
    country,
    rating,
    dateAdded,
    description
  } = movie;
  //will handle on thursday
  function handleDelete() {
    // const options = { method: "DELETE" };
    // fetch(`${URL}/movies/${id}`, options)
    destroyMovie(id)
      .then(() => navigate("/movies"))
      .catch(error =>{
        console.log(error);
        setLoadingError(true);
      })
  }

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
                <span>Duration:</span> {duration}
              </p>
              <p>
                <span>Listed Categories:</span> {listedIn}
              </p>
              <p>
                <span>Country:</span> {country}
              </p>
              <p>
                <span>Rating:</span> {rating}
              </p>
              <p>
                <span>Date Added:</span> {dateAdded}
              </p>
            </aside>
            <article>
              <p>{description}</p>
            </article>
            <aside>
              <button className="delete" onClick={handleDelete}>
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

export default Movie