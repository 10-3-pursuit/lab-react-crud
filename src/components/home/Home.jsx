import hero from "../../assets/denise-jans-Lq6rcifGjOU-unsplash.jpg"; // Importing the hero image

export default function Home() {
  return (
    <div>
      <img src={hero} alt="film" /> {/* Rendering the hero image */}
      <p>
        Photo by{" "}
        <a
          href="https://unsplash.com/@dmjdenise?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
        >
          Denise Jans
        </a>{" "}
        on{" "}
        <a
          href="https://unsplash.com/s/photos/movie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
        >
          Unsplash
        </a>
      </p>
    </div>
  );
}
