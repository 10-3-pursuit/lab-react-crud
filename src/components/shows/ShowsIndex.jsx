import { getAllShows } from "../../api/fetch";
import { Link } from "react-router-dom";

import ErrorMessage from "../errors/ErrorMessage";

import "./ShowsIndex.css";
import { useState, useEffect } from "react";
import ShowListing from "./ShowListing";

function filterShows(search, shows) {
    return shows.filter((show) => {
        return show.title.toLowerCase().match(search.toLowerCase());
    });
}

export default function ShowsIndex() {
    const [searchTitle, setSearchTitle] = useState("");
    const [shows, setShows] = useState([]);
    const [allShows, setAllShows] = useState([]);
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        getAllShows()
            .then((data) => {
                setAllShows(data);
                setShows(data);
                setLoadingError(false);
            })
            .catch((error) => {
                console.log(error);
                setLoadingError(true);
            });
    }, []);

    const handleTextChange = (e) => {
        const title = e.target.value;
        const result = title.length ? filterShows(title, allShows) : allShows;
        setSearchTitle(title);
        setShows(result);
    };

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
                        {shows.map((show) => (
                            <ShowListing show={show} key={show.id} />
                        ))}
                    </section>
                </section>
            )}
        </div>
    );
}
