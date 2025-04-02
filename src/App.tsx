import "./App.css";
import { ThemeProvider } from "./App/Ui/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./App/Pages/Home/Home";
import Footer from "./components/Footer";
import Button from "./components/button";
import { Link } from "react-router-dom";

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
        <Home />
        <Button />
        {/* Add other components or content here */}
      </main>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
