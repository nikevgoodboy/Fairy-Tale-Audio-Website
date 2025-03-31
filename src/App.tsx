import "./App.css";
import { ThemeProvider } from "./App/Ui/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./App/Home/Home";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      {/* Main content */}
      <main>
        <Home />
      </main>
    </ThemeProvider>
  );
}

export default App;
