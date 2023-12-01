export default function NavLinks({ location, children }) {
  return (
    <li>
      <a
        href={location}
        target="_blank"
        rel="noreferrer"
        className="block hover:text-orange-400  md:inline md:p-0 "
      >
        {children}
      </a>
    </li>
  );
}
