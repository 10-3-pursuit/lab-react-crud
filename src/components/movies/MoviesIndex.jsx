import { Link } from "react-router-dom"; // to navigate views without refreshing page
import ErrorMessage from "../errors/ErrorMessage";
import { getAllMovies } from "../../api/fetch";

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

  const [movies, setMovies] = useState([]); // to get movie data
  const [earWaxError, setEarWaxError] = useState(false); //toggle whether or not earwax is false (ERROR!!)
  const [allEarWax, setAllEarWax] = useState([]); // initial state is no earwax in array
  const [searchEarWaxTitle, setSearchEarWaxTitle] = useState(""); // for search bar input

  const handleTextChangeEarWax = () => {};

  // implement useEffect (()=>{}) that happens once when page renders (so make sure to put second argument to be empty array) which will load all movies after the effect is implemented (initial state is empty array) as long as there is no error rendering
useEffect (()=>{
  getAllMovies() // gets entire data
    .then((data)=>{
      setAllEarWax(data); // lets us set useEffect for the data; which is used to update the component's state with the fetched data. This is important for rendering the list of movies and for the search functionality to work correctly.
      setMovies(data); // lets us set useEffect for each movie that way you can choose it when searching
      setEarWaxError(false); // handles any errors along with following catch error lines that might occur during the data fetching process (if error it'll change the useState to true)
    })
    .catch ((error)=>{
      console.error(error); // logs error
      setEarWaxError(true); // if error it'll change the useState to true used with line 37
    });
}, []); // second param empty array so effect happens once only when page renders

  return (
  <div>
    {/* add ternary to include error message if earWaxError is true */}
    <section className="shows-index-wrapper">
      <h2>All Movies</h2>
      <button>
      <Link to="/movies/new">Add a new movie</Link>
      </button>
      <br />
      {/* create HTML for searchbar */}
      <label htmlFor="searchEarWaxTitle">
        Search Movies:
        {/* type is text bc string, value is the useState, id must match useState name, add the onChange fx. Note: App breaks when adding handler to onChange if fx hasn't been previously created */}
        <input
          type="text"
          value={searchEarWaxTitle}
          id="seachEarWaxTitle"
          onChange={handleTextChangeEarWax}
        />
      </label>
    <section className="shows-index">
      {movies.map((movie) => {
        return <MovieListing movie={movie} key={movie.id} />;
        })}
    </section>
    </section>
  </div>
  );
}