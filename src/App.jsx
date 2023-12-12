import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import MovieList from "./components/Main/MovieList";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
const App = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const handleThemeToggle = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setIsDark(!isDark);
  };

  return (
    <>
      <div className="app bg-slate-100 dark:bg-zinc-950 min-h-screen ">
        <Navigation isDark={isDark} themeToggle={handleThemeToggle} />
        <Hero />
        <main className="flex flex-col gap-y-5 mt-10">
          <MovieList
            category={"trending"}
            categoryTitle={"Weekly Trend"}
            time={"week"}
          />
          <MovieList
            type={"movie"}
            category={"top_rated"}
            categoryTitle={"Top Rated"}
          />
          <MovieList
            type={"movie"}
            category={"upcoming"}
            categoryTitle={"Upcoming Movies"}
          />
          <MovieList
            type={"discover"}
            category={"tv"}
            categoryTitle={"Discover Series"}
          />
          <MovieList
            type={"tv"}
            category={"airing_today"}
            categoryTitle={"Airing Today"}
          />
          <MovieList
            type={"tv"}
            category={"trending"}
            categoryTitle={"Trending Series"}
          />
          <MovieList
            type={"tv"}
            category={"top_rated"}
            categoryTitle={"Top Rated Series"}
          />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
