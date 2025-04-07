import "./App.css";
import { ThemeProvider } from "./App/Ui/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./App/Pages/Home/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Favorite from "./App/Pages/Favorite/Favorite";
import Story from "./App/Pages/story-detail /story";
import Login from "./App/Login-Register/Login";
import ForgotPasseord from "./App/Login-Register/ForgetPassword";
import Register from "./App/Login-Register/Register";
import StoryDetail from "./App/Pages/StoryDetail/StoryDetail"
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
