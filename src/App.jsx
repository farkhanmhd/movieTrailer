import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";

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
    console.log(isDark);
  };

  return (
    <div className="app bg-slate-300 dark:bg-zinc-900 min-w-full min-h-full h-screen">
      <Navigation isDark={isDark} themeToggle={handleThemeToggle} />
    </div>
  );
};

export default App;
