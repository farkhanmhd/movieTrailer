import { useState, useEffect } from "react";
import formattedDate from "../../assets/formattedDate";
import Modal from "../Main/Modal";

export default function SearchResult({ result }) {
  const [selectMovieID, setSelectedMovieID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState(null);

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

  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (event.target !== document.querySelector(".search-result")) {
        closeModal();
      }
    });
  });

  return (
    <>
      <div className="search-result hidden fixed z-50 top-[150px] md:top-[70px] left-1/2 -translate-x-1/2 search-result  backdrop-blur-md bg-[rgba(0,0,0,0.7)] w-[95%] px-5 md:w-3/6 lg:w-2/6 rounded-lg p-4 ">
        <ul className="search-list flex flex-col gap-y-1 overflow-auto rounded-lg origin-top h-min max-h-[400px] w-full duration-[250ms] ">
          {result.map((movie) => {
            if (
              (movie.media_type === "tv" || movie.media_type === "movie") &&
              movie.poster_path !== null &&
              movie.backdrop_path !== null
            ) {
              return (
                <li
                  key={movie.id}
                  className="flex flex-row gap-x-5 items-center hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_10px_0_rgba(255,255,255,0.3)] duration-[250ms] cursor-pointer rounded-lg p-5 m-2"
                  onClick={() => {
                    openModal(movie.id);
                    setMediaType(movie.media_type);
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      movie.poster_path
                        ? movie.poster_path
                        : movie.backdrop_path
                    }`}
                    alt="movie-poster"
                    className="w-24 h-36 object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-2 justify-between h-full">
                    <h4 className="text-lg font-bold">
                      {movie.title || movie.name}
                    </h4>
                    <p className="text-sm">
                      {formattedDate(
                        movie.release_date || movie.first_air_date
                      )}
                    </p>
                    <p className="text-sm line-clamp-3 text-ellipsis">
                      {movie.overview}
                    </p>
                  </div>
                </li>
              );
            }
          })}
        </ul>
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
