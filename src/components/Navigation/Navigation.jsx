import { useEffect, useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import NavLinkContainer from "./NavLinkContainer";
import ToggleButton from "./ToggleButton";

const Navigation = ({ isDark, themeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setIsOpen(false);
      }
    });
  });

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <nav
      className={`${
        isOpen ? "h-[130px]" : "h-[60px]"
      } bg-white overflow-hidden flex flex-col justify-start items-start gap-5 md:justify-between md:items-center fixed  md:px-14 lg:px-20 bg-transparent backdrop-blur top-0 left-0 w-full md:h-[60px] pt-2 pb-0 md:py-2 md:flex-row duration-[250ms] tracking-wide dark:bg-black dark:text-white`}
    >
      <Logo />
      <Search />
      <NavLinkContainer isDark={isDark} themeToggle={themeToggle} />
      <ToggleButton click={handleToggle} openState={isOpen} />
    </nav>
  );
};

export default Navigation;
