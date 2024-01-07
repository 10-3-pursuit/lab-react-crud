import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../shows/Show.css"; // css used for shows display also can be used for movies display
import { getOneMovie } from "../../api/fetch";
// Forms usually need their own useState
const URL = import.meta.env.VITE_BASE_API_URL;

//import getOneMovie fx to be able to edit a particular movie based on id

const MoviesEditForm = () => {
  const navigate = useNavigate(); // to navigate routes once form is submitted
  const { id } = useParams;

  const [movie, setMovie] = useState({ //use to initialize state of form / reset form
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

  function handleSubmitMovieEditForm (event) { // similar to new form fx but method is PUT in this case instead of POST
    event.preventDefault();
    const options = {
      method: "PUT", // change this to PUT because we are editing (updating) existing movie that matches parameter id in the form not submitting new movie
      body: JSON.stringify(movie), // Converts a JavaScript value to a JavaScript Object Notation (JSON) string to be able to update API data
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${URL}/movies/${id}`, options) // need to add the useParams parameter ${id} to /movies/
      .then((response) => response.json())
      .then(() => navigate(`/movies/${id}`)); // implicit syntax
      // .catch((error) => console.error(error));
  };

  function handleTextChangeMovie (event) {
    setMovie({
        // make shallow copy of data with spread op
        ...movie,
        [event.target.id] : event.target.value, 
    });
  };

  // need useEffect with getOneMovie(id) callback fx to get specified movie and edit it using the form
  useEffect(() => {
    getOneMovie(id)
      .then((response) => {
        setMovie(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <form onSubmit={handleSubmitMovieEditForm}>
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

export default MoviesEditForm;