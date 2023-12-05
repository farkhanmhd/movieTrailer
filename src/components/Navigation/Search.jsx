export default function Search() {
  return (
    <div className="search w-full px-5 md:px-0 md:w-2/6">
      <input
        type="text"
        name="search-input"
        placeholder="Search movies..."
        id="search-input"
        className="w-full outline-none px-3 py-2 bg-[rgba(235,235,235,.8)] dark:bg-[rgba(50,50,50,.8)]  rounded-lg backdrop-blur-sm"
      />
    </div>
  );
}
