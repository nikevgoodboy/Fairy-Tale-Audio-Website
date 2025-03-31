import { useContext } from "react";
import { ThemeContext } from "../../Ui/ThemeContext";

export default function HeroSection() {
  const themeProvider = useContext(ThemeContext);

  if (!themeProvider) return null;
  const { theme } = themeProvider;

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center text-center p-6 ${
        theme === "dark"
          ? "bg-gradient-to-r from-blue-900 to-purple-800"
          : "bg-white"
      }`}
      style={{
        backgroundImage:
          theme === "dark"
            ? "url('/images/dark-theme-bg.jpg')"
            : "url('/images/light-theme-bg.jpg')",
        backgroundSize: "cover",
      }}
    >
      <h1
        className={`text-4xl font-bold ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Welcome to Fairy Tales
      </h1>
      <p
        className={`text-lg mt-2 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Discover enchanting stories for children and parents alike.
      </p>
    </div>
  );
}
