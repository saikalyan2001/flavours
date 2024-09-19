// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Shop from './Pages/Shop/Shop';
import Services from './Pages/Services/Services';
import Gallery from './Pages/Gallery/Gallery';
import Promotion from './Pages/Promotion/Promotion';
import Contact from './Pages/Contact/Contact';
import Footer from './Pages/Footer/Footer';
import HeroConditionally from './Components/HeroConditionally';
import ScrollToTop from './Components/ScrollToTop'; // Ensure this import is correct

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <HeroConditionally />
        <About />
        <Shop />
        <Services />
        <Gallery />
        <Promotion />
        <Contact />
        <Footer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ScrollToTop /> {/* Ensure this is included */}
      </div>
    </Router>
  );
}

export default App;
