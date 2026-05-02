import React, { useEffect, useRef, useState } from "react";

const WORDS = ["Tomorrow", "Kenya", "Africa", "Enterprise", "Scale"];

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Canvas animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let frame = 0, animId: number;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const drawWave = (yBase: number, amp: number, freq: number, speed: number, color: string, alpha: number) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x += 3) {
        const y = yBase
          + Math.sin((x / canvas.width) * Math.PI * freq + frame * speed) * amp
          + Math.sin((x / canvas.width) * Math.PI * freq * 1.7 + frame * speed * 0.7) * amp * 0.35
          + Math.cos((x / canvas.width) * Math.PI * freq * 0.5 + frame * speed * 1.3) * amp * 0.2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, yBase - amp * 2, 0, canvas.height);
      g.addColorStop(0, color.replace("A", String(alpha)));
      g.addColorStop(0.5, color.replace("A", String(alpha * 0.5)));
      g.addColorStop(1, color.replace("A", "0"));
      ctx.fillStyle = g;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const h = canvas.height, w = canvas.width;

      // BG
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#040812");
      bg.addColorStop(0.6, "#060d1c");
      bg.addColorStop(1, "#040812");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = "rgba(249,115,22,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // Glows
      const gC = ctx.createRadialGradient(w*0.5, h*0.55, 0, w*0.5, h*0.55, w*0.5);
      gC.addColorStop(0, "rgba(249,115,22,0.07)"); gC.addColorStop(1, "transparent");
      ctx.fillStyle = gC; ctx.fillRect(0, 0, w, h);

      const gL = ctx.createRadialGradient(w*0.1, h*0.5, 0, w*0.1, h*0.5, w*0.35);
      gL.addColorStop(0, "rgba(251,146,60,0.09)"); gL.addColorStop(1, "transparent");
      ctx.fillStyle = gL; ctx.fillRect(0, 0, w, h);

      const gR = ctx.createRadialGradient(w*0.9, h*0.4, 0, w*0.9, h*0.4, w*0.3);
      gR.addColorStop(0, "rgba(251,146,60,0.07)"); gR.addColorStop(1, "transparent");
      ctx.fillStyle = gR; ctx.fillRect(0, 0, w, h);

      // Waves
      drawWave(h*0.68, h*0.13, 3, 0.004, "rgba(251,146,60,A)", 0.4);
      drawWave(h*0.72, h*0.11, 2.5, 0.006, "rgba(251,146,60,A)", 0.3);
      drawWave(h*0.76, h*0.09, 4, 0.005, "rgba(249,115,22,A)", 0.2);
      drawWave(h*0.80, h*0.10, 2.8, 0.004, "rgba(249,115,22,A)", 0.65);
      drawWave(h*0.84, h*0.08, 3.5, 0.007, "rgba(249,115,22,A)", 0.5);
      drawWave(h*0.89, h*0.07, 2, 0.005, "rgba(6,60,44,A)", 0.75);
      drawWave(h*0.93, h*0.06, 4, 0.003, "rgba(5,40,28,A)", 0.9);

      // Floating particles
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(i * 2.4 + frame * 0.002 * (i % 3 + 1)) * 0.5 + 0.5) * w;
        const y = (Math.cos(i * 1.7 + frame * 0.003 * (i % 2 + 1)) * 0.5 + 0.5) * h * 0.75;
        const r = i % 4 === 0 ? 2 : 1;
        const a = 0.1 + Math.sin(frame * 0.01 + i) * 0.08;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fillStyle = i % 3 === 0 ? `rgba(249,115,22,${a})` : `rgba(251,146,60,${a})`;
        ctx.fill();
      }

      frame += 0.6;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const word = WORDS[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setWordIdx(i => (i + 1) % WORDS.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIdx]);

  // 3D parallax on mouse move
  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * -20;
      el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { num: "300+", label: "Projects Complete" },
    { num: "19+", label: "Happy Clients" },
    { num: "20+", label: "Business Partners" },
    { num: "15+", label: "Years Experience" },
  ];

  return (
    <>
      <style>{`
        .hero-wrap {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 60px;
          gap: 0;
        }

        /* Orbit ring UI */
        .hero-orbit-wrap {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
          perspective: 800px;
        }
        .hero-orbit {
          position: relative;
          width: min(600px, 80vw);
          height: min(600px, 80vw);
          transform-style: preserve-3d;
          transition: transform 0.15s ease;
        }
        .orbit-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(249,115,22,0.12);
          animation: spin-slow 25s linear infinite;
        }
        .orbit-ring:nth-child(2) {
          inset: 10%;
          border-color: rgba(251,146,60,0.1);
          animation-duration: 18s;
          animation-direction: reverse;
        }
        .orbit-ring:nth-child(3) {
          inset: 22%;
          border-color: rgba(249,115,22,0.08);
          animation-duration: 30s;
        }
        .orbit-dot {
          position: absolute;
          width: 8px; height: 8px;
          background: #f97316;
          border-radius: 50%;
          top: -4px; left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 12px rgba(249,115,22,0.8);
        }
        .orbit-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          background: rgba(249,115,22,0.3);
          border-radius: 50%;
          animation: ping 2s ease-out infinite;
        }
        .orbit-dot2 {
          top: auto; bottom: -4px;
          background: #fb923c;
          box-shadow: 0 0 12px rgba(251,146,60,0.8);
        }
        .orbit-dot2::after { background: rgba(251,146,60,0.3); }

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(249,115,22,0.2);
          border-radius: 999px;
          padding: 7px 16px 7px 8px;
          margin-bottom: 40px;
          animation: revealUp 1s 0.2s both;
        }
        .badge-chip {
          background: linear-gradient(135deg, #f97316, #ea6c0a);
          color: #040812;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 0.68rem;
          padding: 4px 10px;
          border-radius: 999px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .badge-text {
          font-size: 0.82rem;
          color: rgba(240,244,255,0.7);
          font-family: 'Cabinet Grotesk', sans-serif;
        }
        .badge-arrow { color: rgba(249,115,22,0.7); font-size: 0.8rem; }

        /* Headline */
        .hero-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800;
          font-size: clamp(2.8rem, 6.5vw, 5.5rem);
          line-height: 1.0;
          letter-spacing: -0.045em;
          color: #fff;
          max-width: 860px;
          margin-bottom: 28px;
          animation: revealUp 1s 0.3s both;
        }
        .hero-title em {
          font-style: normal;
          background: linear-gradient(135deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-title .typeword {
          color: #f97316;
          -webkit-text-fill-color: #f97316;
          background: none;
          -webkit-background-clip: unset;
          background-clip: unset;
        }
        .cursor-blink {
          display: inline-block;
          width: 3px;
          background: #f97316;
          margin-left: 2px;
          animation: blink 0.9s step-end infinite;
          vertical-align: baseline;
          height: 0.8em;
          position: relative;
          top: 0.05em;
        }

        /* Subheading */
        .hero-sub {
          font-size: clamp(0.95rem, 1.7vw, 1.15rem);
          color: rgba(240,244,255,0.55);
          max-width: 540px;
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 44px;
          animation: revealUp 1s 0.4s both;
        }

        /* CTA buttons */
        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 72px;
          animation: revealUp 1s 0.5s both;
        }

        /* Scroll indicator */
        .scroll-hint {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 2;
          animation: revealUp 1s 1s both;
        }
        .scroll-hint span {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,244,255,0.3);
        }
        .scroll-mouse {
          width: 22px; height: 34px;
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 11px;
          position: relative;
          overflow: hidden;
        }
        .scroll-mouse::after {
          content: '';
          position: absolute;
          top: 6px; left: 50%;
          transform: translateX(-50%);
          width: 3px; height: 7px;
          background: #f97316;
          border-radius: 2px;
          animation: scrollDot 1.8s ease-in-out infinite;
        }
        @keyframes scrollDot {
          0%, 100% { opacity: 1; top: 6px; }
          50%       { opacity: 0; top: 18px; }
        }

        /* Stats bar */
        .stats-bar {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(4,8,18,0.7);
          backdrop-filter: blur(20px);
        }
        .stats-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .stat-item {
          padding: 32px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          border-right: 1px solid rgba(255,255,255,0.06);
          animation: revealUp 1s 0.6s both;
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800;
          font-size: 2.2rem;
          letter-spacing: -0.04em;
          color: #fff;
          line-height: 1;
        }
        .stat-num span { color: #f97316; }
        .stat-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: rgba(240,244,255,0.4);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Tech marquee */
        .tech-marquee {
          position: relative; z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.04);
          padding: 20px 0;
          overflow: hidden;
        }
        .marquee-track {
          display: flex;
          gap: 0;
          animation: marquee 22s linear infinite;
          width: max-content;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 36px;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,244,255,0.2);
          white-space: nowrap;
        }
        .marquee-item .dot-sep {
          width: 4px; height: 4px;
          background: rgba(249,115,22,0.4);
          border-radius: 50%;
        }

        @media (max-width: 640px) {
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .hero-orbit-wrap { display: none; }
        }
      `}</style>

      <section className="hero-wrap" id="home">
        <canvas className="hero-canvas" ref={canvasRef} />

        {/* Orbit 3D decoration */}
        <div className="hero-orbit-wrap">
          <div className="hero-orbit" ref={orbitRef}>
            <div className="orbit-ring">
              <div className="orbit-dot" />
              <div className="orbit-dot orbit-dot2" />
            </div>
            <div className="orbit-ring" />
            <div className="orbit-ring" />
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-chip">New</span>
            <span className="badge-text">Launching Advanced Cloud & AI Infrastructure</span>
            <span className="badge-arrow">›</span>
          </div>

          <h1 className="hero-title">
            ICT Solutions<br />
            Built for <em>
              <span className="typeword">{displayed}</span>
              <span className="cursor-blink" />
            </em>
          </h1>

          <p className="hero-sub">
            Kenya's most trusted technology partner: delivering enterprise-grade cloud solutions,
            database infrastructure, and software development with 15+ years of proven excellence.
          </p>

          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})}>
              Explore Our Services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="btn btn-outline" onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>
              Consult Us Free
            </button>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-mouse" />
          <span>Scroll to explore</span>
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          <div className="stats-inner">
            {stats.map((s, i) => (
              <div className="stat-item" key={i} style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                <div className="stat-num">{s.num.replace("+", "")}<span>+</span></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech marquee */}
        <div className="tech-marquee">
          <div className="marquee-track">
            {[...Array(2)].map((_, rep) =>
              ["Oracle Database", "Cloud Infrastructure", "Mifos X", "System Integration",
               "Microsoft 365", "Disaster Recovery", "Network Design", "ICT Consulting",
               "Tape Libraries", "Staff Outsourcing", "Software Licensing", "Hardware Support"
              ].map((item, i) => (
                <div className="marquee-item" key={`${rep}-${i}`}>
                  <span className="dot-sep" />
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;