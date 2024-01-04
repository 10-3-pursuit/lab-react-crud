import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// const URL = import.meta.env.VITE_BASE_API_URL

import { getOneShow , destroyShow} from "../../api/fetch";

import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";

function Show() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const {
    id:showId,
    duration,
    listedIn,
    country,
    rating,
    dateAdded,
    description
  } = show;
  //will handle on thursday
  function handleDelete() {
    // const options = { method: "DELETE" };
    // fetch(`${URL}/shows/${id}`, options)
    destroyShow(id)
      .then(() => navigate("/shows"))
      .catch(error =>{
        console.log(error);
        setLoadingError(true);
      })
  }

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
