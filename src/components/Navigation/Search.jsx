export default function Search() {
  return (
    <div className="search w-full px-5 md:px-0 md:w-2/6">
      <input
        type="text"
        name="search-input"
        placeholder="Search movies..."
        id="search-input"
        className="w-full outline-none px-3 py-2 bg-slate-200 dark:bg-zinc-900 border-b-2 border-slate-200 dark:border-gray-900 rounded-lg focus:border-b-orange-400  duration-200"
      />
    </div>
  );
}
