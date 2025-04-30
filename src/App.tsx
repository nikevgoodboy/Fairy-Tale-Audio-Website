import "./App.css";
import { ThemeProvider } from "./Layout/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoute from "./Routes";
import { Route, Routes } from "react-router-dom";
import Detail from "./Pages/StoryDetail/StoryDetail";
import DefaultLayout from "./Layout/DefaultLayout";
import ScrolledProgressBar from "./components/ProgressBar/ScrolledProgressBar";

function App() {
  return (
    <DefaultLayout>
      <ThemeProvider>
        <Navbar />
        <ScrolledProgressBar />

        {/* Main content */}
        <main>
          <AppRoute />
          <Routes>
            <Route path="/" element={<AppRoute />} />
            <Route path="/story" element={<AppRoute />} />
            <Route path="/story/:documentId" element={<Detail />} />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </DefaultLayout>
  );
}

export default App;
