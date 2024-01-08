// Import necessary hooks and styles
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ShowsForm.css";
import { getOneShow } from "../../api/fetch"; // Import function to fetch show details

// Fetch the base API URL from the environment variables
const URL = import.meta.env.VITE_BASE_API_URL;

export default function ShowsEditForm() {
  // Initialize state variables and retrieve 'id' from URL parameters
  const navigate = useNavigate(); // Navigation function
  const { id } = useParams(); // Extracts 'id' from URL
  const [show, setShow] = useState({
    // State to manage show details
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

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevents default form submission behavior

    // Construct options for the PUT request
    const options = {
      method: "PUT",
      body: JSON.stringify(show), // Convert 'show' object to JSON string
      headers: { "Content-Type": "application/json" }, // Set headers
    };

    // Perform PUT request to update show details
    fetch(`${URL}/shows/${id}`, options) // Uses URL and options
      .then((response) => response.json()) // Parse response as JSON
      .then(() => navigate(`/shows/${id}`)); // Navigate to the updated show
  }

  // Function to handle changes in input fields
  function handleTextChange(event) {
    // Update 'show' state with the changed field's value
    setShow({
      ...show, // Maintain the current state
      [event.target.id]: event.target.value, // Update specific field with new value
    });
  }

  // Effect hook to fetch show details when 'id' changes
  useEffect(() => {
    // Fetch details of a specific show based on 'id'
    getOneShow(id)
      .then((response) => {
        setShow(response); // Update 'show' state with fetched data
      })
      .catch((error) => {
        console.error(error); // Log error if fetching data fails
      });
  }, [id]); // Dependencies to trigger the effect

  // Render a form for editing show details
  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for various show properties */}
      {/* Each input field is associated with a label and an event handler */}
      {/* The 'value' attribute is bound to the corresponding property in the 'show' state */}
      {/* 'onChange' event triggers the 'handleTextChange' function */}
      {/* 'id' attribute associates the input with the specific show property */}
      {/* Submit button to submit the form */}
    </form>
  );
}
