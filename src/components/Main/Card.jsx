import "../../assets/responsive.css";

export default function Card({
  title,
  imageSource,
  subtitle,
  releaseDate,
  voteAverage,
  id,
  onClick,
}) {
  return (
    <>
      <div
        className="card aspect-[10/16] max-w-[150px] sm:max-w-[215px] md:max-w-[220px] lg:max-w-[285px] rounded-xl overflow-hidden relative shadow-md group cursor-pointer shrink-0"
        id={id}
        onClick={onClick}
      >
        <img
          src={imageSource}
          alt="movie-poster"
          className="w-full h-full object-cover group-hover:scale-110 duration-[350ms]"
        />
        <div
          className="details absolute bottom-0 h-[150px] w-full p-5  opacity-0 group-hover:opacity-100 duration-[250ms]"
          style={{
            background:
              "linear-gradient(to bottom, transparent , rgba(0,0,0,.85) 65%)",
          }}
        >
          <h4 className="text-base sm:text-2xl font-bold mb-1 line-clamp-1 text-ellipsis text-white">
            {title}
          </h4>
          <p className="text-sm text-white mb-1">
            {releaseDate} | {voteAverage}
          </p>
          <p className="line-clamp-2 text-ellipsis text-sm text-white">
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
