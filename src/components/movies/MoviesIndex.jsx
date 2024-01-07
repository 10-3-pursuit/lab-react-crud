import { Link } from "react-router-dom"; // to navigate views without refreshing page
import ErrorMessage from "../errors/ErrorMessage"; // use as component as prop for error message handling
import { getAllMovies } from "../../api/fetch";
import "../shows/Show.css"; // css used for shows display also can be used for movies display
import { useEffect, useState } from "react";
import MovieListing from "./MovieListing";

//create filter fx for search bar

function filterMovies(beanSearch, movies) {  // beanSearch parameter is the user input for search bar form
  // iterate through movies (parameter for movie data in api which is an array of object)
  return movies.filter((movie) =>{
    return movie.title.toLowerCase().match(beanSearch.toLowerCase()); // .toLowerCase makes search input case insensitive
    //.match(search.toLowerCase()) checks if the movie title contains the search string. If it does, the match method returns a truthy value (not null), and the movie is included in the filtered array.
  });
}
 

export default function MoviesIndex() {
  // create listing component to import to see movie list when clicking button "movie list" (must map through array of objects)
  // useState to change view of movieListing
  // create handleTextChangeMovies with useState for the text change for searchbar

  const [moviesData, setMoviesData] = useState([]); // to get movie data
  const [movieError, setMovieError] = useState(false); //toggle whether or not earwax is false (ERROR!!)
  const [allMovies, setAllMovies] = useState([]); // initial state is no earwax in array
  const [searchMovieTitle, setSearchMovieTitle] = useState(""); // for search bar input

  const handleTextChangeMovie = (event) => { // use filterMovies fx as callback fx to handle search bar input. The parameters are the event listener and useState - not the set one, the other one (the one that holds the current state value for component)
    const title = event.target.value; // This line extracts the value from the event target (in this context an input field) and assigns it to a constant named title. The event.target refers to the DOM element that triggered the event, and .value gets the current value of that element
    const result = title.length ? filterMovies(title, allMovies) : allMovies;
    // now we put the variables to update the useStates pertaining to movies called setMoviesData and the variable to update the search with current value of the event listener (user input) which I previously named callously setSearchEarWaxTitle but now is setSearchMovieTitle
    setSearchMovieTitle(title);
    setMoviesData(result) //This line updates the movies state with the result. If title is not empty, shows will be set to the filtered list; otherwise, it will be set to the full list of shows (allShows). This state is lused to control what is displayed in the UI
  }; 

  // implement useEffect (()=>{}) that happens once when page renders (so make sure to put second argument to be empty array) which will load all movies after the effect is implemented (initial state is empty array) as long as there is no error rendering
useEffect (()=>{
  getAllMovies() // gets entire data
    .then((data)=>{
      setAllMovies(data); // lets us set useEffect for the data; which is used to update the component's state with the fetched data. This is important for rendering the list of movies and for the search functionality to work correctly.
      setMoviesData(data); // lets us set useEffect for each movie that way you can choose it when searching
      setMovieError(false); // handles any errors along with following catch error lines that might occur during the data fetching process (if error it'll change the useState to true)
    })
    .catch ((error)=>{
      console.error(error); // logs error
      setMovieError(true); // if error it'll change the useState to true used with line 37
    });
}, []); // second param empty array so effect happens once only when page renders

  return (
  <div>
    {/* add ternary that wraps around the entire section (after <div>) to include error message prop if setEarWaxError is true. Gotta use earWaxError part of the useState. If false page will render with all the movie stuff */}
    {movieError ? (
      <ErrorMessage />
    ) : (
    <section className="shows-index-wrapper">
      <h2>All Movies</h2>
      <button>
      <Link to="/movies/new">Add a new movie</Link>
      </button>
      {/* <br /> */}
      <label htmlFor="searchMovieTitle">
        Search Movies:
        {/* type is text bc string, value is the useState, id must match useState name, add the onChange fx. Note: App breaks when adding handler to onChange if fx hasn't been previously created */}
        <input
          type="text"
          value={searchMovieTitle}
          id="searchMovieTitle" // corrected syntax error typo
          onChange={handleTextChangeMovie}
        />
      </label>
      <section className="shows-index">
        {moviesData.map((movie) => {
          return <MovieListing movie={movie} key={movie.id} />;
        })}
      </section>
    </section> 
    )}
  </div>
  );
}