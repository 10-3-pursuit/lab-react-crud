import { Link } from "react-router-dom";
import ErrorMessage from "../errors/ErrorMessage";
import { getAllMovies } from "../../api/fetch";

export default function MoviesIndex() {
  // create listing component to import to see movie list when clicking button "movie list" (must map through array of objects)
  return <p>Movie List</p>;
}
