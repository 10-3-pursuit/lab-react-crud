import { getOneShow } from "../../api/fetch";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";

const URL = import.meta.env.VITE_BASE_API_URL;

function Show() {
    const [show, setShow] = useState({});
    const [loadingError, setLoadingError] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    // will handle on Thursday
    function handleDelete() {
        const options = { method: "DELETE" };
        return fetch(`${URL}/shows/${id}`, options)
            .then(() => navigate("/shows"))
            .catch((error) => {
                console.error(error);
                setLoadingError(true);
            });
    }

    useEffect(() => {
        getOneShow(id).then((data) => {
            setShow(data);
            if (Object.keys(data).length === 0) {
                setLoadingError(true);
            } else {
                setLoadingError(false);
            }
        });
    }, [id]);

    return (
        <section className="shows-show-wrapper">
            <h2>{show.title}</h2>
            <section className="shows-show">
                {loadingError ? (
                    <ErrorMessage />
                ) : (
                    <>
                        <aside>
                            <p>
                                <span>Duration:</span> {show.duration}
                            </p>
                            <p>
                                <span>Listed Categories:</span> {show.listedIn}
                            </p>
                            <p>
                                <span>Country:</span> {show.country}
                            </p>
                            <p>
                                <span>Rating:</span> {show.rating}
                            </p>
                            <p>
                                <span>Date Added:</span> {show.dateAdded}
                            </p>
                        </aside>
                        <article>
                            <p>{show.description}</p>
                        </article>
                        <aside>
                            <button
                                className="delete"
                                onClick={() => handleDelete()}
                            >
                                Remove show
                            </button>
                            <Link to={`/shows/${id}/edit`}>
                                <button>Edit</button>
                            </Link>
                        </aside>
                    </>
                )}
            </section>
        </section>
    );
}

export default Show;
