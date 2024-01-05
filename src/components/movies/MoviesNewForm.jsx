import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { createMovie } from "../../api/fetch";



import "./MoviesForm.css"



export default function MoviesNewForm () {
  const navigate = useNavigate()
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
  })

  function handleMovieSubmit(event) {
    event.preventDefault();
    createMovie(movie)
    .then((response) => {
      navigate(`/movies/${response.id}`)
    })
    .catch((error) => {
      console.error(error)
    })
  } 

  function handleMovieTextChange(event) {
    setMovie({
      ...movie,
      [event.target.id]: event.target.value
    });
  }

  return (
    <form onSubmit={handleMovieSubmit}>
      <label htmlFor="title">Title:</label>
      <input 
      type="text"
      id="title"
      value={movie.title}
      onChange={handleMovieTextChange} 
      />
      <label htmlFor="description">Description:</label>
      <input 
      type="text"
      id="description"
      value={movie.description}
      onChange={handleMovieTextChange} 
      />
      <label htmlFor="type">Type</label>
      <input 
      type="text"
      id="type"
      value={movie.type}
      onChange={handleMovieTextChange} 
      />
      <label htmlFor="rating">Rating:</label>
      <input 
      type="text"
      id="rating"
      value={movie.rating}
      onChange={handleMovieTextChange} 
      />
      <label htmlFor="listedIn">Listed In</label>
      <input 
      type="text"
      id="listedIn"
      value={movie.listedIn}
      onChange={handleMovieTextChange} 
      />
      <label htmlFor="duration">Duration:</label>
      <input 
      type="text"
      id="duration"
      value={movie.duration}
      onChange={handleMovieTextChange} 
      />
      <label htmlFor="releaseYear">Release Year</label>
      <input 
      type="text"
      id="releaseYear"
      value={movie.releaseYear}
      onChange={handleMovieTextChange} 
      />
      <label htmlFor="country">Country</label>
      <input 
      type="text"
      id="country"
      value={movie.country}
      onChange={handleMovieTextChange} 
      />
      <label htmlFor="dateAdded">Date added:</label>
      <input 
      type="text"
      id="dateAdded"
      value={movie.dateAdded}
      onChange={handleMovieTextChange} 
      />

      <br />

      <input type="submit"/>
    </form>
  )
}
