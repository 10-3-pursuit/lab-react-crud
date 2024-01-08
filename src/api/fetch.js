// Shows
const URL = import.meta.env.VITE_BASE_API_URL;

// Create
export function createShow(show) {
  return;
}

// Delete
export function destroyShow(id) {
  return;
}

// Index/Get all
export function getAllShows() {
  // for debugging purposes
  // console.log("this fetch ran");
  /**
   * const data = fetch(`${URL}/shows`).then((response) => response.json());
   * console.log(data)
   */
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

// Get All Movies function
export function getAllMovies() {
  return fetch(`${URL}/movies`).then((response) => response.json());
}

// Show/Get one fx
export function getOneMovie(id) {
  return fetch(`${URL}/movies/${id}`).then((response) => response.json());
}
