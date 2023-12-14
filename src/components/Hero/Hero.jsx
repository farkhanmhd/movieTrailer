import { useEffect, useState } from "react";
import Card from "../Main/Card";
import formattedDate from "../../assets/formattedDate";
import "../../assets/animation.css";
import Button from "../Element/Button";
import YouTube from "react-youtube";

export default function Hero() {
  const [movies, setMovie] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDate, setMovieDate] = useState("");
  const [movieScore, setMovieScore] = useState(0);
  const [movieOverview, setMovieOverview] = useState("");
  const [movieBackground, setMovieBackground] = useState("");
  const [isYoutubeOpen, setYoutubeOpen] = useState(false);
  const [trailerVideoId, setTrailerVideoId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const apiKey = "13fac615ed3a65fbe773c50d2cc4b10e";

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

  const fetchTrailerUrl = async (movie_id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}`
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

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMovie(data.results);
        setMovieTitle(data.results[0].title);
        setMovieDate(data.results[0].release_date);
        setMovieScore(data.results[0].vote_average);
        setMovieOverview(data.results[0].overview);
        setMovieBackground(data.results[0].backdrop_path);
        const videoId = await fetchTrailerUrl(data.results[0].id);
        setTrailerVideoId(videoId);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const changeMovie = async (movie) => {
    if (movie.title === movieTitle) return;
    setMovieTitle(movie.title);
    setMovieDate(movie.release_date);
    setMovieScore(movie.vote_average);
    setMovieOverview(movie.overview);
    setMovieBackground(movie.backdrop_path);
    const heroContent = document.querySelector(".hero-content");
    const heroDetail = document.querySelector(".hero-detail");
    heroContent.classList.add("reveal");
    heroDetail.classList.add("fade-in");
    const videoId = await fetchTrailerUrl(movie.id);
    setTrailerVideoId(videoId);
    setTimeout(() => {
      heroContent.classList.remove("reveal");
      heroDetail.classList.remove("fade-in");
    }, 500);
  };

  return (
    <div
      className={`hero w-full h-screen flex items-center md:items-end text-white bg-cover bg-no-repeat bg-center duration-[250ms]`}
      style={{
        backgroundImage:
          movies.length > 0
            ? `url(https://image.tmdb.org/t/p/original/${movieBackground})`
            : "none",
      }}
    >
      <div className="hero-content flex flex-col sm:flex-row w-full h-full bg-gradient-to-b from-transparent to-black items-end gap-5 md:gap-8 pb-10">
        <div className="hero-detail flex flex-col gap-2 md:gap-8 w-full md:w-1/2 h-1/2 sm:h-1/2 md:h-auto justify-start sm:justify-evenly md:justify-between pt-20 md:py-24 px-10 md:px-16">
          <h2 className="text-4xl sm:text-4xl md:text-7xl font-bold drop-shadow-md">
            {movies.length > 0 ? movieTitle : "Title"}
          </h2>
          <p className="text-base md:text-3xl  drop-shadow-md">
            Release Date :{" "}
            {movies.length > 0 ? formattedDate(movieDate) : "Release Date"}
          </p>
          <div className="score flex items-center gap-y-2 gap-x-10 flex-wrap">
            <p className=" md:text-3xl inline drop-shadow-md">
              Score : {movies.length > 0 ? movieScore.toFixed(2) : "Score"}{" "}
            </p>
            <Button
              onClick={() => setYoutubeOpen(!isYoutubeOpen)}
              text={"Watch Trailer"}
            />
          </div>
          <p className="line-clamp-3 sm:line-clamp-4 xl:line-clamp-none  drop-shadow-md">
            {movies.length > 0 ? movieOverview : "Overview"}
          </p>
        </div>
        <div className=" hero-posters-container w-full sm:w-1/2 h-1/2 md:h-[60%] flex px-10">
          <div className="hero-posters flex gap-5 sm:gap-10 rounded-lg items-center w-full overflow-auto">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                title={movie.title}
                imageSource={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                subtitle={movie.overview}
                releaseDate={movie.release_date.slice(0, 4)}
                voteAverage={movie.vote_average.toFixed(1)}
                onClick={() => {
                  changeMovie(movie);
                }}
              />
            ))}
          </div>
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
