import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { MdAccountCircle, MdSearch } from "react-icons/md";
import { ThemeContext } from "../../ThemeContext";

const Navbar = () => {
  const { themeColor } = useContext(ThemeContext);
  const [isSticky, setIsSticky] = useState(false);

  const navbarStyle = {
    backgroundColor: themeColor,
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      if (window.scrollY >= navbarHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Sticky Navbar */}
      <nav className={`sticky-navbar ${isSticky ? "visible" : "hidden"}`} style={navbarStyle}>
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
    </>
  );
};

export default Navbar;
