import "./App.css";
import { ThemeProvider } from "./App/Ui/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./App/Pages/Home/Home";
import Footer from "./components/Footer";
import Favorite from "./App/Pages/Favorite/Favorite";
import Card from "./components/Card/Card"; // ✅ Fix this import
import { Routes, Route, Link } from "react-router-dom"; // ✅ Fix this import

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
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
        <Card />
      </main>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
