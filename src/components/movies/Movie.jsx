import { Link, useParams, useNavigate } from "react-router-dom";

import ErrorMessage from "../errors/ErrorMessage";
import { useState, useEffect } from "react";

import { destroyMovie, getOneMovie } from "../../api/fetch";

const Movie = () => {
    const [movie, setMovie] = useState({});
    const [loadingError, setLoadingError] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    function handleDelete() {
        destroyMovie(id)
            .then(() => navigate("/movies"))
            .catch((error) => {
                console.error(error);
                setLoadingError(true);
            });
    }

    useEffect(() => {
        getOneMovie(id).then((data) => {
            setMovie(data);
            if (Object.keys(data).length === 0) {
                setLoadingError(true);
            } else {
                setLoadingError(false);
            }
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
                            <button
                                className="delete"
                                onClick={() => handleDelete()}
                            >
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
};

export default Movie;
