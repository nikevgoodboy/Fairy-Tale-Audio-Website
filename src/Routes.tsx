import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Favorite from "./Pages/Favorite/Favorite";
import StoryGrid from "./Pages/StoryGrid/StoryGrid";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Detail from "./Pages/StoryDetail/StoryDetail";

const AppRoute = () => {
  return (
    // Fixed return statement (was missing parentheses and had extra curly braces)
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/story" element={<StoryGrid />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/story/:documentId" element={<Detail />} />
    </Routes>
  );
};

export default AppRoute;
