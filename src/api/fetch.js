// Shows
const URL = import.meta.env.VITE_BASE_API_URL
// Create
export function createShow(show) {
  return;
}

// Delete
export function destroyShow(id) {
  const options = { method: "DELETE" };
  return fetch(`${URL}/shows/${id}`, options);
}

// Index/Get all
export function getAllShows() {
  return fetch(`${URL}/shows`).then((response) => response.json());
}

// Show/Get one
export function getOneShow(id) {
  return fetch(`${URL}/shows/${id}`).then((response) => response.json());
}

// Update
export function updateShow(id, show) {
  return;
}

// Movies
// Get all movies
export function getAllMovies() {
  return fetch(`${URL}/movies`).then((response) => response.json());
}

// Create a new movie
export function createMovie(movie) {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  };
  return fetch(`${URL}/movies`, options).then(response => response.json());
}

// Delete a movie
export function destroyMovie(id) {
  const options = { method: "DELETE" };
  return fetch(`${URL}/movies/${id}`, options).then(response => response.json());
}

// Get a single movie
export function getOneMovie(id) {
  return fetch(`${URL}/movies/${id}`).then(response => response.json());
}

// Update a movie
export function updateMovie(id, movie) {
  const options = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  };
  return fetch(`${URL}/movies/${id}`, options).then(response => response.json());
}