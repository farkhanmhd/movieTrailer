import { useEffect, useState } from "react";
import Card from "../Main/Card";
import formattedDate from "../../assets/formattedDate";
import "../../assets/animation.css";

export default function Hero() {
  const [movies, setMovie] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDate, setMovieDate] = useState("");
  const [movieScore, setMovieScore] = useState(0);
  const [movieOverview, setMovieOverview] = useState("");
  const [movieBackground, setMovieBackground] = useState("");

  useEffect(() => {
    const apiKey = "13fac615ed3a65fbe773c50d2cc4b10e";
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
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const changeMovie = (movie) => {
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
      <div className="hero-content flex flex-col md:flex-row w-full h-full bg-gradient-to-b from-transparent to-black items-end  md:gap-8 pb-0 md:pb-10">
        <div className="hero-detail flex flex-col gap-4 md:gap-8 w-full md:w-1/2 h-2/6 sm:h-1/2 md:h-auto justify-evenly md:justify-between pt-28 md:py-24 px-14 md:px-16">
          <h2 className="text-5xl md:text-7xl font-bold">
            {movies.length > 0 ? movieTitle : "Title"}
          </h2>
          <p className="text-base md:text-3xl">
            Release Date :{" "}
            {movies.length > 0 ? formattedDate(movieDate) : "Release Date"}
          </p>
          <p className=" md:text-3xl">
            Score : {movies.length > 0 ? movieScore.toFixed(2) : "Score"}{" "}
          </p>
          <p className="line-clamp-3 sm:line-clamp-4 xl:line-clamp-none">
            {movies.length > 0 ? movieOverview : "Overview"}
          </p>
        </div>
        <div className=" hero-posters-container w-full md:w-1/2 h-4/6 sm:h-1/2 md:h-auto flex justify-normal">
          <div className="hero-posters flex gap-10 overflow-auto rounded-lg items-center scale-[.7] sm:scale-[.9] ">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                title={movie.title}
                imageSource={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                subtitle={movie.overview}
                releaseDate={movie.release_date.slice(0, 4)}
                voteAverage={movie.vote_average.toFixed(1)}
                onClick={() => changeMovie(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
