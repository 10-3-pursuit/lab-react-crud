import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOneMovie } from "../../api/fetch";
import "../shows/Show.css"

import ErrorMessage from "../errors/ErrorMessage";
const URL = import.meta.env.VITE_BASE_API_URL

function Movie() {
  const [movie, setMovie] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();
  let navigate = useNavigate()

  const {duration, listedIn, country, rating, dateAdded, id: movieId, description} = movie
  
  function handleDelete() {
    const options = { method: "DELETE" }
    fetch(`${URL}/movies/${id}`, options)
      .then(() => navigate("/movies"))
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }

  useEffect(() => {
    getOneMovie(id) // Ensure this function is implemented in your API fetch file
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
    <section className="shows-show-wrapper">
      <h2>{movie.title}</h2>
      <section className="shows-show">
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
              <Link to={`/movies/${movieId}/edit`}>
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
