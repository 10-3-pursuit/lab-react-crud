import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import"./MoviesForm.css";
import { updateMovie, getOneMovie } from "../../api/fetch";

export default function MoviesEditForm() {
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

  const navigate = useNavigate()
  const {id} = useParams()

  function handleMovieSubmit(event) {
    event.preventDefault()
    updateMovie(id, movie)
    .then(() => {
      navigate(`/movies/${id}`)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  function handleMovieTextChange(event) {
    setMovie({
      ...movie,
      [event.target.id] : event.target.value
    })
  }

  useEffect(() => {
    getOneMovie(id)
    .then((response) => {
      setMovie(response)
    })
    .catch((error) => {
      console.error(error)
    })
  },[id])
  
  return (
    <form onSubmit={handleMovieSubmit}>
      <label htmlFor="title">Title: </label>
      <input 
      type="text"
      id="title" 
      value={movie.title}
      onChange={handleMovieTextChange}
      />
      
      <label htmlFor="description">Description: </label>
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

      <label htmlFor="rating">Rating: </label>
      <input 
      type="text"
      id="rating" 
      value={movie.rating}
      onChange={handleMovieTextChange}
      />

      <label htmlFor="listedIn">Listed in</label>
      <input 
      type="text"
      id="listedIn" 
      value={movie.listedIn}
      onChange={handleMovieTextChange}
      />

      <label htmlFor="duration">Duration</label>
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

      <label htmlFor="dateAdded">Date added: </label>
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
