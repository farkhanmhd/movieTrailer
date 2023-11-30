const Navigation = () => {
  return (
    <nav className="flex justify-between items-center fixed top-0 left-0 w-full">
      <div className="logo">MovieLogo</div>
      <div className="links w-1/6">
        <ul className="flex justify-between items-center w-full">
          <li>
            <a href="#">Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
          <li>
            <a href="#">Link 3</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
