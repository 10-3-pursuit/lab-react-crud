import { useState, useEffect } from "react"; // Importing necessary hooks from React
import { useNavigate, useParams } from "react-router-dom"; // Importing navigation-related hooks
import "./ShowsForm.css"; // Importing CSS styles for the ShowsForm component
import { getOneShow } from "../../api/fetch"; // Importing function to fetch a single show

const URL = import.meta.env.VITE_BASE_API_URL; // Defining the base URL for API calls

export default function ShowsNewForm() {
  const navigate = useNavigate(); // Initializing the navigate function for programmatic navigation
  const { id } = useParams(); // Extracting the 'id' parameter from the URL using useParams hook
  const [show, setShow] = useState({
    /* Initializing state using useState hook with default show properties */
    type: "",
    title: "",
    country: "",
    dateAdded: "",
    description: "",
    duration: "",
    listedIn: "",
    rating: "",
    releaseYear: "",
  });

  function handleSubmit(event) {
    // Function handling form submission
    event.preventDefault(); // Preventing default form submission behavior

    const options = {
      // Setting options for the fetch PUT request
      method: "PUT",
      body: JSON.stringify(show), // Sending the updated show object as JSON in the request body
      headers: { "Content-Type": "application/json" }, // Specifying JSON content type
    };

    fetch(`${URL}/shows/${id}`, options) // Sending PUT request to update the show
      .then((response) => response.json()) // Parsing the JSON response from the server
      .then(() => navigate(`/shows/${id}`)); // Navigating to the show's detail page after successful update
  }

  function handleTextChange(event) {
    // Function handling input changes
    setShow({
      // Updating the 'show' state using spread operator to merge previous state with new values
      ...show,
      [event.target.id]: event.target.value, // Updating specific field with new value based on input change
    });
  }

  useEffect(() => {
    // Effect hook to fetch a single show based on the 'id' parameter
    getOneShow(id) // Fetching the specific show based on the 'id'
      .then((response) => {
        setShow(response); // Setting the fetched show data in the state
      })
      .catch((error) => {
        console.error(error); // Logging any errors encountered during the fetch request
      });
  }, [id]); // Running the effect only when the 'id' parameter changes

  return (
    <form onSubmit={handleSubmit}>
      {/* Form element with event handler for form submission */}
      {/* Input fields for various show properties */}
      {/* Each input field is associated with a label and onChange event handler */}
      {/* The value attribute is bound to the corresponding property in the 'show' state */}
      {/* When the input value changes, handleTextChange function updates the state */}
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={show.title}
        onChange={handleTextChange}
      />
      {/* ... (Similar input fields for other show properties) ... */}
      <br /> {/* Line break for visual separation */}
      <input type="submit" /> {/* Submit button to trigger form submission */}
    </form>
  );
}
