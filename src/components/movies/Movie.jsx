import { useNavigate, useParams, Link } from "react-router-dom";
import { getOneMovie } from "../../api/fetch";
import { useEffect, useState } from "react";
import ErrorMessage from "../errors/ErrorMessage";

const URL = import.meta.env.VITE_BASE_API_URL;

function Movie() {
  const [movie, setMovie] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = () => {
    const options = { method: "DELETE" };
    fetch(`${URL}/movies/${id}`, options)
      .then(() => navigate("/movies"))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getOneMovie(id).then((data) => {
      setMovie(data);
      Object.keys(data).length === 0
        ? setLoadingError(true)
        : setLoadingError(false);
    });
  }, [id]);
  return (
    <section className="shows-show-wrapper">
      <h2>{movie.title}</h2>
      <section className="shows-show">
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
          <button className="delete" onClick={handleDelete}>
            Remove Movie
          </button>
          <Link to={`/movies/${id}/edit`}>Edit</Link>
        </aside>
      </section>
    </section>
  );
}

export default Movie;
