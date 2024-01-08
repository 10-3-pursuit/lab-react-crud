import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom for navigation
import "./ShowListing.css"; // Importing CSS styles specific to the ShowListing component

export default function ShowListing({
  // Defining the ShowListing component and accepting an object as props
  show: { id, title, description, listedIn, duration }, // Destructuring props to access specific show properties
}) {
  return (
    <article className="show">
      {" "}
      {/* Creating an article container with a 'show' class */}
      <h3 className="title">
        <Link to={`/shows/${id}`}>{title}</Link>{" "}
        {/* Creating a clickable Link with show title */}
      </h3>
      <p className="description">{description}</p>{" "}
      {/* Displaying the show description */}
      <aside className="details">
        {" "}
        {/* Creating an aside container with 'details' class */}
        <p>
          <span>Listed Categories:</span>
          {listedIn} {/* Displaying the listed categories of the show */}
        </p>
        <p>
          <span>Duration:</span> {duration}{" "}
          {/* Displaying the duration of the show */}
        </p>
      </aside>
    </article>
  );
}
