import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getOneMovie } from "../../api/fetch";
import "../shows/Show.css"

import ErrorMessage from "../errors/ErrorMessage";

const Movie = () => {
    const { id } = useParams()

    const [movie, setMovie] = useState({});
    const [loadingError, setLoadingError] = useState(false);

    const {
        id: movieId,
        title,
        duration,
        listedIn, 
        country, 
        rating, 
        dateAdded, 
        description,
      } = movie

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
          </>
        )}
      </section>
    </section>
  )
}

export default Movie