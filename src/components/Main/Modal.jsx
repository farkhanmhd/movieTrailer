import { useState, useEffect } from "react";
import formattedDate from "../../assets/formattedDate";
import YouTube from "react-youtube";
import Button from "../Element/Button";

export default function Modal({ id, type, closeModal }) {
  const [movie, setMovie] = useState({});
  const [isYoutubeOpen, setYoutubeOpen] = useState(false);
  const [trailerVideoId, setTrailerVideoId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const aspectRatio = 16 / 9;
  const calculatedHeight = windowWidth * (1 / aspectRatio);

  const apiKey = "13fac615ed3a65fbe773c50d2cc4b10e";
  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;

    async function fetchData() {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMovie(data);
        const videoType = type === "movie" ? "movie" : "tv";
        const videoId = await fetchTrailerUrl(data.id, videoType);
        setTrailerVideoId(videoId);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    fetchData();
  }, [id, type]);

  const fetchTrailerUrl = async (movie_id, type) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${movie_id}/videos?api_key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const trailerItem = data.results.find((item) => item.type === "Trailer");

      if (!trailerItem) {
        throw new Error("No trailer found for the media.");
      }

      const videoId = trailerItem.key;
      return videoId;
    } catch (error) {
      console.error("Error fetching trailer URL:", error);
      throw new Error("Failed to fetch trailer URL.");
    }
  };

  const closeYoutube = () => {
    const youtubeContainer = document.querySelector(".youtube-container");
    youtubeContainer.classList.replace("opacity-100", "opacity-0");
    setTimeout(() => {
      setYoutubeOpen(false);
    }, 250);
  };

  return (
    <div
      className="modal-box fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.5)] z-[999] justify-center items-center duration-[350ms] flex opacity-0 backdrop-blur-sm"
      onClick={closeModal}
      id={`modal-${id}`}
    >
      <div
        className="modal-content text-black dark:text-white bg-zinc-900 p-0 rounded-xl w-5/6 h-4/6 sm:h-6/6 sm:w-4/6 duration-[250ms] overflow-hidden relative opacity-0"
        id={`detail-${id}`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt="poster"
          className="object-cover object-center w-full h-full sm:aspect-video"
        />
        <div
          className="movie-detail drop-shadow-md absolute bottom-0 flex flex-col gap-5 pb-5 sm:pb-10 px-5 sm:px-10 w-full text-white text-xs sm:text-base items-start"
          style={{
            background:
              "linear-gradient(to bottom, transparent , rgba(0,0,0,.90) 65%)",
          }}
        >
          <h2 className="text-lg sm:text-6xl font-bold drop-shadow-md">
            {movie.title || movie.name}
          </h2>
          <Button
            onClick={() => setYoutubeOpen(!isYoutubeOpen)}
            text={"Watch Trailer"}
          />
          <p className=" drop-shadow-md">
            Release Date :{" "}
            {formattedDate(movie.release_date || movie.first_air_date)}
          </p>
          <p className=" drop-shadow-md">
            Score :{" "}
            {Number(movie.vote_average) % 1 !== 0
              ? Number(movie.vote_average).toFixed(2)
              : Number(movie.vote_average)}
          </p>
          <p className="line-clamp-2  drop-shadow-md">{movie.overview}</p>
        </div>
      </div>
      {isYoutubeOpen && (
        <div
          className="youtube-container bg-[rgba(0,0,0,.7)] fixed w-screen h-screen flex justify-center items-center fade-in z-[999]"
          onClick={closeYoutube}
        >
          <div className="youtube-media rounded-xl overflow-hidden shadow-lg fade-in ">
            <YouTube
              videoId={trailerVideoId}
              opts={{
                width: `${windowWidth * 0.8}`,
                height: `${calculatedHeight * 0.8}`,
                playerVars: { autoplay: 1 },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
