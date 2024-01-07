import { Link } from "react-router-dom";

import ErrorMessage from "../errors/ErrorMessage";
// Top of file
import { getAllShows } from "../../api/fetch";

import "./ShowsIndex.css";
import { useState, useEffect } from "react";
import ShowListing from "./ShowListing"; 

function filterShows(search, shows) {
  return shows.filter((show) => {
    return show.title.toLowerCase().match(search.toLowerCase());
  });
}

export default function ShowsIndex() {
  // src/components/show/ShowIndex
  const [shows, setShows] = useState([]);
  const [loadingError, setLoadingError] = useState(false);
  const [allShows, setAllShows] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  function handleTextChange(event) {
    const title = event.target.value;
    const result = title.length ? filterShows(title, allShows) : allShows;
  
    setSearchTitle(title);
    setShows(result);
  }
  
  // Inside the functional component
  useEffect(() => {
    getAllShows()
      .then((data) => {
        setAllShows(data);
        setShows(data);
        setLoadingError(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }, []);
  
  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Shows</h2>
          <button>
            <Link to="/shows/new">Add a new show</Link>
          </button>
          {/* <br /> */}
          <label htmlFor="searchTitle" />
            Search Shows:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          {/* </label> */}
          <section className="shows-index">
            {shows.map((show) => {
              return <ShowListing show={show} key={show.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}
