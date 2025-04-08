import "./App.css";
import { ThemeProvider } from "./Layout/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Favorite from "./Pages/Favorite/Favorite";
import Story from "./Pages/story-detail /story";
import Login from "./Auth/Login";
import ForgotPasseord from "./Auth/ForgetPassword";
import Register from "./Auth/Register";
import StoryDetail from "./Pages/StoryDetail/StoryDetail";
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
          <Route path="/register" element={<Register />} />
          <Route path="/storydetail" element={<StoryDetail />} />
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
