import React, { useEffect, useRef, useState, useCallback } from "react";

// Image metadata — each frame has a caption tied to Keger's services
const FRAMES = [
  {
    src: new URL("../assets/images/1.webp", import.meta.url).href,
    index: "005", step: "01", tag: "Infrastructure Setup", title: "Enterprise Foundation",
    desc: "Laying the groundwork — high-availability server infrastructure configured for maximum uptime and performance.",
    color: "#f97316",
  },
  {
    src: new URL("../assets/images/2.webp", import.meta.url).href,
    index: "008", step: "02", tag: "Network Architecture", title: "Core Networking Layer",
    desc: "Intelligent network topology designed for redundancy, speed, and seamless inter-department communication.",
    color: "#fb923c",
  },
  {
    src: new URL("../assets/images/3.webp", import.meta.url).href,
    index: "009", step: "03", tag: "Oracle Database", title: "Database Provisioning",
    desc: "Oracle Enterprise deployment — schemas, tablespaces, and user roles configured to your exact specifications.",
    color: "#f97316",
  },
  {
    src: new URL("../assets/images/4.webp", import.meta.url).href,
    index: "010", step: "04", tag: "Data Migration", title: "Seamless Data Transfer",
    desc: "Zero-loss data migration pipelines that move terabytes safely — with rollback guarantees at every stage.",
    color: "#a78bfa",
  },
  {
    src: new URL("../assets/images/5.webp", import.meta.url).href,
    index: "011", step: "05", tag: "System Integration", title: "Application Integration",
    desc: "Connecting your databases, APIs, and business applications into one coherent, high-performing system.",
    color: "#fb923c",
  },
  {
    src: new URL("../assets/images/6.webp", import.meta.url).href,
    index: "039", step: "06", tag: "Mifos X", title: "Financial Platform",
    desc: "Mifos X configured and deployed — complete with custom workflows for loans, savings, and client management.",
    color: "#f472b6",
  },
  {
    src: new URL("../assets/images/7.webp", import.meta.url).href,
    index: "078", step: "07", tag: "Cloud Migration", title: "Cloud Lift & Shift",
    desc: "Migrating on-premise workloads to cloud infrastructure with minimal disruption and maximum cost efficiency.",
    color: "#34d399",
  },
  {
    src: new URL("../assets/images/8.webp", import.meta.url).href,
    index: "131", step: "08", tag: "Backup & Recovery", title: "Disaster Recovery",
    desc: "RMAN-powered backup schedules, offsite replication, and tested recovery procedures for business continuity.",
    color: "#60a5fa",
  },
  {
    src: new URL("../assets/images/9.webp", import.meta.url).href,
    index: "148", step: "09", tag: "Monitoring", title: "Live System Monitoring",
    desc: "Real-time dashboards tracking performance, capacity, and alerts — 24/7 visibility across your entire stack.",
    color: "#fbbf24",
  },
  {
    src: new URL("../assets/images/10.webp", import.meta.url).href,
    index: "161", step: "10", tag: "Security Hardening", title: "Security & Compliance",
    desc: "End-to-end encryption, role-based access control, and compliance audits that protect your critical data.",
    color: "#f43f5e",
  },
  {
    src: new URL("../assets/images/11.webp", import.meta.url).href,
    index: "165", step: "11", tag: "Optimization", title: "Performance Tuning",
    desc: "Query optimization, index strategies, and cache configuration that make your systems blazing fast.",
    color: "#f97316",
  },
  {
    src: new URL("../assets/images/12.webp", import.meta.url).href,
    index: "196", step: "12", tag: "Handover & Training", title: "Team Enablement",
    desc: "Structured knowledge transfer and technical training — your team fully equipped to own the system.",
    color: "#fb923c",
  },
  {
    src: new URL("../assets/images/13.webp", import.meta.url).href,
    index: "232", step: "13", tag: "Production Launch", title: "Go Live",
    desc: "Full production deployment with SLA-backed support, monitoring dashboards, and Keger engineers on standby.",
    color: "#f97316",
  },
];

