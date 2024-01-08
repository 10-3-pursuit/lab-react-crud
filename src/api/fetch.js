// Shows
const URL = import.meta.env.VITE_BASE_API_URL;

// Create
export function createShow(show) {
  const options = { method: "POST" };
  return fetch(`${URL}/shows/${show}`, options);
}

export function createMovie(movie) {
  const options = { method: "POST" };
  return fetch(`${URL}/movies/${movie}`, options);
}

// Delete
export function destroyShow(id) {
  const options = { method: "DELETE" };
  return fetch(`${URL}/shows/${id}`, options);
}

export function destroyMovie(id) {
  const options = { method: "DELETE" };
  return fetch(`${URL}/movies/${id}`, options);
}
// Index/Get all
export function getAllShows() {
  return fetch(`${URL}/shows`).then((response) => response.json());
}

export function getAllMovies() {
  return fetch(`${URL}/movies`).then((response) => response.json());
}

// Show/Get one
export function getOneShow(id) {
  return fetch(`${URL}/shows/${id}`).then((response) => response.json());
}

export function getOneMovie(id) {
  return fetch(`${URL}/movies/${id}`).then((response) => response.json());
}

// Update
export function updateShow(id, show) {
  return;
}

export function updateMovie(id, movie) {
  return;
}

