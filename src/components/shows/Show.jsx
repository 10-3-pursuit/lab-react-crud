import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { getOneShow } from "../../api/fetch";
import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";

function Show() {
  const { id } = useParams();
  
  const [show, setShow] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const {
    id: showId,
    title,
    duration,
    listedIn, 
    country, 
    rating, 
    dateAdded, 
    description,
  } = show
  function handleDelete() {}

  useEffect(() => {
    getOneShow(id)
      .then((data) => {
        setShow(data);
        if (Object.keys(data).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
      })
      .catch((error) => {
        setLoadingError(true);
      });
  }, [id])

  return (
    <section className="shows-show-wrapper">
      <h2>{title}</h2>
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
              <button className="delete" onClick={() => handleDelete(showId)}>
                Remove show
              </button>
              <Link to={`/shows/${showId}/edit`}>
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
