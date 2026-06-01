import React, { useState, useEffect } from "react";
import logo from '../assets/images/logo.webp';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home",     label: "Home" },
    { id: "about",    label: "About" },
    { id: "services", label: "Services" },
    { id: "work",     label: "Portfolio" },
    { id: "contact",  label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .navbar.scrolled {
          background: rgba(10,12,16,0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 2px 24px rgba(0,0,0,0.4);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        /* ─ Logo ─ */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .nav-logo img {
          height: 36px;
          width: auto;
        }
        .nav-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .nav-logo-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .nav-logo-name span { color: #f97316; }
        .nav-logo-sub {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(232,236,244,0.35);
        }

        /* ─ Links ─ */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
        }
        .nav-links li button {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.88rem;
          color: rgba(232,236,244,0.6);
          padding: 8px 14px;
          border-radius: 5px;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }
        .nav-links li button:hover {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }
        .nav-links li button.active {
          color: #f97316;
        }

        /* ─ Right side ─ */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
          .nav-phone {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            font-family: 'DM Sans', sans-serif;
            font-weight: 500;
            font-size: 0.82rem;
            color: rgba(232,236,244,0.55);
            letter-spacing: 0.03em;
            text-decoration: none;
            transition: color 0.2s;
          }
          .nav-phone:hover { color: #f97316; }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f97316;
          color: #0a0c10;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 9px 20px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.01em;
        }
        .nav-cta:hover {
          background: #fb923c;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(249,115,22,0.3);
        }

        /* ─ Hamburger ─ */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: rgba(232,236,244,0.8);
          border-radius: 1px;
          transition: all 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }

        /* ─ Mobile menu ─ */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(10,12,16,0.98);
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transform: translateY(-100%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-menu.open { transform: translateY(0); }
        .mobile-menu button {
          background: none; border: none; cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 2.2rem;
          color: rgba(232,236,244,0.6);
          letter-spacing: -0.03em;
          padding: 10px 32px;
          transition: color 0.2s;
        }
        .mobile-menu button:hover { color: #f97316; }

        /* Top info bar */
        .nav-topbar {
          background: rgba(10,12,16,0.6);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(8px);
          transition: opacity 0.3s;
        }
        .navbar.scrolled .nav-topbar { display: none; }
        .nav-topbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-topbar-left {
          display: flex;
          align-items: center;
          gap: 24px;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: rgba(232,236,244,0.4);
          letter-spacing: 0.05em;
        }
        .nav-topbar-left span {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .nav-topbar-dot {
          width: 5px; height: 5px;
          background: #f97316;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .nav-topbar-right {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: rgba(232,236,244,0.35);
          letter-spacing: 0.05em;
        }

        @media (max-width: 900px) {
          .nav-links, .nav-phone { display: none; }
          .hamburger { display: flex; }
          .navbar-inner { padding: 0 20px; }
          .nav-topbar { display: none; }
        }
      `}</style>


      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">
          <div className="nav-logo" onClick={() => scrollTo("home")}>
            <img src={logo} alt="Keger Developers" />
            <div className="nav-logo-text">
              <span className="nav-logo-name">Keger<span>Devs</span></span>
              <span className="nav-logo-sub">Limited</span>
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

          <div className="nav-right">
            <a href="tel:0202324822" className="nav-phone">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.59 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.81a16 16 0 006.29 6.29l1.17-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              020 232 4822
            </a>
            <button className="nav-cta" onClick={() => scrollTo("contact")}>
              Get a Quote
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

      {/* ── Floating buttons ── */}
<style>{`
  .float-cluster {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 998;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .float-btn {
    width: 48px; height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.3s ease;
    text-decoration: none;
    flex-shrink: 0;
  }
  .float-btn:hover { transform: translateY(-3px); }

  /* WhatsApp */
  .float-wa {
    background: #25d366;
    box-shadow: 0 4px 20px rgba(37,211,102,0.35);
  }
  .float-wa:hover {
    box-shadow: 0 8px 28px rgba(37,211,102,0.5);
  }

  /* Scroll to top */
  .float-top {
    background: rgba(249,115,22,0.9);
    box-shadow: 0 4px 20px rgba(249,115,22,0.3);
    opacity: 0;
    pointer-events: none;
    transform: translateY(10px);
    transition: transform 0.3s ease, box-shadow 0.25s ease, opacity 0.3s ease;
  }
  .float-top.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
  .float-top:hover {
    box-shadow: 0 8px 28px rgba(249,115,22,0.5);
    transform: translateY(-3px) !important;
  }

  @media (max-width: 640px) {
    .float-cluster { bottom: 20px; right: 16px; }
    .float-btn { width: 44px; height: 44px; }
  }
`}</style>

<div className="float-cluster">
  {/* Scroll to top */}
  <button
    className={`float-btn float-top${scrolled ? " visible" : ""}`}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Scroll to top"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  </button>

  {/* WhatsApp */}
  <a
    href="https://wa.me/254202324822"
    target="_blank"
    rel="noopener noreferrer"
    className="float-btn float-wa"
    aria-label="Chat on WhatsApp"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
</div>      

    </>
  );
};

export default Navbar;