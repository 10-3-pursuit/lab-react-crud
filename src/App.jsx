import { Routes, Route } from "react-router-dom";

// Components
import Footer from "./components/common/Footer";
import Home from "./components/home/Home";
import Nav from "./components/common/Nav";
import Show from "./components/shows/Show"; // Importing Show component
import ShowsEditForm from "./components/shows/ShowsEditForm";
import ShowsIndex from "./components/shows/ShowsIndex";
import ShowsNewForm from "./components/shows/ShowsNewForm";
import Movie from "./components/movies/Movie"; // Importing Movie component
import MoviesEditForm from "./components/movies/MoviesEditForm";
import MoviesIndex from "./components/movies/MoviesIndex";
import MoviesNewForm from "./components/movies/MoviesNewForm";

function App() {
  return (
    <div className="wrapper">
      <Nav /> {/* Navigation component */}
      <Routes>
        {/* Routes for Shows */}
        <Route path="/" element={<Home />} /> {/* Default home route */}
        <Route path="/shows">
          <Route index element={<ShowsIndex />} /> {/* Shows index route */}
          <Route path="new" element={<ShowsNewForm />} />{" "}
          {/* Create new show route */}
          <Route path=":id" element={<Show />} /> {/* Individual show route */}
          <Route path=":id/edit" element={<ShowsEditForm />} />{" "}
          {/* Edit show route */}
        </Route>
        {/* Routes for Movies */}
        <Route path="/" element={<Home />} /> {/* Default home route */}
        <Route path="/movies">
          <Route index element={<MoviesIndex />} /> {/* Movies index route */}
          <Route path="new" element={<MoviesNewForm />} />{" "}
          {/* Create new movie route */}
          <Route path=":id" element={<Movie />} />{" "}
          {/* Individual movie route */}
          <Route path=":id/edit" element={<MoviesEditForm />} />{" "}
          {/* Edit movie route */}
        </Route>
      </Routes>
      <Footer /> {/* Footer component */}
    </div>
  );
}

export default App;
