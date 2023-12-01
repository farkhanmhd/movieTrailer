export default function ToggleButton({ click, openState }) {
  return (
    <button
      className="absolute right-6 top-[18px] w-7 h-6 md:hidden flex flex-col justify-between "
      onClick={click}
    >
      <div
        className={`transition lines w-full rounded-sm h-1 bg-black dark:bg-white origin-left ${
          openState ? "rotate-45" : ""
        }`}
      ></div>
      <div
        className={`transition lines w-full rounded-sm h-1 bg-black dark:bg-white origin-left ${
          openState ? "scale-x-0" : ""
        }`}
      ></div>
      <div
        className={`transition lines w-full rounded-sm h-1 bg-black dark:bg-white origin-left ${
          openState ? "-rotate-45" : ""
        }`}
      ></div>
    </button>
  );
}