const ImageShowcase: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartProgress, setDragStartProgress] = useState(0);
  const progressRef = useRef<number>(0);         // ← FIX: initial value 0
  const rafRef = useRef<number>(0);              // ← FIX: initial value 0
  const targetProgressRef = useRef<number>(0);   // ← FIX: initial value 0

  const TOTAL = FRAMES.length;

  const updateProgress = useCallback((raw: number) => {
    targetProgressRef.current = Math.max(0, Math.min(1, raw));
  }, []);

  // Animation loop — lerps current progress toward target
  useEffect(() => {
    const animate = () => {
      const target = targetProgressRef.current;
      const current = progressRef.current;
      const diff = target - current;
      if (Math.abs(diff) > 0.0001) {
        progressRef.current += diff * 0.07;
        const p = progressRef.current;
        setProgress(p);
        setActiveIdx(Math.min(TOTAL - 1, Math.floor(p * TOTAL)));
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(rafRef.current); };
  }, [TOTAL]);

  // Scroll-driven progress
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const onScroll = () => {
      if (isDragging) return;
      const rect = outer.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      updateProgress(-rect.top / scrollable);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDragging, updateProgress]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const sticky = stickyRef.current;
      if (!sticky) return;
      const rect = sticky.getBoundingClientRect();
      if (rect.top > 0 || rect.bottom < 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(TOTAL - 1, activeIdx + 1);
        const p = next / TOTAL;
        updateProgress(p);
        scrollToProgress(p);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(0, activeIdx - 1);
        const p = prev / TOTAL;
        updateProgress(p);
        scrollToProgress(p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, TOTAL, updateProgress]);

  const scrollToProgress = (p: number) => {
    const outer = outerRef.current;
    if (!outer) return;
    const rect = outer.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    window.scrollTo({ top: window.scrollY + rect.top + p * scrollable, behavior: "smooth" });
  };

  const onDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragStartProgress(progressRef.current);
  };
  const onDragMove = (clientX: number) => {
    if (!isDragging) return;
    updateProgress(dragStartProgress + (dragStartX - clientX) * 0.003);
  };
  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    scrollToProgress(progressRef.current);
  };

  const jumpTo = (idx: number) => {
    const p = idx / (TOTAL - 1);
    updateProgress(p);
    scrollToProgress(p);
  };

  const frame = FRAMES[activeIdx];
  const localProgress = progress * TOTAL - activeIdx;

  return (
    <>
      <style>{`
        .showcase-outer { height: 600vh; position: relative; }
        .showcase-sticky {
          position: sticky; top: 0; height: 100vh; width: 100%;
          overflow: hidden; display: flex; flex-direction: column; user-select: none;
        }
        .showcase-header {
          flex-shrink: 0; display: flex; align-items: center;
          justify-content: space-between; padding: 16px 42px 0; z-index: 10; position: relative;
        }
        .showcase-eyebrow {
          font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--green);
          display: flex; align-items: center; gap: 10px; margin-bottom: 6px;
        }
        .showcase-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--green); }
        .showcase-h2 {
          font-family: 'Cabinet Grotesk', sans-serif; font-weight: 800;
          font-size: clamp(1.6rem, 2.8vw, 2.6rem); letter-spacing: -0.04em; color: #fff; line-height: 1.1;
        }
        .showcase-h2 em { font-style: normal; color: var(--green); }
        .showcase-counter { text-align: right; flex-shrink: 0; }
        .showcase-count-big {
          font-family: 'Cabinet Grotesk', sans-serif; font-weight: 800;
          font-size: 3rem; letter-spacing: -0.06em; color: #fff; line-height: 1;
        }
        .showcase-count-big span { color: var(--green); }
        .showcase-count-total {
          font-family: 'Space Mono', monospace; font-size: 0.65rem;
          color: rgba(240,244,255,0.3); letter-spacing: 0.1em;
        }
        .showcase-body {
          flex: 1; display: grid; grid-template-columns: 1fr 1.7fr;
          gap: 0; padding: 12px 42px 0; min-height: 0;
        }
        .showcase-text-panel {
          display: flex; flex-direction: column; justify-content: center;
          padding-right: 48px; position: relative;
        }
        .showcase-step-badge { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .step-num {
          font-family: 'Space Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.15em; color: rgba(240,244,255,0.35);
        }
        .step-tag {
          font-family: 'Space Mono', monospace; font-size: 0.62rem; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 4px;
          border: 1px solid; transition: all 0.4s ease;
        }
        .showcase-frame-title {
          font-family: 'Cabinet Grotesk', sans-serif; font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.8rem); letter-spacing: -0.04em;
          line-height: 1.05; color: #fff; margin-bottom: 12px;
        }
        .showcase-frame-desc {
          font-size: 0.95rem; color: rgba(240,244,255,0.5);
          line-height: 1.75; max-width: 340px; margin-bottom: 20px;
        }
        .showcase-progress-bar-wrap {
          width: 100%; height: 2px; background: rgba(255,255,255,0.06);
          border-radius: 1px; overflow: hidden; margin-bottom: 16px;
        }
        .showcase-progress-fill {
          height: 100%; border-radius: 1px;
          transition: width 0.1s linear, background 0.4s ease;
        }
        .showcase-dots { display: flex; gap: 6px; flex-wrap: wrap; max-width: 300px; }
        .showcase-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: none; cursor: pointer;
          transition: all 0.3s ease; flex-shrink: 0; padding: 0;
        }
        .showcase-dot.active { width: 20px; border-radius: 3px; }
        .showcase-dot:hover { background: rgba(255,255,255,0.4); transform: scale(1.3); }
        .showcase-nav-arrows { display: flex; gap: 10px; margin-top: 16px; }
        .showcase-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.25s ease; color: rgba(240,244,255,0.5); font-size: 0.9rem;
        }
        .showcase-arrow:hover {
          border-color: var(--green); color: var(--green);
          background: rgba(249,115,22,0.06); transform: scale(1.08);
        }
        .showcase-arrow:disabled { opacity: 0.2; pointer-events: none; }
        .showcase-scroll-cue {
          margin-top: 12px; font-family: 'Space Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.15em; text-transform: uppercase; color: rgba(240,244,255,0.2);
          display: flex; align-items: center; gap: 8px;
          animation: breathe 3s ease-in-out infinite;
        }
        @keyframes breathe { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .scroll-cue-arrows { display: flex; gap: 2px; }
        .scroll-cue-arrows span { animation: fadeArrow 1.4s ease-in-out infinite; }
        .scroll-cue-arrows span:nth-child(2) { animation-delay: 0.15s; }
        .scroll-cue-arrows span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes fadeArrow { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        .showcase-image-panel {
          position: relative; display: flex; align-items: center;
          justify-content: center; overflow: hidden;
        }
        .showcase-image-glow {
          position: absolute; inset: -20%; border-radius: 50%;
          opacity: 0.12; filter: blur(80px); transition: background 0.6s ease; pointer-events: none;
        }
        .showcase-image-stage {
          position: relative; width: 100%; max-width: 860px;
          height: 100%; display: flex; align-items: center; justify-content: center;
        }
        .showcase-img-wrap {
          position: relative; width: 100%; border-radius: 16px; overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.5);
          transition: box-shadow 0.4s ease; transform-style: preserve-3d;
          cursor: grab; aspect-ratio: 16/9;
        }
        .showcase-img-wrap:active { cursor: grabbing; }
        .showcase-img-frame {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; border-radius: 16px;
          will-change: opacity, transform; pointer-events: none;
        }
        .showcase-img-overlay {
          position: absolute; inset: 0; border-radius: 16px; pointer-events: none; z-index: 3;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px
          );
        }
        .showcase-corner { position: absolute; width: 20px; height: 20px; z-index: 4; pointer-events: none; }
        .showcase-corner.tl { top:10px; left:10px; border-top:2px solid; border-left:2px solid; border-radius:2px 0 0 0; }
        .showcase-corner.tr { top:10px; right:10px; border-top:2px solid; border-right:2px solid; border-radius:0 2px 0 0; }
        .showcase-corner.bl { bottom:10px; left:10px; border-bottom:2px solid; border-left:2px solid; border-radius:0 0 0 2px; }
        .showcase-corner.br { bottom:10px; right:10px; border-bottom:2px solid; border-right:2px solid; border-radius:0 0 2px 0; }
        .showcase-img-meta {
          position: absolute; bottom:0; left:0; right:0; z-index:5;
          padding: 32px 20px 16px;
          background: linear-gradient(0deg, rgba(4,8,18,0.85) 0%, transparent 100%);
          border-radius: 0 0 16px 16px;
          display: flex; align-items: flex-end; justify-content: space-between; pointer-events: none;
        }
        .showcase-img-tag-inner {
          font-family: 'Space Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 4px;
          transition: background 0.4s ease, color 0.4s ease;
        }
        .showcase-img-frame-id {
          font-family: 'Space Mono', monospace; font-size: 0.6rem;
          color: rgba(240,244,255,0.3); letter-spacing: 0.1em;
        }
        .showcase-footer {
          flex-shrink: 0; padding: 8px 42px 12px;
          display: flex; align-items: center; gap: 16px;
        }
        .showcase-timeline {
          flex: 1; height: 3px; background: rgba(255,255,255,0.06);
          border-radius: 2px; position: relative; cursor: none;
        }
        .showcase-timeline-fill {
          position: absolute; top:0; left:0; height:100%; border-radius:2px;
          transition: width 0.08s linear, background 0.4s ease;
        }
        .showcase-timeline-thumb {
          position: absolute; top:50%; width:12px; height:12px; border-radius:50%;
          border: 2px solid rgba(4,8,18,0.9); transform: translate(-50%,-50%);
          transition: left 0.08s linear, background 0.4s ease;
          box-shadow: 0 0 8px rgba(249,115,22,0.5);
        }
        .showcase-timeline-label-left {
          font-family: 'Space Mono', monospace; font-size: 0.6rem;
          color: rgba(240,244,255,0.3); letter-spacing: 0.08em; white-space: nowrap;
        }
        .drag-hint {
          position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);
          font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.15em;
          color: rgba(240,244,255,0.4); text-transform: uppercase; pointer-events: none;
          opacity: 0; animation: dragHintFade 4s 2s ease-in-out forwards;
          background: rgba(4,8,18,0.8); padding: 8px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1); white-space: nowrap;
        }
        @keyframes dragHintFade {
          0%   { opacity:0; transform:translate(-50%,-50%) scale(0.9); }
          15%  { opacity:1; transform:translate(-50%,-50%) scale(1); }
          75%  { opacity:1; }
          100% { opacity:0; }
        }
        @media (max-width: 900px) {
          .showcase-body { grid-template-columns: 1fr; padding: 16px 20px 0; }
          .showcase-image-panel { min-height: auto; }
          .showcase-text-panel { padding-right: 0; padding-bottom: 16px; }
          .showcase-header { padding: 20px 20px 0; }
          .showcase-footer { padding: 12px 20px 16px; }
          .showcase-frame-title { font-size: 1.6rem; }
        }
      `}</style>

      <div className="showcase-outer" ref={outerRef}>
        <div
          className="showcase-sticky"
          ref={stickyRef}
          onMouseDown={e => onDragStart(e.clientX)}
          onMouseMove={e => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchMove={e => { e.preventDefault(); onDragMove(e.touches[0].clientX); }}
          onTouchEnd={onDragEnd}
        >
          <div className="showcase-header">
            <div>
              <div className="showcase-eyebrow">Our Engineering Process</div>
              <h2 className="showcase-h2">From Setup to <em>Production</em></h2>
            </div>
            <div className="showcase-counter">
              <div className="showcase-count-big">
                {String(activeIdx + 1).padStart(2, "0")}
                <span>/{String(TOTAL).padStart(2, "0")}</span>
              </div>
              <div className="showcase-count-total">STEPS COMPLETE</div>
            </div>
          </div>

          <div className="showcase-body">
            <div className="showcase-text-panel">
              <div className="showcase-step-badge">
                <span className="step-num">STEP {frame.step} —</span>
                <span className="step-tag" style={{ color: frame.color, borderColor: `${frame.color}33`, background: `${frame.color}0f` }}>
                  {frame.tag}
                </span>
              </div>

              <h3
                className="showcase-frame-title"
                key={`title-${activeIdx}`}
                style={{ animation: "revealUp 0.45s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                {frame.title}
              </h3>

              <p
                className="showcase-frame-desc"
                key={`desc-${activeIdx}`}
                style={{ animation: "revealUp 0.5s 0.05s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                {frame.desc}
              </p>

              <div className="showcase-progress-bar-wrap">
                <div className="showcase-progress-fill" style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${frame.color}99, ${frame.color})` }} />
              </div>

              <div className="showcase-dots">
                {FRAMES.map((f, i) => (
                  <button
                    key={i}
                    className={`showcase-dot${i === activeIdx ? " active" : ""}`}
                    onClick={() => jumpTo(i)}
                    title={f.title}
                    style={{ background: i === activeIdx ? frame.color : undefined }}
                  />
                ))}
              </div>

              <div className="showcase-nav-arrows">
                <button className="showcase-arrow" disabled={activeIdx === 0} onClick={() => jumpTo(Math.max(0, activeIdx - 1))}>←</button>
                <button className="showcase-arrow" disabled={activeIdx === TOTAL - 1} onClick={() => jumpTo(Math.min(TOTAL - 1, activeIdx + 1))}>→</button>
              </div>

              <div className="showcase-scroll-cue">
                <div className="scroll-cue-arrows"><span>›</span><span>›</span><span>›</span></div>
                Scroll or drag image to advance
              </div>
            </div>

            <div className="showcase-image-panel">
              <div className="showcase-image-glow" style={{ background: frame.color }} />
              <div className="showcase-image-stage">
                <div className="showcase-img-wrap" style={{ boxShadow: `0 2px 4px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.5), 0 24px 64px rgba(0,0,0,0.6), 0 0 80px ${frame.color}15` }}>
                  {FRAMES.map((f, i) => {
                    const dist = Math.abs(i - activeIdx);
                    const isActive = i === activeIdx;
                    const isPrev = i === activeIdx - 1;
                    const isNext = i === activeIdx + 1;

                    let opacity = 0;
                    let transform = "scale(1.04) translateX(20px)";

                    if (isActive) {
                      opacity = 1;
                      transform = "scale(1) translateX(0)";
                    } else if (isPrev) {
                      opacity = 1 - localProgress;
                      transform = `scale(0.98) translateX(${-localProgress * 30}px)`;
                    } else if (isNext) {
                      opacity = localProgress * 0.6;
                      transform = `scale(${1 + (1 - localProgress) * 0.03}) translateX(${(1 - localProgress) * 20}px)`;
                    }

                    if (dist > 1) return null;

                    return (
                      <img
                        key={f.index}
                        src={f.src}
                        alt={f.title}
                        className="showcase-img-frame"
                        style={{
                          opacity,
                          transform,
                          transition: isActive ? "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)" : "none",
                          zIndex: isActive ? 2 : 1,
                        }}
                        draggable={false}
                      />
                    );
                  })}

                  <div className="showcase-img-overlay" />
                  {["tl","tr","bl","br"].map(c => (
                    <div key={c} className={`showcase-corner ${c}`} style={{ borderColor: `${frame.color}66` }} />
                  ))}
                  <div className="showcase-img-meta">
                    <div className="showcase-img-tag-inner" style={{ background: `${frame.color}18`, color: frame.color }}>{frame.tag}</div>
                    <div className="showcase-img-frame-id">FRAME {frame.index}</div>
                  </div>
                  <div className="drag-hint">← Drag to navigate →</div>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase-footer">
            <span className="showcase-timeline-label-left">Infrastructure</span>
            <div
              className="showcase-timeline"
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const p = (e.clientX - rect.left) / rect.width;
                updateProgress(p);
                scrollToProgress(p);
              }}
            >
              <div className="showcase-timeline-fill" style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, #f97316, ${frame.color})` }} />
              <div className="showcase-timeline-thumb" style={{ left: `${progress * 100}%`, background: frame.color }} />
            </div>
            <span className="showcase-timeline-label-left">Production</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageShowcase;