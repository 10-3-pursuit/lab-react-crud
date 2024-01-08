# Show Component Breakdown

### Purpose:

The `Show` component is responsible for displaying detailed information about a specific show, including its details and options to delete or edit.

### Imports:

- `useState` and `useEffect` from `react` for managing component state and side effects.
- `Link`, `useParams`, and `useNavigate` from `react-router-dom` for navigation and URL parameter handling.
- `getOneShow` from the API to fetch data.
- `ErrorMessage` component for displaying error messages.
- `Show.css` for specific component styles.

### State:

- `show`: Stores fetched show data.
- `loadingError`: Tracks loading errors.

### Hooks Used:

- `useParams()`: Retrieves parameters from the URL.
- `useNavigate()`: Provides navigation function.
- `useEffect()`: Fetches show data based on `id` parameter and handles loading errors.

### Functionality:

- Fetches show data based on the `id` provided in the URL.
- Displays show details (duration, categories, country, rating, date added, description).
- Provides options to delete the show and navigate to the edit page.

### Conditional Rendering:

- Checks for loading errors and displays an error message using the `ErrorMessage` component if there's an issue fetching data.
- Renders show details only if there are no loading errors; otherwise, shows the error message.

### Components Rendered:

- Title, show details, description, delete button, and edit button are rendered based on fetched show data.

### Code Structure:

The component uses state management, routing parameters, and conditional rendering to display specific show information and handle show-related actions.

### Notes:

- `getOneShow(id)` fetches show data using the provided `id` parameter.
- `handleDelete()` sends a delete request for the current show and navigates back to the shows list upon success.
