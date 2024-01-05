import { useState } from "react";


// Forms usually need their own useState
const MoviesNewForm = () => {
  const [movie, setMovie] = useState({
    type: "",
    title: "",
    country: "",
    dateAdded: "",
    description: "",
    duration: "",
    listedIn: "",
    rating: "",
    releaseYear: "",
  });
  return (
    <div>MoviesNewForm</div>
  )
}

export default MoviesNewForm;