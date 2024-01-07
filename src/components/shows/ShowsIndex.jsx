import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../errors/ErrorMessage";
import { getAllShows } from "../../api/fetch";
import ShowListing from "./ShowListing";
import "./ShowsIndex.css";

// OUTSIDE of component. This uses PARAMETERS. Does not handle ANY STATES.
function filterShows(searchWord, allOfTheShows) {
  return allOfTheShows.filter((singleShow) => {
    //This .title is coming ftom the backend api key called title
    return singleShow.title.toLowerCase().match(searchWord.toLowerCase());
  });
}

export default function ShowsIndex() {
  // src/components/show/ShowIndex
  const [shows, setShows] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [loadingError, setLoadingError] = useState(false);

  function handleTextChange(event) {
    const inputTitle = event.target.value;
    const result = inputTitle.length ? filterShows(inputTitle, allShows) : allShows;
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
            {shows.map((show) => {
              return <ShowListing show={show} key={show.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}
