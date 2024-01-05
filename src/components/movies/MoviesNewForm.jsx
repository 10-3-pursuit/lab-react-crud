import { useState } from "react";
const URL = import.meta.env.VITE_BASE_API_URL;

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
  function handleTextChangeMovie () {};

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
        onChange={handleTextChange}
      />

      <label htmlFor="duration">Duration</label>
      <input
        type="text"
        id="duration"
        value={movie.duration}
        onChange={handleTextChange}
      />

      <label htmlFor="releaseYear">Release Year</label>
      <input
        type="text"
        id="releaseYear"
        value={movie.releaseYear}
        onChange={handleTextChange}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        value={movie.country}
        onChange={handleTextChange}
      />

      <label htmlFor="dateAdded">Date added:</label>
      <input
        type="text"
        id="dateAdded"
        value={movie.dateAdded}
        onChange={handleTextChange}
      />

      <br />

      <input type="submit" />
    </form>
  );
}

export default MoviesNewForm;