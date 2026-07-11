"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);

    document.documentElement.classList.toggle(
      "dark",
      newDarkMode
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
    >
      {darkMode ? "☀ Light Mode" : "☾ Dark Mode"}
    </button>
  );
}
