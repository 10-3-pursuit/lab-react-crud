import { getAllMovies } from "../../api/fetch";
import { Link } from "react-router-dom";

import ErrorMessage from "../errors/ErrorMessage";

import { useState, useEffect } from "react";

import MoviesListing from "./MoviesListing";

function filterMovies(search, movies) {
    return movies.filter((movie) => {
        return movie.title.toLowerCase().match(search.toLowerCase());
    });
}

export default function MoviesIndex() {
    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [loadingError, setLoadingError] = useState(false);
    const [searchTitle, setSearchTitle] = useState("");

    const handleTextChange = (event) => {
        const movieTitle = event.target.value;
        const result = movieTitle.length
            ? filterMovies(movieTitle, allMovies)
            : allMovies;
        setSearchTitle(movieTitle);
        setMovies(result);
    };

    useEffect(() => {
        getAllMovies()
            .then((data) => {
                setAllMovies(data);
                setMovies(data);
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
                <section className="movies-index-wrapper">
                    <h2>All Movies</h2>
                    <button>
                        <Link to="/movies/new">Add a new movie</Link>
                    </button>
                    <br />
                    <label htmlFor="searchTitle">
                        Search Movies:
                        <input
                            type="text"
                            value={searchTitle}
                            id="searchTitle"
                            onChange={handleTextChange}
                        />
                    </label>
                    <section className="movies-index">
                        {/* <!-- ShowListing components --> */}
                        {movies.map((movie) => (
                            <MoviesListing movie={movie} key={movie.id} />
                        ))}
                    </section>
                </section>
            )}
        </div>
    );
}
