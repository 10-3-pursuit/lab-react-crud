import { Link } from "react-router-dom";
import "./ShowListing.css";

export default function ShowListing({
  show: { id, title, description, listedIn, duration },
}) {
  return (
    <article className="show">
      <h3 className="title">
        <Link to={`/shows/${id}`}>{title}</Link>
      </h3>
      <p className="description">{description}</p>
      <aside className="details">
        <p>
          <span>Listed Categories:</span>
          {listedIn}
        </p>
        <p>
          <span>Duration:</span> {duration}
        </p>
      </aside>
    </article>
  );
}







// import {Link} from 'react-router-dom'
// import "./ShowListing.css";

// export default function ShowListing({ show }) {
//   return (
//     <article className="show">
//       <h3 className="title">
//         <Link to={`/shows/${show.id}`}>{show.title}</Link>
//       </h3>
//       <p className="description">{show.description}</p>
//       <aside className="details">
//         <p>
//           <span>Listed Categories:</span>
//           {show.listedIn}
//         </p>
//         <p>
//           <span>Duration:</span> {show.duration}
//         </p>
//       </aside>
//     </article>
//   );
// }
