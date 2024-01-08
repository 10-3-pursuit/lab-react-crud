import "./ErrorMessage.css"; // Importing CSS styles for the ErrorMessage component

export default function ErrorMessage() {
  return (
    <section className="error">
      {/* Section for displaying error */}
      <p>Something went wrong! Please try again later.</p> {/* Error message */}
    </section>
  );
}
