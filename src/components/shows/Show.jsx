import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // why is it in here?

const URL = import.meta.env.VITE_BASE_API_URL;

import { getOneShow, destroyShow } from "../../api/fetch";

import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";

function Show() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState({});
  const [loadingError, setLoadingError] = useState(false);
  // destructuring the show state so that we can be DRY in our JSX
  const {
    // because there are two id variable, we will give this id key a new name, an alias, called showId
    id: showId,
    duration,
    listedIn,
    country,
    rating,
    dateAdded,
    description,
  } = show;
  
  function handleDelete() {
    // const options = { method: "DELETE" };
    // fetch(`${URL}/shows/${id}`, options)
    destroyShow(id) // don't need to use URL variable here from line 4 because using callback fx from fetch.js
      .then(() => navigate("/shows"))
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
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
      .catch((error) => { // still works but idk why? even tho value is declared but value never read
        console.log(error);
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
                {/* not sure why it's not <button className="delete" onClick={() => handleDelete(showId)}> on line above */}
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