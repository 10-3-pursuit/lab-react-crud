import { useState, useEffect } from 'react'; // used for managing state in a functional component
import { Link, useParams, useNavigate } from "react-router-dom"; // need this for handle delete movie fx and useEffect fx which will update the component depending on id selected to display selected movie for deletion or editing
const URL = import.meta.env.VITE_BASE_API_URL; //This line imports an environment variable which likely contains the base URL for an API.

import { getOneMovie  } from '../../api/fetch' // to access these callback fx which fetches data from the API and sends requests to API

const MoviesShowOne = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState ({});
  const {
    // because there are two id variables, we will give this id key a new name, an alias, called showId. Deconstructing it makes it easier to use in jsx return
    id: showId,
    duration,
    listedIn,
    country,
    rating,
    dateAdded,
    description,
  } = movie;

  const handleDeleteMovie = () => { // App breaks if putting this fx in onClick on jsx return without creating it first. To create it must create useState for error. Then import useEffect and create a useEffect fx to handle sideeffects like error handling, navigating without refresh (must import useNavigate), useParams needs to be imported so we can use the id as a parameter for a callback fx that removes the movie depending on user input (on click) from deconstructing the movie data.
  };
// in useEffect is where u gotta use all the set____() variables
  useEffect(()=>{
    getOneMovie(id) // makes an API call to fetch details about a specific show based on its id
    .then((data)=>{  //Once the data is successfully fetched, the .then block executes.
      setMovie(movie); //to then update the movie state of the data according to the id and callback fx
      // next lines are for error handling so gotta import the error handling component first
    })
  },[id]); // The effect is triggered every time the id changes. This is because id is specified in the dependency array ([id]) of useEffect. Whenever id changes, useEffect reruns.

  return (
    <section className="shows-show-wrapper">
      <h2>{show.title}</h2>
      <section className="shows-show">
        {/* error ternary starts here where useEffect is true error message pops up and if false following code executes. Need to import error message component and place prop in ternary */}
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
              <button className="delete" onClick={handleDeleteMovie}>
                {/* The handleDeleteMovie function does not require showId because it uses the id from the URL parameters (useParams()), which is the identifier of the show to delete. */}
                Remove show
              </button>
              {/* need to import Link to access component that takes you to an edit form where id is used to find specific movie to edit; useParams needs to be imported so id can be used as a parameter */}
              <Link to={`/movies/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>

      </section>
    </section>
  );
}

export default MoviesShowOne