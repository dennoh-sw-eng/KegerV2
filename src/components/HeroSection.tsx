import React, { useState, useEffect } from "react";

const WORDS = ["Growth", "Impact", "Enterprise", "Scale"];

const HeroSection: React.FC = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = WORDS[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < word.length) {
        t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        t = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setWordIdx(i => (i + 1) % WORDS.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, wordIdx]);

  const stats = [
    { num: "300+", label: "Projects Delivered" },
    { num: "19+",  label: "Happy Clients" },
    { num: "20+",  label: "Business Partners" },
    { num: "15+",  label: "Years Experience" },
  ];

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Hero image lives ONLY in this section — position:absolute, not fixed */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            linear-gradient(160deg,
              rgba(10,12,16,0.82) 0%,
              rgba(10,12,16,0.62) 45%,
              rgba(10,12,16,0.80) 100%
            ),
            url('/heroimg1.webp') center / cover no-repeat;
          pointer-events: none;
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 240px;
          background: linear-gradient(to bottom, transparent, var(--bg));
          pointer-events: none;
        }

        .hero-body {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          align-items: center;
          padding-top: 130px;
          padding-bottom: 60px;
          text-align: left !important;
        }
        .hero-body .container {
          width: 100%;
          display: block;
          text-align: left !important;
        }
        .hero-text-wrap {
          max-width: 620px;
          width: 100%;
          text-align: left !important;
          margin-left: 0;
          margin-right: auto;
        }
        .hero-text-wrap *:not(.cursor-blink) {
          text-align: left !important;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(249,115,22,0.1);
          border: 1px solid rgba(249,115,22,0.22);
          border-radius: 4px;
          padding: 6px 14px 6px 8px;
          margin-bottom: 32px;
          animation: revealUp 0.8s 0.1s both;
        }
        .hero-badge-chip {
          background: #f97316;
          color: #0a0c10;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          font-size: 0.65rem;
          padding: 3px 8px;
          border-radius: 2px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .hero-badge-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: rgba(232,236,244,0.7);
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(2.8rem, 5.5vw, 4.8rem);
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 24px;
          animation: revealUp 0.8s 0.2s both;
        }
        /* Line 2 sits on its own block row so the changing word
           never shifts the badge, paragraph or buttons */
        .hero-title-line2 {
          display: block;
          white-space: nowrap;
        }
        /* Fixed-width container — wide enough for the longest word */
        .type-slot {
          display: inline-block;
          min-width: 3ch;
          text-align: left;
          vertical-align: bottom;
        }
        .type-word { color: #f97316; }
        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 0.8em;
          background: #f97316;
          margin-left: 2px;
          vertical-align: baseline;
          position: relative;
          top: 0.06em;
          animation: blink 0.9s step-end infinite;
        }

        .hero-sub {
          font-size: 1.05rem;
          color: rgba(232,236,244,0.58);
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 40px;
          animation: revealUp 0.8s 0.3s both;
        }

        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          animation: revealUp 0.8s 0.4s both;
        }

        .hero-scroll {
          position: absolute;
          bottom: 100px; left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: revealUp 1s 0.8s both;
        }
        .scroll-mouse {
          width: 20px; height: 32px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          position: relative;
        }
        .scroll-mouse::after {
          content: '';
          position: absolute;
          top: 5px; left: 50%;
          transform: translateX(-50%);
          width: 2px; height: 6px;
          background: #f97316;
          border-radius: 1px;
          animation: scrollDot 1.8s ease-in-out infinite;
        }
        .scroll-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(232,236,244,0.25);
        }

        .hero-stats {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.07);
          background: rgba(10,12,16,0.75);
          backdrop-filter: blur(16px);
        }
        .hero-stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .hero-stat {
          padding: 28px 0;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
          animation: revealUp 0.8s both;
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-num {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 2rem;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
          letter-spacing: -0.03em;
        }
        .hero-stat-num span { color: #f97316; }
        .hero-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          color: rgba(232,236,244,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        @media (max-width: 640px) {
          .hero-stats-inner { grid-template-columns: repeat(2,1fr); padding: 0 20px; }
          .hero-stat:nth-child(2) { border-right: none; }
          .hero-title { font-size: 2.4rem; }
        }
      `}</style>

      <section className="hero" id="home">
        <div className="hero-bg" />

        <div className="hero-body">
          <div className="container">
            <div className="hero-text-wrap">
              <div className="hero-badge">
                <span className="hero-badge-chip">New</span>
                <span className="hero-badge-text">Cloud &amp; AI Infrastructure — Now Live</span>
              </div>
              <h1 className="hero-title">
                ICT Solutions
                <span className="hero-title-line2">
                  Built for{" "}
                  <span className="type-slot">
                    <span className="type-word">{displayed}</span>
                    <span className="cursor-blink" />
                  </span>
                </span>
              </h1>
              <p className="hero-sub">
                Kenya's most trusted technology partner — delivering enterprise-grade cloud,
                database infrastructure, and software development with 15+ years of proven excellence.
              </p>
              <div className="hero-ctas">
                <button
                  className="btn btn-primary"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Our Services
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2 7.5h11M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-mouse" /> 
        </div>

        <div className="hero-stats">
          <div className="hero-stats-inner">
            {stats.map((s, i) => (
              <div className="hero-stat" key={i} style={{ animationDelay: `${0.5 + i * 0.08}s` }}>
                <div className="hero-stat-num">{s.num.replace("+", "")}<span>+</span></div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;