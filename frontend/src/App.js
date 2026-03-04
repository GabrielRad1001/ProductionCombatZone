import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Rules from "./pages/Rules";
import Pricing from "./pages/Pricing";
import Reservations from "./pages/Reservations";
import Gallery from "./pages/Gallery";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/despre-noi" element={<About />} />
            <Route path="/regulament" element={<Rules />} />
            <Route path="/tarife" element={<Pricing />} />
            <Route path="/rezervari" element={<Reservations />} />
            <Route path="/colectie-foto" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
