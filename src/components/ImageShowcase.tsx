import React, { useState, useEffect, useRef, useCallback } from "react";

const FRAMES = [
  {
    src: new URL("../assets/images/3.webp", import.meta.url).href,
    step: "01", tag: "Oracle Database", title: "Database Provisioning",
    desc: "Oracle Enterprise deployment — schemas, tablespaces, and user roles configured to your exact specifications.",
    color: "#f97316",
  },
  {
    src: new URL("../assets/images/6.webp", import.meta.url).href,
    step: "02", tag: "Mifos X", title: "Financial Platform",
    desc: "Mifos X configured and deployed — complete with custom workflows for loans, savings, and client management.",
    color: "#f472b6",
  },
  {
    src: new URL("../assets/images/7.webp", import.meta.url).href,
    step: "03", tag: "Cloud Migration", title: "Cloud Lift & Shift",
    desc: "Migrating on-premise workloads to cloud infrastructure with minimal disruption and maximum cost efficiency.",
    color: "#34d399",
  },
  {
    src: new URL("../assets/images/10.webp", import.meta.url).href,
    step: "04", tag: "Security Hardening", title: "Security & Compliance",
    desc: "End-to-end encryption, role-based access control, and compliance audits that protect your critical data.",
    color: "#f43f5e",
  },
  {
    src: new URL("../assets/images/9.webp", import.meta.url).href,
    step: "05", tag: "Live Monitoring", title: "24/7 System Monitoring",
    desc: "Real-time dashboards tracking performance, capacity, and alerts — visibility across your entire stack, around the clock.",
    color: "#fbbf24",
  },
];

const AUTOPLAY_MS = 4500;

const ImageShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);

  const goTo = useCallback((idx: number, dir: "left" | "right") => {
    if (isAnimating) return;
    setAnimDir(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsAnimating(false);
    }, 380);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((activeIdx + 1) % FRAMES.length, "right");
  }, [activeIdx, goTo]);

  const prev = useCallback(() => {
    goTo((activeIdx - 1 + FRAMES.length) % FRAMES.length, "left");
  }, [activeIdx, goTo]);

  // Autoplay
  useEffect(() => {
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIdx, next]);

  const frame = FRAMES[activeIdx];

  return (
    <>
      <style>{`
        .showcase-section {
          padding: 80px 0 100px;
          background: var(--bg);
          position: relative;
        }
        .showcase-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.15), transparent);
        }

        .showcase-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .showcase-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f97316;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .showcase-eyebrow::before {
          content: '';
          width: 20px;
          height: 1px;
          background: #f97316;
        }
        .showcase-h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.1;
        }
        .showcase-h2 em { font-style: normal; color: #f97316; }
        .showcase-nav-arrows {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }
        .showcase-arrow {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
          color: rgba(240,244,255,0.5);
          font-size: 1rem;
        }
        .showcase-arrow:hover {
          border-color: #f97316;
          color: #f97316;
          background: rgba(249,115,22,0.06);
          transform: scale(1.08);
        }

        .showcase-body {
          display: grid;
          grid-template-columns: 1fr 1.65fr;
          gap: 56px;
          align-items: center;
        }

        /* Text panel */
        .showcase-text {
          position: relative;
        }
        .showcase-step-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .showcase-step-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          color: rgba(240,244,255,0.3);
        }
        .showcase-step-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid;
          transition: color 0.4s, border-color 0.4s, background 0.4s;
        }
        .showcase-frame-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(1.7rem, 2.8vw, 2.6rem);
          letter-spacing: -0.03em;
          line-height: 1.06;
          color: #fff;
          margin-bottom: 16px;
          transition: opacity 0.38s ease, transform 0.38s ease;
        }
        .showcase-frame-title.out {
          opacity: 0;
          transform: translateY(${animDir === "right" ? "-14px" : "14px"});
        }
        .showcase-frame-desc {
          font-size: 0.94rem;
          color: rgba(240,244,255,0.5);
          line-height: 1.78;
          max-width: 360px;
          margin-bottom: 32px;
          transition: opacity 0.38s ease;
        }
        .showcase-frame-desc.out { opacity: 0; }

        /* Progress dots */
        .showcase-dots {
          display: flex;
          gap: 7px;
          align-items: center;
          margin-bottom: 20px;
        }
        .showcase-dot {
          height: 3px;
          border-radius: 2px;
          border: none;
          cursor: pointer;
          transition: all 0.35s ease;
          background: rgba(255,255,255,0.15);
          padding: 0;
        }
        .showcase-dot.active {
          width: 28px;
        }
        .showcase-dot:not(.active) {
          width: 10px;
        }
        .showcase-dot:hover:not(.active) {
          background: rgba(255,255,255,0.35);
        }

        /* Progress bar */
        .showcase-progress-wrap {
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 1px;
          overflow: hidden;
        }
        .showcase-progress-fill {
          height: 100%;
          border-radius: 1px;
          transition: width 0.1s linear, background 0.4s ease;
          animation: progressBar ${AUTOPLAY_MS}ms linear;
          animation-fill-mode: forwards;
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Image panel */
        .showcase-image-panel {
          position: relative;
          user-select: none;
        }
        .showcase-image-glow {
          position: absolute;
          inset: -15%;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(72px);
          pointer-events: none;
          transition: background 0.6s ease;
        }
        .showcase-img-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 16/9;
          cursor: grab;
          transition: box-shadow 0.4s ease;
        }
        .showcase-img-wrap:active { cursor: grabbing; }
        .showcase-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 14px;
          transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .showcase-img.entering {
          opacity: 1;
          transform: scale(1) translateX(0);
        }
        .showcase-img.exiting {
          opacity: 0;
          transform: scale(0.97) translateX(-20px);
        }
        .showcase-img-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px
          );
          border-radius: 14px;
          pointer-events: none;
        }
        /* Corners */
        .sc-corner {
          position: absolute;
          width: 18px; height: 18px;
          z-index: 4;
          pointer-events: none;
          transition: border-color 0.4s ease;
        }
        .sc-corner.tl { top: 10px; left: 10px; border-top: 2px solid; border-left: 2px solid; border-radius: 2px 0 0 0; }
        .sc-corner.tr { top: 10px; right: 10px; border-top: 2px solid; border-right: 2px solid; border-radius: 0 2px 0 0; }
        .sc-corner.bl { bottom: 10px; left: 10px; border-bottom: 2px solid; border-left: 2px solid; border-radius: 0 0 0 2px; }
        .sc-corner.br { bottom: 10px; right: 10px; border-bottom: 2px solid; border-right: 2px solid; border-radius: 0 0 2px 0; }
        /* Image bottom meta */
        .showcase-img-meta {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 5;
          padding: 28px 18px 14px;
          background: linear-gradient(0deg, rgba(4,8,18,0.82) 0%, transparent 100%);
          border-radius: 0 0 14px 14px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          pointer-events: none;
        }
        .img-meta-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 4px;
          transition: background 0.4s, color 0.4s;
        }
        .img-meta-counter {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          color: rgba(240,244,255,0.3);
          letter-spacing: 0.08em;
        }

        @media (max-width: 900px) {
          .showcase-body { grid-template-columns: 1fr; gap: 32px; }
          .showcase-text { order: 2; }
          .showcase-image-panel { order: 1; }
          .showcase-frame-desc { max-width: 100%; }
        }
      `}</style>

      <section className="showcase-section">
        <div className="container">
          <div className="showcase-header reveal">
            <div>
              <div className="showcase-eyebrow">Our Engineering Process</div>
              <h2 className="showcase-h2">From Setup to <em>Production</em></h2>
            </div>
            <div className="showcase-nav-arrows">
              <button className="showcase-arrow" onClick={prev} aria-label="Previous">←</button>
              <button className="showcase-arrow" onClick={next} aria-label="Next">→</button>
            </div>
          </div>

          <div className="showcase-body reveal">
            {/* Text */}
            <div className="showcase-text">
              <div className="showcase-step-row">
                <span className="showcase-step-num">STEP {frame.step} —</span>
                <span
                  className="showcase-step-tag"
                  style={{ color: frame.color, borderColor: `${frame.color}33`, background: `${frame.color}0f` }}
                >
                  {frame.tag}
                </span>
              </div>

              <div
                className={`showcase-frame-title${isAnimating ? " out" : ""}`}
                key={`t-${activeIdx}`}
              >
                {frame.title}
              </div>

              <div
                className={`showcase-frame-desc${isAnimating ? " out" : ""}`}
                key={`d-${activeIdx}`}
              >
                {frame.desc}
              </div>

              <div className="showcase-dots">
                {FRAMES.map((f, i) => (
                  <button
                    key={i}
                    className={`showcase-dot${i === activeIdx ? " active" : ""}`}
                    onClick={() => goTo(i, i > activeIdx ? "right" : "left")}
                    title={f.title}
                    style={{ background: i === activeIdx ? frame.color : undefined }}
                  />
                ))}
              </div>

              <div className="showcase-progress-wrap">
                <div
                  className="showcase-progress-fill"
                  key={`p-${activeIdx}`}
                  style={{ background: `linear-gradient(90deg, ${frame.color}88, ${frame.color})` }}
                />
              </div>
            </div>

            {/* Image */}
            <div
              className="showcase-image-panel"
              onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={e => {
                const dx = touchStartX.current - e.changedTouches[0].clientX;
                if (dx > 40) next();
                else if (dx < -40) prev();
              }}
            >
              <div className="showcase-image-glow" style={{ background: frame.color }} />
              <div
                className="showcase-img-wrap"
                style={{
                  boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.55), 0 0 80px ${frame.color}14`,
                }}
              >
                {FRAMES.map((f, i) => (
                  <img
                    key={i}
                    src={f.src}
                    alt={f.title}
                    className={`showcase-img ${i === activeIdx ? "entering" : "exiting"}`}
                    style={{ zIndex: i === activeIdx ? 2 : 1 }}
                    draggable={false}
                  />
                ))}
                <div className="showcase-img-overlay" />
                {(["tl","tr","bl","br"] as const).map(c => (
                  <div key={c} className={`sc-corner ${c}`} style={{ borderColor: `${frame.color}55` }} />
                ))}
                <div className="showcase-img-meta">
                  <span className="img-meta-tag" style={{ background: `${frame.color}18`, color: frame.color }}>
                    {frame.tag}
                  </span>
                  <span className="img-meta-counter">{frame.step} / {String(FRAMES.length).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageShowcase;