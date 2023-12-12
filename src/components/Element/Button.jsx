export default function Button({ onClick, text }) {
  return (
    <button
      className="border-2 text-base border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black duration-[250ms]"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
