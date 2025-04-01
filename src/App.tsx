import "./App.css";
import { ThemeProvider } from "./App/Ui/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./App/Pages/Home/Home";
import Footer from "./components/Footer";
// import Favorite from "./App/Pages/Favorite/Favorite";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      {/* Main content */}
      <main>
        <Home />
        {/* <Favorite /> */}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
