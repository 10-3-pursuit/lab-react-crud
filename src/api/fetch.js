// Shows
const URL = import.meta.env.VITE_BASE_API_URL;

// Create
export function createShow(show) {
  const options = {
    method: "POST",
    body: JSON.stringify(show),
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${URL}/api/shows/`, options).then((response) => {
    return response.json();
  });
}

// Delete
export function destroyShow(id) {
  return;
}

// Index/Get all
export function getAllShows() {
  return fetch(`${URL}/api/shows`).then(response => response.json()); 
}

// Show/Get one
export function getOneShow(id) {
  return fetch(`${URL}/api/shows/${id}`).then((response) => response.json());
}

// Update
export function updateShow(id, show) {
  const options = {
    method: "PUT",
    body: JSON.stringify(show),
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${URL}/api/shows/${id}`, options).then((response) => {
    return response.json();
  });
}

// Movies

export function getAllMovies() {
  return fetch(`${URL}/api/movies`).then(response => response.json()); 
}

export function createMovie(movie) {
  const options = {
    method: "POST",
    body: JSON.stringify(movie),
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${URL}/api/movies/`, options).then((response) => {
    return response.json();
  });
}

export function destroyMovie(id) {
  const options = { method: "DELETE" };
  return fetch(`${URL}/api/movies/${id}`, options);
}

export function getOneMovie(id) {
  return fetch(`${URL}/api/movies/${id}`).then((response) => response.json());
}

export function updateMovie(id, movie) {
  const options = {
    method: "PUT",
    body: JSON.stringify(movie),
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${URL}/api/movies/${id}`, options).then((response) => {
    return response.json();
  });
}