import { useState } from 'react'; // used for managing state in a functional component
 
const URL = import.meta.env.VITE_BASE_API_URL; //This line imports an environment variable which likely contains the base URL for an API.

import { getOneMovie  } from '../../api/fetch' // to access these callback fx which fetches data from the API and sends requests to API

const MoviesShowOne = () => {
  const [movie, setMovie] = useState ({});
  const {
    // because there are two id variables, we will give this id key a new name, an alias, called showId
    id: showId,
    duration,
    listedIn,
    country,
    rating,
    dateAdded,
    description,
  } = movie;

  return (
    <div>MoviesShowOne</div>
  )
}

export default MoviesShowOne