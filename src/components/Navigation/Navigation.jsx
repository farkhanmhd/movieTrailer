import { useEffect, useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import NavLinkContainer from "./NavLinkContainer";
import ToggleButton from "./ToggleButton";
import SearchResult from "./SearchResult";

const Navigation = ({ isDark, themeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    window.addEventListener("resize", () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setIsOpen(false);
        navSetting("close");
        setInputValue("");
      }
    });
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setInputValue("");
    setSearchResult([]);
  };

  const navSetting = (action) => {
    const nav = document.getElementById("nav");
    const modalBox = document.querySelector(".modal-box");
    if (action === "open") {
      nav.classList.replace("overflow-hidden", "overflow-visible");
      nav.classList.replace("sm:overflow-hidden", "sm:overflow-visible");
      nav.classList.replace("md:overflow-hidden", "md:overflow-visible");
      modalBox.classList.replace("opacity-0", "opacity-100");
      modalBox.classList.replace("hidden", "flex");
    } else if (action === "close") {
      nav.classList.replace("overflow-visible", "overflow-hidden");
      nav.classList.replace("sm:overflow-visible", "sm:overflow-hidden");
      nav.classList.replace("md:overflow-visible", "md:overflow-hidden");
      modalBox.classList.replace("opacity-100", "opacity-0");
      modalBox.classList.replace("flex", "hidden");
      setSearchResult([]);
    }
  };

  useEffect(() => {
    const searchResult = document.querySelector(".search-result");
    if (inputValue.length > 0 && searchResult.classList.contains("block")) {
      document.addEventListener("click", (event) => {
        if (event.target !== searchResult) {
          searchResult.classList.replace("block", "hidden");
        }
      });
    } else {
      searchResult.classList.replace("hidden", "block");
    }
  }, [inputValue.length]);

  useEffect(() => {
    const searchMedia = async (value) => {
      const apiKey = "13fac615ed3a65fbe773c50d2cc4b10e";

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
            value
          )}`
        );
        const data = await response.json();
        setSearchResult(data.results);
        if (inputValue.length > 0) {
          navSetting("open");
        } else {
          navSetting("close");
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    searchMedia(inputValue);
  }, [inputValue.length, searchResult.length, inputValue]);

  useEffect(() => {}, []);

  const openSearchResult = (searchValue) => {
    setInputValue(searchValue.target.value);
  };

  return (
    <nav
      className={`${
        isOpen ? "h-[130px]" : "h-[60px]"
      }  overflow-hidden sm:overflow-hidden md:overflow-hidden flex flex-col justify-start items-start gap-5 md:justify-between md:items-center fixed md:px-14 lg:px-20 top-0 left-0 w-full md:h-[60px] pt-2 pb-0 md:py-2 md:flex-row duration-[250ms] tracking-wide  bg-[rgba(0,0,0,.75)] text-white z-50 backdrop-blur-md`}
      id="nav"
    >
      <Logo />
      <Search
        onInput={openSearchResult}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <NavLinkContainer isDark={isDark} themeToggle={themeToggle} />
      <ToggleButton click={handleToggle} openState={isOpen} />
      <SearchResult result={searchResult} />
    </nav>
  );
};

export default Navigation;
