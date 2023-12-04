export default function Card({
  title,
  imageSource,
  subtitle,
  releaseDate,
  voteAverage,
}) {
  return (
    <div className="card w-[250px] h-[400px] sm:w-[300px] sm:h-[500px] rounded-xl overflow-hidden relative shadow-md group cursor-pointer shrink-0">
      <img
        src={imageSource}
        alt="movie-poster"
        className="w-full h-full object-cover group-hover:scale-110 duration-[350ms]"
      />
      <div className="details absolute bottom-0 h-[150px] w-full p-5 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 duration-[250ms]">
        <h4 className="text-2xl font-bold mb-2 line-clamp-1 text-ellipsis text-white">
          {title}
        </h4>
        <p className="text-sm text-white mb-2">
          {releaseDate} | {voteAverage}
        </p>
        <p className="line-clamp-2 text-ellipsis text-sm text-white">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
