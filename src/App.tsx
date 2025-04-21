import "./App.css";
import { ThemeProvider } from "./Layout/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoute from "./Routes";

function App() {
  return (
    <ThemeProvider>
      <Navbar />

      {/* Main content */}
      <main>
        <AppRoute />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
