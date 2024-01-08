import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_API_URL; // API base URL

import { getOneShow } from "../../api/fetch"; // Importing function to fetch data

import "./Show.css"; // Importing CSS styles for the Show component

import ErrorMessage from "../errors/ErrorMessage"; // Importing the ErrorMessage component

function Show() {
  const [show, setShow] = useState({}); // State to store show data
  const [loadingError, setLoadingError] = useState(false); // State to track loading errors

  const { id } = useParams(); // Get ID parameter from URL
  const navigate = useNavigate(); // Navigation function from React Router

  const {
    id: showId,
    duration,
    listedIn,
    country,
    rating,
    dateAdded,
    description,
  } = show; // Destructuring show object to extract properties

  // Function to handle deletion of a show
  function handleDelete() {
    const options = { method: "DELETE" };
    return fetch(`${URL}/shows/${id}`, options)
      .then(() => navigate("/shows")) // Redirect to shows page after deletion
      .catch((error) => {
        console.log(error);
        setLoadingError(true); // Set loading error on delete failure
      });
  }

  // useEffect hook to fetch show data based on ID
  useEffect(() => {
    getOneShow(id)
      .then((data) => {
        setShow(data); // Set show data obtained from API
        // Check if the fetched data is empty, indicating an error
        if (Object.keys(data).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
      })
      .catch((error) => {
        setLoadingError(true); // Set loading error on fetch failure
      });
  }, [id]); // Runs whenever the 'id' parameter changes in the URL

  return (
    <section className="shows-show-wrapper">
      <h2>{show.title}</h2> {/* Displaying show title */}
      <section className="shows-show">
        {loadingError ? ( // If there's a loading error, display the ErrorMessage component
          <ErrorMessage />
        ) : (
          <>
            <aside>
              {/* Display show details */}
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
              <p>{description}</p> {/* Display show description */}
            </article>
            <aside>
              {/* Buttons for deleting and editing the show */}
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
