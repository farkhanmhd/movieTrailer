import { useEffect, useState } from "react";
import Card from "./Card";
import Modal from "./Modal";

export default function MovieList({
  type = "all",
  category,
  categoryTitle,
  time = "day",
}) {
  const [movies, setMovies] = useState([]);
  const [selectMovieID, setSelectedMovieID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState(null);

  useEffect(() => {
    const apiKey = "13fac615ed3a65fbe773c50d2cc4b10e";
    let endpoint;
    if (category === "trending") {
      endpoint = `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${apiKey}`;
    } else {
      endpoint = `https://api.themoviedb.org/3/${type}/${category}?api_key=${apiKey}`;
    }

    async function fetchData() {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    fetchData();
  }, [category, time, type]);

  const openModal = (id) => {
    setSelectedMovieID(id);
    setIsModalOpen(true);
    setTimeout(() => {
      const modalBox = document.querySelector(`#modal-${id}`);
      const modalContent = document.querySelector(`#detail-${id}`);
      modalBox.classList.replace("opacity-0", "opacity-100");
      modalContent.classList.replace("opacity-0", "opacity-100");
    }, 0);
  };
  const closeModal = () => {
    const modalBox = document.querySelector(`#modal-${selectMovieID}`);
    const modalContent = document.querySelector(`#detail-${selectMovieID}`);
    document.addEventListener("click", (event) => {
      if (event.target === modalBox) {
        modalBox.classList.replace("opacity-100", "opacity-0");
        modalContent.classList.replace("opacity-100", "opacity-0");
        setTimeout(() => {
          setSelectedMovieID(null);
          setIsModalOpen(false);
        }, 350);
      }
    });
  };

  return (
    <>
      <div
        className={`w-full h-[470px] sm:h-[600px] mb-5 last-of-type:mb-0 ${
          isModalOpen ? "first-of-type:mb-5 mb-0" : ""
        }`}
      >
        <h2 className="text-black dark:text-white font-bold text-3xl mb-5">
          {categoryTitle}
        </h2>
        <div className="flex gap-10 overflow-auto pb-10 pr-10 rounded-lg">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title || movie.name}
              imageSource={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              subtitle={movie.overview}
              releaseDate={(
                movie.release_date || movie.first_air_date
              ).substring(0, 4)}
              voteAverage={movie.vote_average.toFixed(1)}
              id={movie.id}
              onClick={() => {
                openModal(movie.id);
                setMediaType(
                  movie.media_type
                    ? movie.media_type
                    : type === "discover"
                    ? "tv"
                    : type
                );
              }}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          id={selectMovieID}
          closeModal={closeModal}
          type={mediaType}
        ></Modal>
      )}
    </>
  );
}
