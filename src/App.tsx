import "./App.css";
import { ThemeProvider } from "./Layout/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoute from "./Routes";
import DefaultLayout from "./Layout/DefaultLayout";

function App() {
  return (
    <DefaultLayout>
      <ThemeProvider>
        <Navbar />

        {/* Main content */}
        <main>
          <AppRoute />
        </main>
        <Footer />
      </ThemeProvider>
    </DefaultLayout>
  );
}

export default App;
