import "./App.css";
import { ThemeProvider } from "./App/Ui/ThemeContext"; // Ensure the correct path
import Navbar from "./components/Navbar";
import Home from "./App/Pages/Home/Home"; // Ensure this path is correct
import Footer from "./components/Footer";
import { Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <Navbar />

      {/* Navigation Links */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorite">Favorite</Link>
      </nav>

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here */}
        </Routes>
      </main>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
