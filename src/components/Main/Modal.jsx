import { useState, useEffect } from "react";

export default function Modal({ id, type, closeModal }) {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const apiKey = "13fac615ed3a65fbe773c50d2cc4b10e";
    const endpoint = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;

    async function fetchData() {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    fetchData();
  }, [id, type]);
  return (
    <div
      className="modal-box fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.5)] z-50 justify-center items-center duration-[350ms] flex opacity-0"
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
          className="movie-detail absolute bottom-0 flex flex-col gap-3 pb-5 sm:pb-10 px-5 sm:px-10 w-full text-white text-xs sm:text-base"
          style={{
            background:
              "linear-gradient(to bottom, transparent , rgba(0,0,0,.90) 65%)",
          }}
        >
          <h2 className="text-lg sm:text-6xl font-bold stroke-blue-500">
            {movie.title || movie.name}
          </h2>
          <p>Release Date : {movie.release_date || movie.first_air_date}</p>
          <p>
            Score :{" "}
            {Number(movie.vote_average) % 1 !== 0
              ? Number(movie.vote_average).toFixed(1)
              : Number(movie.vote_average)}
          </p>
          <p className="line-clamp-3">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
