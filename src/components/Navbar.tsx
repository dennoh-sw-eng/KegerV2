import React, { useState, useEffect } from "react";
import logo from '../assets/images/logo.webp'; 
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "work", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveLink(id);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 72px;
          transition: all 0.4s ease;
        }
        .navbar.scrolled .navbar-inner {
          background: rgba(4,8,18,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          height: 60px;
        }

        /* Logo */
        .nav-logo {
        display: flex;
        align-items: center;   
        gap: 30px;
        cursor: pointer;
      }
        .logo-icon {
          width: 38px; height: 38px;
          position: relative;
          flex-shrink: 0;
        }
        .logo-text-wrap { display: flex; flex-direction: column; line-height: 1.5; }
        .logo-name {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.04em;
          color: #fff;
        }
          .logo-img {
          height: 38px;   
          width: auto;
          object-fit: contain;
        }
        .logo-name span { color: #f97316; }
        .logo-sub {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(240,244,255,0.4);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Nav links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }
        .nav-links li button {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          color: rgba(240,244,255,0.6);
          padding: 8px 14px;
          border-radius: 8px;
          transition: all 0.2s;
          position: relative;
        }
        .nav-links li button::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 2px;
          background: #f97316;
          border-radius: 1px;
          transition: width 0.3s ease;
        }
        .nav-links li button:hover { color: #fff; background: rgba(255,255,255,0.04); }
        .nav-links li button.active { color: #fff; }
        .nav-links li button.active::after { width: 16px; }

        /* CTA */
        .nav-cta-wrap { display: flex; align-items: center; gap: 12px; }
        .nav-contact {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: rgba(240,244,255,0.5);
          letter-spacing: 0.04em;
        }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #f97316, #ea6c0a);
          color: #040812;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 10px 22px;
          border-radius: 9px;
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(249,115,22,0.2);
        }
        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(249,115,22,0.4);
        }
        .nav-cta .dot {
          width: 6px; height: 6px;
          background: #040812;
          border-radius: 50%;
          animation: ping 1.5s ease-out infinite;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 8px;
        }
        .hamburger span {
          display: block;
          width: 22px; height: 2px;
          background: #fff;
          border-radius: 1px;
          transition: all 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(4,8,18,0.97);
          backdrop-filter: blur(30px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transform: translateY(-100%);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-menu.open { transform: translateY(0); }
        .mobile-menu button {
          background: none; border: none; cursor: pointer;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800;
          font-size: 2.5rem;
          color: rgba(255,255,255,0.6);
          letter-spacing: -0.04em;
          padding: 8px 24px;
          transition: color 0.2s;
        }
        .mobile-menu button:hover { color: #f97316; }

        @media (max-width: 900px) {
          .nav-links, .nav-contact { display: none; }
          .hamburger { display: flex; }
          .navbar-inner { padding: 0 20px; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">
          <div className="nav-logo" onClick={() => scrollTo("home")}>
            <div className="logo-icon">
              <img src={logo} alt="KegerDev Logo" className="logo-img" />
            </div>
            <div className="logo-text-wrap">
              <span className="logo-name">Keger<span>Devs</span></span>
              <span className="logo-sub">LIMITED</span>
            </div>
          </div>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.id}>
                <button
                  className={activeLink === l.id ? "active" : ""}
                  onClick={() => scrollTo(l.id)}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-cta-wrap">
            <span className="nav-contact">0202324822</span>
            <button className="nav-cta" onClick={() => scrollTo("contact")}>
              <span className="dot" />
              Get Started
            </button>
          </div>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(l => (
          <button key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</button>
        ))}
      </div>
    </>
  );
};

export default Navbar;
