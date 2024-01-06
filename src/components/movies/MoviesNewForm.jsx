import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_API_URL;
import "./ShowsForm.css"; // css used for shows display also can be used for movies display
// Forms usually need their own useState
const MoviesNewForm = () => {
  const navigate = useNavigate(); // to navigate routes once form is submitted

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

  function handleSubmitMovie (event) {
    event.preventDefault();

    const options = {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${URL}/movies/`, options)
      .then((response) => response.json())
      .then((response) => {
        navigate(`/movies/${response.id}`);
      })
      .catch((error) => console.error(error));
  };

  function handleTextChangeMovie (event) {
    setMovie({
        // make shallow copy of data with spread op
        ...movie,
        [event.target.id] : event.target.value, 
    });
  };

  return (
    <form onSubmit={handleSubmitMovie}>
        <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={movie.title}
        onChange={handleTextChangeMovie}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={movie.description}
        onChange={handleTextChangeMovie}
      />

      <label htmlFor="type">Type</label>
      <input
        type="text"
        id="type"
        value={movie.type}
        onChange={handleTextChangeMovie}
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="text"
        id="rating"
        value={movie.rating}
        onChange={handleTextChangeMovie}
      />

      <label htmlFor="listedIn">Listed in</label>
      <input
        type="text"
        id="listedIn"
        value={movie.listedIn}
        onChange={handleTextChangeMovie}
      />

      <label htmlFor="duration">Duration</label>
      <input
        type="text"
        id="duration"
        value={movie.duration}
        onChange={handleTextChangeMovie}
      />

      <label htmlFor="releaseYear">Release Year</label>
      <input
        type="text"
        id="releaseYear"
        value={movie.releaseYear}
        onChange={handleTextChangeMovie}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        value={movie.country}
        onChange={handleTextChangeMovie}
      />

      <label htmlFor="dateAdded">Date added:</label>
      <input
        type="text"
        id="dateAdded"
        value={movie.dateAdded}
        onChange={handleTextChangeMovie}
      />

      <br />

      <input type="submit" />
    </form>
  );
}

export default MoviesNewForm;