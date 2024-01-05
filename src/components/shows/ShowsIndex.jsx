import { Link } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react";

import ShowListing from "./ShowListing";
import ErrorMessage from "../errors/ErrorMessage";
// Top of file
import { getAllShows } from "../../api/fetch";

import "./ShowsIndex.css";


function filterShows(search, shows) {
  return shows.filter((show) => {
    return show.title.toLowerCase().match(search.toLowerCase());
  });
}

export default function ShowsIndex() {
  // src/components/show/ShowIndex
  const [shows, setShows] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  // Inside functional component
  const [loadingError, setLoadingError] = useState(false);

  function handleTextChange(event) {
    const inputTitle = event.target.value;
    const result = inputTitle.length ? filterShows(inputTitle, allShows) : allShows;
    setSearchTitle(inputTitle);
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
          <br />
          <label htmlFor="searchTitle">
            Search Shows:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
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
