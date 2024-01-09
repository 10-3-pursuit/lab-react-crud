import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MoviesNewForm() {
  const URL = import.meta.env.VITE_BASE_API_URL;

  const navigate = useNavigate();

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

  function handleSubmit(event) {
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
  }

  function handleChange(event) {
    setMovie({ ...movie, [event.target.id]: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        value={movie.title}
        onChange={handleChange}
        type="text"
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        onChange={handleChange}
        value={movie.description}
      />
      <label htmlFor="type">Type:</label>
      <input type="text" id="type" value={movie.type} onChange={handleChange} />
      <label htmlFor="rating">Rating:</label>
      <input
        type="text"
        id="rating"
        value={movie.rating}
        onChange={handleChange}
      />

      <label htmlFor="listedIn">Listed in</label>
      <input
        type="text"
        id="listedIn"
        value={movie.listedIn}
        onChange={handleChange}
      />

      <label htmlFor="duration">Duration</label>
      <input
        type="text"
        id="duration"
        value={movie.duration}
        onChange={handleChange}
      />

      <label htmlFor="releaseYear">Release Year</label>
      <input
        type="text"
        id="releaseYear"
        value={movie.releaseYear}
        onChange={handleChange}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        value={movie.country}
        onChange={handleChange}
      />

      <label htmlFor="dateAdded">Date added:</label>
      <input
        type="text"
        id="dateAdded"
        value={movie.dateAdded}
        onChange={handleChange}
      />
      <button onSubmit={handleSubmit}>Submit</button>
    </form>
  );
}

export default MoviesNewForm;
