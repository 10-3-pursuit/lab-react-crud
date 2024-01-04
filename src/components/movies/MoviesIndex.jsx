import { Link } from "react-router-dom";

import ErrorMessage from "../errors/ErrorMessage";

import "./MoviesIndex.css";

export default function MoviesIndex() {
  return (
  <div>
  {false ? (
    <ErrorMessage />
  ) : (
<section className="movies-index-wrapper">
  <p>Movie List</p>
<button>
<Link to="/movies/new">Add a new Movie</Link>
</button>
<br />
<label htmlFor="searchTitle">
  Search Movies:
  <input
  type="text"
id="searchTitle"
  />
</label>
<section className="movies-index">

</section>
  </section>

  )}
  </div>
  );
};
