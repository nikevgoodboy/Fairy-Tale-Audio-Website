import "./App.css";
import { ThemeProvider } from "./App/Ui/ThemeContext"; // Ensure the correct path
import Navbar from "./components/Navbar";
import Home from "./App/Pages/Home/Home"; // Ensure this path is correct
import Footer from "./components/Footer";
import Story from "./App/Pages/story-detail/story"; // Ensure this path is correct
import Favorite from "./App/Pages/Favorite/Favorite"; // Ensure this path is correct
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <Navbar />

      {/* Navigation Links */}

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/story" element={<Story />} />
          {/* Add other routes here */}
          {/* Example: <Route path="/about" element={<About />} /> */}
          {/* Example: <Route path="/contact" element={<Contact />} /> */}
          {/* Add other routes here */}
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
