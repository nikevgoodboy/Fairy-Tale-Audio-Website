import {
  useContext,
  useState,
  useRef,
  useEffect,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import LogoImage from "../assets/image.png";
import { ThemeContext } from "../../src/App/Ui/ThemeContext";

interface NavItem {
  name: string;
  link: string;
}

const NavItems: NavItem[] = [
  { name: "HOME", link: "/" },
  { name: "STORIES", link: "/story" },
  { name: "FAVORITE", link: "/favorite" },
];

// Mock search suggestions data - in a real app, this would come from an API
const mockSuggestions: string[] = [
  "bed time stories",
  "funny stories",
  "adventure stories",
  "mystery stories",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Navbar can't be used outside a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // Handle search input changes
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter suggestions based on query
    if (query.trim()) {
      const filtered = mockSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: string): void => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // You would typically trigger a search here
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent | globalThis.MouseEvent
    ): void => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
    };
  }, []);

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
          <ul className="flex items-center justify-center">
            {NavItems.map((item, index) => (
              <li
                key={`nav-item-${index}`}
                className="group relative flex items-center"
              >
                <a
                  href={item.link}
                  className="text-lg font-semibold text-white hover:text-[#FF0E4D] transition-colors duration-300 mx-4"
                  aria-current={
                    item.link === window.location.pathname ? "page" : undefined
                  }
                >
                  {item.name}
                </a>
                {index < NavItems.length - 1 && (
                  <span className="text-[#FF0E4D] text-3xl">{"|"}</span>
                )}
              </li>
            ))}

            {/* search input with suggestions */}
            <div className="relative w-full max-w-md" ref={searchRef}>
              <div className="relative">
                <input
                  type="search"
                  className="w-full bg-transparent border-2 border-[#FF0E4D] text-sm text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF0E4D] focus:border-[#FF0E4D]"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  role="combobox"
                  aria-expanded={showSuggestions}
                  aria-autocomplete="list"
                  aria-controls="search-suggestions"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 text-[#FF0E4D] fill-current"
                    aria-hidden="true"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </div>
              </div>

              {/* Search suggestions dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul
                  id="search-suggestions"
                  className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
                  role="listbox"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleSelectSuggestion(suggestion)}
                      role="option"
                      tabIndex={0}
                      onKeyDown={(e: KeyboardEvent<HTMLLIElement>) =>
                        e.key === "Enter" && handleSelectSuggestion(suggestion)
                      }
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        {suggestion}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

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

            {/* Mobile search input */}
            <div className="relative mt-8" ref={searchRef}>
              <input
                type="search"
                className="w-full bg-transparent border-2 border-gray-800 text-sm text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 text-gray-800 fill-current"
                  aria-hidden="true"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>

              {/* Mobile search suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        {suggestion}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

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
