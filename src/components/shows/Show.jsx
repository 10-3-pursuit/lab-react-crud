import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_API_URL;

import { getOneShow, destroyShow } from "../../api/fetch";

import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";

function Show() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  // destructuring the show state so that we can be DRY in our JSX
  const {
    // because there are two id variable, we will give this id key a new name, an alias, called showId
    id: showId,
    duration,
    listedIn,
    country,
    rating,
    dateAdded,
    description,
  } = show;
  // will handle on Thursday
  function handleDelete() {
    // const options = { method: "DELETE" };
    // fetch(`${URL}/shows/${id}`, options)
    destroyShow(id)
      .then(() => navigate("/shows"))
      .catch((error) => {
        console.error(error);
        setLoadingError(true);
      });
  }

  useEffect(() => {
    getOneShow(id)
      .then((data) => {
        setShow(data);
        if (Object.keys(data).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
      })
      .catch((error) => {
        setLoadingError(true);
      });
  }, [id]);

  return (
    <section className="shows-show-wrapper">
      <h2>{show.title}</h2>
      <section className="shows-show">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {duration}
              </p>
              <p>
                <span>Listed Categories:</span> {listedIn}
              </p>
              <p>
                <span>Country:</span> {country}
              </p>
              <p>
                <span>Rating:</span> {rating}
              </p>
              <p>
                <span>Date Added:</span> {dateAdded}
              </p>
            </aside>
            <article>
              <p>{description}</p>
            </article>
            <aside>
              <button className="delete" onClick={handleDelete}>
                Remove show
              </button>
              <Link to={`/shows/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Show;







// import { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";

// import { getOneShow } from "../../api/fetch";

// import "./Show.css";

// import ErrorMessage from "../errors/ErrorMessage";

// function Show() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [show, setShow] = useState({});
//   const [loadingError, setLoadingError] = useState(false);

//   // destructuring the show state so that we can be DRY in our JSX
//   const {
//     // because there are two id variable, we will give this id key a new name, an alias, called showId
//     id: showId,
//     duration,
//     listedIn,
//     country,
//     rating,
//     dateAdded,
//     description,
//   } = show;
//   // will handle on Thursday
//   function handleDelete() {
//     const options = { method: "DELETE" };
//     fetch(`${URL}/shows/${id}`, options)
//       .then(() => navigate("/shows"))
//       .catch((error) => {
//         console.error(error);
//         setLoadingError(true);
//     });
//   }

//   useEffect(() => {
//     getOneShow(id)
//       .then((data) => {
//         setShow(data);
//         if (Object.keys(data).length === 0) {
//           setLoadingError(true);
//         } else {
//           setLoadingError(false);
//         }
//       })
//       .catch((error) => {
//         setLoadingError(true);
//       });
//   }, [id]);

//   return (
//     <section className="shows-show-wrapper">
//       <h2>{show.title}</h2>
//       <section className="shows-show">
//         {loadingError ? (
//           <ErrorMessage />
//         ) : (
//           <>
//             <aside>
//               <p>
//                 <span>Duration:</span> {duration}
//               </p>
//               <p>
//                 <span>Listed Categories:</span> {listedIn}
//               </p>
//               <p>
//                 <span>Country:</span> {country}
//               </p>
//               <p>
//                 <span>Rating:</span> {rating}
//               </p>
//               <p>
//                 <span>Date Added:</span> {dateAdded}
//               </p>
//             </aside>
//             <article>
//               <p>{description}</p>
//             </article>
//             <aside>
//               <button className="delete" onClick={handleDelete}>
//                 Remove show
//               </button>
//               <Link to={`/shows/${id}/edit`}>
//                 <button>Edit</button>
//               </Link>
//             </aside>
//           </>
//         )}
//       </section>
//     </section>
//   );
// }

// export default Show;







// import { useState } from "react";
// import { Link, useParams } from "react-router-dom";

// import "./Show.css";

// import ErrorMessage from "../errors/ErrorMessage";

// function Show() {
//   const [show, setShow] = useState({});
//   const [loadingError, setLoadingError] = useState(false);

//   const { id } = useParams();

//   function handleDelete() {}

//   return (
//     <section className="shows-show-wrapper">
//       <h2>{show.title}</h2>
//       <section className="shows-show">
//         {loadingError ? (
//           <ErrorMessage />
//         ) : (
//           <>
//             <aside>
//               <p>
//                 <span>Duration:</span> {show.duration}
//               </p>
//               <p>
//                 <span>Listed Categories:</span> {show.listedIn}
//               </p>
//               <p>
//                 <span>Country:</span> {show.country}
//               </p>
//               <p>
//                 <span>Rating:</span> {show.rating}
//               </p>
//               <p>
//                 <span>Date Added:</span> {show.dateAdded}
//               </p>
//             </aside>
//             <article>
//               <p>{show.description}</p>
//             </article>
//             <aside>
//               <button className="delete" onClick={() => handleDelete(show.id)}>
//                 Remove show
//               </button>
//               <Link to={`/shows/${id}/edit`}>
//                 <button>Edit</button>
//               </Link>
//             </aside>
//           </>
//         )}
//       </section>
//     </section>
//   );
// }

// export default Show;
