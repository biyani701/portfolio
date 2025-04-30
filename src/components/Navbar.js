import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import './Navbar.css'; // Optional: for extra styling

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "summary", label: "Summary" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "recognition", label: "Awards" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="#home">Vishal Biyani</a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map(({ id, label }) => (
              <li className="nav-item" key={id}>
                <ScrollLink
                  to={id}
                  smooth={true}
                  duration={400}
                  offset={-70}
                  className="nav-link"
                  onClick={handleClose}
                >
                  {label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
