import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ShowListing from "./ShowListing";

import ErrorMessage from "../errors/ErrorMessage";

import { getAllShows } from "../../api/fetch";

import "./ShowsIndex.css";

function filterShows(searchWord, allOfTheShows) {
  return allOfTheShows.filter((singleShow) => {
    // this .title is coming from the backend api key called title
    return singleShow.title.toLowerCase().match(searchWord.toLowerCase());
  });
}

export default function ShowsIndex() {
  // this will render shows on the page after the search
  const [shows, setShows] = useState([]);
  // this will ALWAYS be the full set of show data
  const [allShows, setAllShows] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [loadingError, setLoadingError] = useState(false);

  function handleTextChange(event) {
    const inputTitle = event.target.value;
    const result = inputTitle.length
      ? filterShows(inputTitle, allShows)
      : allShows;
    setSearchTitle(inputTitle);
    setShows(result);
  }

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
            {/* <!-- ShowListing components --> */}
            {shows.map((show) => {
              return <ShowListing show={show} key={show.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}
