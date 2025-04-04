import "./App.css";
import { ThemeProvider } from "./App/Ui/ThemeContext"; // Ensure the correct path
import Navbar from "./components/Navbar";
import Home from "./App/Pages/Home/Home"; // Ensure this path is correct
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Favorite from "./App/Pages/Favorite/Favorite";
import Story from "./App/Pages/story-detail/story";
import Login from "./App/Login-Register/Login";
import ForgotPasseord from "./App/Login-Register/ForgetPassword";
// i dont now

function App() {
  return (
    <ThemeProvider>
      <Navbar />

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/story" element={<Story />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasseord />} />
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
