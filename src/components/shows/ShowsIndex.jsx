import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ShowListing from "./ShowListing";

import ErrorMessage from "../errors/ErrorMessage";
// which means we can fetch from the background
import { getAllShows } from "../../api/fetch";

import "./ShowsIndex.css";

// doesnt handle any state so does not need to be in the component
//also it has parameters so we place it OUTSIDE of the function component
function filterShows(search, shows) {
  return shows.filter((show) => {
    return show.title.toLowerCase().match(search.toLowerCase());
  });
}

export default function ShowsIndex() {
  const [shows, setShows] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [loadingError, setLoadingError] = useState(false);

  const handleTextChange = (event) => {
    const title = event.target.value;
    const result = title.length ? filterShows(title, allShows) : allShows;
    // console.log(title);
    setSearchTitle(title);
    setShows(result);
  };
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
      {/* to check if the fetch was suceesful and the data is accessable */}
      {/* {console.log(shows)} */}
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
