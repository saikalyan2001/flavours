import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Hero.css"; // Import CSS for styling
import { ThemeContext } from "../../ThemeContext";
import { MdAccountCircle, MdSearch, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"; // Add arrow icons

const heroData = [
  {
    title: "Taste From The Good Old Days.",
    description: "Trend Spotted by Europe Locals - Colorful Macarons!",
    imageUrl: "/hero/banner-image-1.png",
    bgColor: "#FF5722", // Dark orange
  },
  {
    title: "Taste From The Good Old Days.",
    description: "Trend Spotted by Europe Locals - Colorful Macarons!",
    imageUrl: "/hero/banner-image-2.png",
    bgColor: "#2196F3", // Dark blue
  },
  {
    title: "Taste From The Good Old Days.",
    description: "Trend Spotted by Europe Locals - Colorful Macarons!",
    imageUrl: "/hero/banner-image-3.png",
    bgColor: "#E91E63", // Dark pink
  },
];

function Hero() {
  const { changeThemeColor } = useContext(ThemeContext); // Access changeThemeColor from context
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slide, setSlide] = useState("slide-in"); // For sliding effect
  const [animationKey, setAnimationKey] = useState(0); // Key to force animation restart

  useEffect(() => {
    const currentBgColor = heroData[currentIndex].bgColor;
    changeThemeColor(currentBgColor); // Update theme color based on hero section

    // Update the CSS variable for the navbar
    document.documentElement.style.setProperty('--navbar-bg-color', currentBgColor);

    const interval = setInterval(() => {
      setSlide("slide-out"); // Start slide-out effect

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
        setSlide("slide-in"); // Start slide-in effect after changing content
        setAnimationKey((prevKey) => prevKey + 1); // Increment key to restart animation
      }, 1000); // Duration of the slide-out effect
    }, 6000); // Total time for each image (including delay)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentIndex, changeThemeColor]);

  const goToNextSlide = () => {
    setSlide("slide-out");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
      setSlide("slide-in");
      setAnimationKey((prevKey) => prevKey + 1);
    }, 300); // Adjust timing for smooth transition
  };

  const goToPrevSlide = () => {
    setSlide("slide-out");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? heroData.length - 1 : prevIndex - 1
      );
      setSlide("slide-in");
      setAnimationKey((prevKey) => prevKey + 1);
    }, 300); // Adjust timing for smooth transition
  };


    const contentRefs = useRef([]);
  
    useEffect(() => {
      const handleScroll = () => {
        contentRefs.current.forEach((ref) => {
          if (ref && ref.getBoundingClientRect().top < window.innerHeight) {
            ref.classList.add('slide-in-bottom-banner');
          }
        });
      };
  
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Trigger on initial render
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  

  return (
    <>
      {/* Initial Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img
            src="/images/logo.png"
            alt="flavors-ocean Logo"
            className="logo-image"
          />
        </div>

        <ul className="nav-links">
          <li>
            <NavLink end to="/" className="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="active-link">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className="active-link">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="active-link">
              Contact
            </NavLink>
          </li>
          {/* ... other links ... */}
          <li className="icon-link">
            <NavLink className="active-link">
              <MdSearch className="icon" />
            </NavLink>
          </li>
          <li className="icon-link">
            <NavLink to="/account" className="active-link">
              <MdAccountCircle className="icon" />
            </NavLink>
          </li>
        </ul>
      </nav>

      <section
        className="hero"
        style={{ background: heroData[currentIndex].bgColor }}
      >
        {/* Left Arrow */}
        <button className="carousel-arrow prev" onClick={goToPrevSlide}>
          <MdArrowBackIos />
        </button>

        <div className={`hero-content ${slide}`} key={animationKey}>
          <h1 className="hero-title">{heroData[currentIndex].title}</h1>
          <p className="hero-description">{heroData[currentIndex].description}</p>
          <a href="/shop" className="btn-primary">
              <span>Explore Now</span>
          </a>
        </div>
        
        <div className={`hero-image ${slide}`}>
          <img
            src={heroData[currentIndex].imageUrl}
            alt="Ice Cream"
            className={`hero-img ${slide}`} />
        </div>

        {/* Right Arrow */}
        <button className="carousel-arrow next" onClick={goToNextSlide}>
          <MdArrowForwardIos />
        </button>
      </section>

      <div className="bottom-banner">
      <div className="content" ref={(el) => contentRefs.current[0] = el}>
        <span className="number">01</span>
        <div className="text">
          <h2>Bakery</h2>
          <p>Excepteur sint occaecat cupidatat non sunt culpa qui officia deserunt mollit anim est laborum.</p>
        </div>
      </div>

      <div className="content" ref={(el) => contentRefs.current[1] = el}>
        <span className="number">02</span>
        <div className="text">
          <h2>Pastry Cake</h2>
          <p>Excepteur sint occaecat cupidatat non sunt culpa qui officia deserunt mollit anim est laborum.</p>
        </div>
      </div>

      <div className="content" ref={(el) => contentRefs.current[2] = el}>
        <span className="number">03</span>
        <div className="text">
          <h2>Confectionery</h2>
          <p>Excepteur sint occaecat cupidatat non sunt culpa qui officia deserunt mollit anim est laborum.</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Hero;
