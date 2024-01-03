import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import { getAllShows } from "../../api/fetch";
import "./ShowsIndex.css";
import ShowListing from "./ShowListing";

function filterShows(search, shows) {
  return shows.filter((show) => {
    //this .title is coming from the backend api key called 'title'
    return show.title.toLowerCase().match(search.toLowerCase());
  });
}

export default function ShowsIndex() {
  const [loadingError, setLoadingError] = useState(false);
  //this will render the shows on the page after the search
  const [shows, setShows] = useState([]);
  //this will always be the full set of show data
  const [allShows, setAllShows] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const handleTextChange = (e) => {
    const inputTitle = e.target.value;
    const result = inputTitle.length
      ? filterShows(inputTitle, allShows)
      : allShows;
    setSearchTitle(inputTitle);
    setShows(result);
  };

  useEffect(() => {
    getAllShows()
      .then((data) => {
        setShows(data);
        setAllShows(data);
        setLoadingError(false);
      })
      .catch((error) => {
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
