import "./App.css";
import { ThemeProvider } from "./App/Ui/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./App/Home/Home";
    import Footer from "./components/Footer"

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      {/* Main content */}
      <main>
        <Home />
      </main>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
