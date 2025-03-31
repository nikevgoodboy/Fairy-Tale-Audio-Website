import { useContext, useState } from "react";
import LogoImage from "../assets/image.png";
import { ThemeContext } from "../../src/App/Ui/ThemeContext";

const NavItems = [
  { name: "HOME", link: "#" },
  { name: "STORIES", link: "#" },
  { name: "FAVORITE", link: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Navbar can't be used outside a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50">
      <div className="flex items-center justify-between container mx-auto">
        {/* Logo image */}
        <a href="/" className="w-auto">
          <img src={LogoImage} alt="Logo" width="180" />
        </a>

        {/* Mobile menu button */}
        <div className="lg:hidden z-50">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center p-2 text-white focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <div className="relative w-8 h-6">
              <span
                className={`absolute h-1 w-full bg-white rounded-lg transform transition-all duration-300 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
                style={{ top: "0" }}
              />
              <span
                className={`absolute h-1 w-full bg-white rounded-lg transition-all duration-200 ease-in-out ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
                style={{ top: "50%", transform: "translateY(-50%)" }}
              />
              <span
                className={`absolute h-1 w-full bg-white rounded-lg transform transition-all duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
                style={{ bottom: "0" }}
              />
            </div>
          </button>
        </div>

        {/* nav menu - desktop */}
        <nav className="hidden lg:flex items-center justify-center">
          <ul className="flex items-center">
            {NavItems.map((item, index) => (
              <li key={item.name} className="inline-block mx-4">
                <a
                  href={item.link}
                  className="text-lg font-semibold text-white hover:text-[#FF0E4D] transition-colors duration-300"
                >
                  {item.name}
                </a>
                {index < NavItems.length - 1 && (
                  <span className="text-[#FF0E4D] text-3xl pl-8">{"|"}</span>
                )}
              </li>
            ))}

            {/* Theme Toggle Button */}
            <li className="px-6 py-4">
              <div className="flex items-center">
                <div
                  className="relative inline-block w-14 h-7 cursor-pointer overflow-hidden rounded-full"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${
                    theme === "dark" ? "light" : "dark"
                  } mode`}
                  role="switch"
                  aria-checked={theme === "dark"}
                >
                  <div
                    className={`
                    absolute inset-0 transition-colors duration-300
                    ${theme === "dark" ? "bg-blue-800" : "bg-gray-600"}
                  `}
                  />
                  <div
                    className={`
                    absolute top-1/2 -translate-y-1/2 
                    w-6 h-6 bg-white rounded-full 
                    shadow-md transition-all duration-300
                    flex items-center justify-center text-sm
                    ${theme === "dark" ? "translate-x-7" : "translate-x-1"}
                  `}
                  >
                    {theme === "dark" ? "🌙" : "☀️"}
                  </div>
                </div>
              </div>
            </li>

            {/* user icon */}
            <li>
              <button className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-6 h-6 fill-current"
                  aria-hidden="true"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
                <span className="sr-only">User account</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile nav menu - slides in from right */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            {/* User login button in mobile menu */}
            <button className="flex items-center space-x-2 text-white hover:text-[#FF0E4D] transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-5 h-5 fill-current"
                aria-hidden="true"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
              <span>Login</span>
            </button>

            <div className="mb-8 mt-12">
              <ul className="space-y-6">
                {NavItems.map((item) => (
                  <li key={item.name} className="border-b border-gray-700 pb-2">
                    <a
                      href={item.link}
                      className="text-lg font-semibold text-white block hover:text-[#FF0E4D] transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-6">
              {/* Theme toggle in mobile menu */}
              <div className="flex items-center justify-between">
                <span className="text-white">Theme</span>
                <div
                  className="relative inline-block w-14 h-7 cursor-pointer overflow-hidden rounded-full"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${
                    theme === "dark" ? "light" : "dark"
                  } mode`}
                  role="switch"
                  aria-checked={theme === "dark"}
                >
                  <div
                    className={`
                    absolute inset-0 transition-colors duration-300
                    ${theme === "dark" ? "bg-blue-800" : "bg-gray-600"}
                  `}
                  />
                  <div
                    className={`
                    absolute top-1/2 -translate-y-1/2 
                    w-6 h-6 bg-white rounded-full 
                    shadow-md transition-all duration-300
                    flex items-center justify-center text-sm
                    ${theme === "dark" ? "translate-x-7" : "translate-x-1"}
                  `}
                  >
                    {theme === "dark" ? "🌙" : "☀️"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/60 bg-opacity-50 z-30 lg:hidden"
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
}
