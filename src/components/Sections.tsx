import React, { useState, useRef, useEffect } from "react";
import heroImg2 from "../assets/images/heroimg2.webp";


export const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const pillars = [
    { title: "Speed",           desc: "Delivered in 3 months or less post contract." },
    { title: "Security",        desc: "Enterprise-grade security on every deployment." },
    { title: "Local Expertise", desc: "Built for Kenya, scalable across East Africa." },
    { title: "Partnership",     desc: "Long-term support, not one-time delivery." },
  ];

  return (
    <>
      <style>{`
        .about-section {
          padding: 100px 0;
          position: relative;
          background: var(--bg2);
        }
        .about-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.25), transparent);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 72px;
          align-items: center;
        }

        /* Image side */
        .about-img-wrap {
          position: relative;
        }
        .about-img-inner {
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 4/3;
        }
        .about-img-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
          display: block;
        }
        .about-img-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, transparent 50%, rgba(10,12,16,0.5) 100%);
          pointer-events: none;
        }
        .about-corner {
          position: absolute;
          width: 20px; height: 20px;
          pointer-events: none;
          z-index: 2;
        }
        .about-corner.tl { top: -5px; left: -5px; border-top: 2px solid #f97316; border-left: 2px solid #f97316; border-radius: 2px 0 0 0; }
        .about-corner.tr { top: -5px; right: -5px; border-top: 2px solid #f97316; border-right: 2px solid #f97316; border-radius: 0 2px 0 0; }
        .about-corner.bl { bottom: -5px; left: -5px; border-bottom: 2px solid #f97316; border-left: 2px solid #f97316; border-radius: 0 0 0 2px; }
        .about-corner.br { bottom: -5px; right: -5px; border-bottom: 2px solid #f97316; border-right: 2px solid #f97316; border-radius: 0 0 2px 0; }

        /* Text side */
        .about-intro {
          font-size: 1rem;
          color: rgba(232,236,244,0.6);
          line-height: 1.8;
          margin-bottom: 36px;
        }
        .about-pillars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 32px;
        }
        .pillar {
          padding: 18px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          transition: border-color 0.25s;
        }
        .pillar:hover { border-color: var(--border-accent); }
        .pillar-dot {
          width: 6px; height: 6px;
          background: #f97316;
          border-radius: 50%;
          margin-bottom: 10px;
        }
        .pillar-title {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: #fff;
          margin-bottom: 5px;
        }
        .pillar-desc {
          font-size: 0.8rem;
          color: rgba(232,236,244,0.45);
          line-height: 1.5;
        }
        .oracle-partner-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(249,115,22,0.2);
          background: rgba(249,115,22,0.06);
          border-radius: 6px;
          padding: 10px 18px;
          font-size: 0.85rem;
          color: rgba(232,236,244,0.75);
        }
        .oracle-dot { width: 7px; height: 7px; background: #f97316; border-radius: 50%; flex-shrink: 0; }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 480px) {
          .about-pillars { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="about-section" id="about" ref={ref}>
        <div className="container">
          <div className="about-grid">

            {/* Image */}
            <div className="about-img-wrap reveal-left">
              <div className="about-img-inner">
                <img src={heroImg2} alt="Keger Developers Team" />
              </div>
              <div className="about-corner tl" />
              <div className="about-corner tr" />
              <div className="about-corner bl" />
              <div className="about-corner br" />
            </div>

            {/* Text */}
            <div>
              <div className="reveal">
                <div className="section-label">About Keger</div>
                <h2 className="heading-lg" style={{ color: '#fff', marginBottom: 24 }}>
                  Powering Kenya's<br />
                  <span style={{ color: 'var(--orange)' }}>Digital Future</span>
                </h2>
              </div>

              <p className="about-intro reveal">
                Keger Developers Limited is a Nairobi-based ICT consultancy delivering world-class
                technology infrastructure to businesses across Kenya and East Africa. We deploy
                highly skilled professionals across our core competence areas- with over 15 years
                of proven excellence across Oracle, cloud, fintech, and enterprise systems.
              </p>

              <div className="about-pillars reveal">
                {pillars.map((p, i) => (
                  <div className="pillar" key={i}>
                    <div className="pillar-dot" />
                    <div className="pillar-title">{p.title}</div>
                    <div className="pillar-desc">{p.desc}</div>
                  </div>
                ))}
              </div>

              <div className="oracle-partner-badge reveal">
                <span className="oracle-dot" />
                Official Oracle Partner — Enterprise &amp; Standard Database Editions
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};



export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    { icon: "⬡", title: "Oracle & MySQL Databases",   sub: "Enterprise installation, tuning & 24/7 support" },
    { icon: "☁", title: "Cloud Services & Backup",     sub: "Disaster recovery, load balancing, tape libraries" },
    { icon: "◈", title: "Mifos X Integration",         sub: "Full financial platform deployment & configuration" },
    { icon: "⌘", title: "ICT Consultancy & Strategy",  sub: "Infrastructure planning, data center design" },
    { icon: "◻", title: "Staff Outsourcing",           sub: "System admins, DBAs, network engineers on demand" },
    { icon: "⊞", title: "Software Development",        sub: "Custom web apps, APIs, Microsoft 365 & licensing" },
  ];

  return (
    <>
      <style>{`
        .capabilities-section {
          padding: 80px 0;
          background: var(--bg2);
          position: relative;
        }
        .capabilities-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent);
        }
        .cap-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 44px;
          flex-wrap: wrap;
        }
        .cap-header p {
          font-size: 0.9rem;
          color: rgba(232,236,244,0.45);
          max-width: 320px;
          line-height: 1.6;
        }
        .cap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
        }
        .cap-item {
          background: var(--bg3);
          padding: 28px 26px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: background 0.2s;
        }
        .cap-item:hover { background: rgba(249,115,22,0.04); }
        .cap-icon-box {
          width: 38px; height: 38px;
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: #f97316;
          flex-shrink: 0;
        }
        .cap-title {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.92rem;
          color: rgba(232,236,244,0.9);
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .cap-sub {
          font-size: 0.8rem;
          color: rgba(232,236,244,0.38);
          line-height: 1.5;
        }
        @media (max-width: 900px) { .cap-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 540px) { .cap-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="capabilities-section">
        <div className="container">
          <div className="cap-header">
            <div className="reveal">
              <div className="section-label">Core Capabilities</div>
              <h2 className="heading-md" style={{ color: '#fff' }}>What We Do</h2>
            </div>
          </div>
          <div className="cap-grid reveal">
            {capabilities.map((c, i) => (
              <div className="cap-item" key={i}>
                <div className="cap-icon-box">{c.icon}</div>
                <div className="cap-text">
                  <div className="cap-title">{c.title}</div>
                  <div className="cap-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};



export const ParallaxBanner: React.FC = () => (
  <>
    <style>{`
      .parallax-section {
        position: relative;
        width: 100%;
        min-height: 420px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .parallax-bg-layer {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(135deg,
            rgba(10,12,16,0.84) 0%,
            rgba(10,12,16,0.68) 50%,
            rgba(10,12,16,0.84) 100%
          ),
          url('/heroimg.webp') center / cover no-repeat;
        background-attachment: fixed;
        z-index: 0;
      }
      .parallax-fade-top,
      .parallax-fade-bottom {
        position: absolute;
        left: 0; right: 0;
        height: 100px;
        z-index: 2;
        pointer-events: none;
      }
      .parallax-fade-top {
        top: 0;
        background: linear-gradient(to bottom, var(--bg), transparent);
      }
      .parallax-fade-bottom {
        bottom: 0;
        background: linear-gradient(to top, var(--bg), transparent);
      }
      .parallax-content {
        position: relative;
        z-index: 3;
        text-align: center;
        padding: 80px 24px;
        max-width: 700px;
        width: 100%;
      }
      .parallax-eyebrow {
        font-family: 'DM Mono', monospace;
        font-size: 0.68rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #f97316;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 20px;
      }
      .parallax-eyebrow::before,
      .parallax-eyebrow::after {
        content: '';
        width: 32px;
        height: 1px;
        background: rgba(249,115,22,0.45);
      }
      .parallax-h {
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: clamp(2rem, 4vw, 3.2rem);
        line-height: 1.1;
        letter-spacing: -0.03em;
        color: #fff;
        margin-bottom: 18px;
      }
      .parallax-h em { font-style: normal; color: #f97316; }
      .parallax-sub {
        font-size: 1rem;
        color: rgba(232,236,244,0.55);
        line-height: 1.7;
        margin-bottom: 32px;
      }
        @media (max-width: 768px) {
  .parallax-bg-layer {
    background-attachment: scroll;
    background-position: center center;
  }
  .faq-section {
    background-attachment: scroll;
    background-position: center center;
  }
}
    `}</style>

    <div className="parallax-section">
      <div className="parallax-bg-layer" />
      <div className="parallax-fade-top" />
      <div className="parallax-fade-bottom" />

      <div className="parallax-content reveal">
        <div className="parallax-eyebrow">15+ Years of Excellence</div>
        <h2 className="parallax-h">
          Technology That Works<br />
          <em>While You Sleep</em>
        </h2>
        <p className="parallax-sub">
          From data centers in Nairobi to cloud deployments across East Africa —
          Keger keeps your systems running, secure, and scalable.
        </p>
        <a
          href="#contact"
          className="btn btn-primary"
          onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
        >
          Start a Conversation
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </>
);



const FAQS = [
  {
    q: "What ICT staff support do you offer on-premise?",
    a: "We provide on-site ICT user support personnel, database administration for Oracle and MySQL, desktop and networking support, and application support — fully replacing or augmenting your data center team.",
  },
  {
    q: "How fast do you deliver projects?",
    a: "We take pride in our delivery timelines. With our team of experts, we complete projects within three months of contract signing — consistently, without compromise on quality.",
  },
  {
    q: "What goes into designing a data center?",
    a: "Our data center design considers security and access control, physical requirements (raised floors), centralized networking, air conditioning, equipment sizing, and future expansion capacity.",
  },
  {
    q: "Do you offer financial management solutions?",
    a: "Yes. We deploy and configure Mifos X — a complete financial inclusion platform — tailored to your MFI or banking workflows, with ongoing technical support.",
  },
  {
    q: "What Microsoft products do you support?",
    a: "We provide sales and support for Microsoft products and licenses, including Microsoft 365, Windows Server, and enterprise licensing agreements.",
  },
  {
    q: "Can you design and deploy a website for us?",
    a: "Absolutely. Our software development team handles everything from design to deployment — custom web applications, company portals, e-commerce platforms, and API integrations.",
  },
];

export const FAQSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .faq-section {
          padding: 100px 0;
          position: relative;          
          background:
            linear-gradient(
              135deg,
              rgba(10,12,16,0.65) 0%,
              rgba(10,12,16,0.60) 50%,
              rgba(10,12,16,0.65) 100%
            ),
            url('/heroimg.webp') center / cover no-repeat;
          background-attachment: fixed;
        }

        /* Soft top & bottom fades so the section bleeds cleanly into its neighbours */
        .faq-section::before,
        .faq-section::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 100px;
          pointer-events: none;
          z-index: 0;
        }
        .faq-section::before {
          top: 0;
          background: linear-gradient(to bottom, var(--bg), transparent);
        }
        .faq-section::after {
          bottom: 0;
          background: linear-gradient(to top, var(--bg), transparent);
        }

        /* Content must sit above the fade overlays */
        .faq-section .container {
          position: relative;
          z-index: 1;
        }

        .faq-layout {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 80px;
          align-items: start;
        }
        .faq-left { position: sticky; top: 100px; }
        .faq-big {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 7rem;
          line-height: 1;
          color: rgba(170, 169, 164, 0.35);
          letter-spacing: -0.05em;
          margin-bottom: -32px;
        }
        .faq-desc {
          font-size: 0.9rem;
          color: rgba(232,236,244,0.5);
          line-height: 1.7;
          margin: 12px 0 28px;
        }
        .faq-cta-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 24px;
          backdrop-filter: blur(12px);
        }
        .faq-cta-card h4 {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          color: #fff;
          margin-bottom: 8px;
        }
        .faq-cta-card p {
          font-size: 0.82rem;
          color: rgba(232,236,244,0.45);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        /* Accordion items */
        .faq-items { display: flex; flex-direction: column; }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .faq-item:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
        .faq-q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          cursor: pointer;
          gap: 20px;
        }
        .faq-q-text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.97rem;
          color: rgba(232,236,244,0.8);
          transition: color 0.2s;
          line-height: 1.45;
        }
        .faq-item.open .faq-q-text { color: #fff; }
        .faq-toggle {
          width: 26px; height: 26px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: rgba(232,236,244,0.4);
          font-size: 0.9rem;
          transition: all 0.3s;
        }
        .faq-item.open .faq-toggle {
          background: rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.3);
          color: #f97316;
          transform: rotate(45deg);
        }
        .faq-answer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), padding 0.3s;
        }
        .faq-item.open .faq-answer { max-height: 180px; padding-bottom: 20px; }
        .faq-answer p {
          font-size: 0.88rem;
          color: rgba(232,236,244,0.55);
          line-height: 1.75;
        }

        @media (max-width: 900px) {
          .faq-layout { grid-template-columns: 1fr; gap: 40px; }
          .faq-left { position: static; }
          .faq-big { font-size: 4.5rem; }
        }
      `}</style>

      <section className="faq-section" id="faq">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-left reveal-left">
              <div className="faq-big">FAQ</div>
              <div className="section-label">Questions</div>
              <h2 className="heading-md" style={{ color: '#fff', marginBottom: 12 }}>
                Frequently<br />Asked
              </h2>
              <p className="faq-desc">
                Can't find what you're looking for? Our engineers are ready to help.
              </p>
              <div className="faq-cta-card">
                <h4>Still have questions?</h4>
                <p>Our team is ready to answer any technical or commercial query.</p>
                <a href="mailto:contact@oslabs-ke.com" className="btn btn-primary" style={{ fontSize: '0.83rem', padding: '9px 18px' }}>
                  Email Our Team
                </a>
              </div>
            </div>

            <div className="faq-items reveal-right">
              {FAQS.map((f, i) => (
                <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
                  <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                    <span className="faq-q-text">{f.q}</span>
                    <div className="faq-toggle">+</div>
                  </div>
                  <div className="faq-answer">
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



export const ClientsSection: React.FC = () => {
  const clients = [
    "Safaricom", "KCB Bank", "Equity Bank", "Jumia", "M-PESA",
    "Andela", "Co-op Bank", "NCBA", "Stanbic", "DTB Kenya",
    "Absa Kenya", "Family Bank",
  ];

  return (
    <>
      <style>{`
        .clients-section {
          padding: 72px 0;
          background: var(--bg3);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .clients-head {
          text-align: center;
          margin-bottom: 44px;
        }
        .clients-head p {
          font-size: 0.9rem;
          color: rgba(232,236,244,0.45);
          margin-top: 8px;
        }
        .clients-track-wrap {
          position: relative;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
        }
        .clients-track {
          display: flex;
          gap: 0;
          animation: marquee 26s linear infinite;
          width: max-content;
        }
        .client-pill {
          flex-shrink: 0;
          padding: 0 36px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: rgba(232,236,244,0.2);
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: color 0.2s;
          cursor: default;
          white-space: nowrap;
        }
        .client-pill:hover { color: rgba(232,236,244,0.7); }
        .client-sep {
          width: 4px; height: 4px;
          background: rgba(249,115,22,0.3);
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>

      <section className="clients-section">
        <div className="clients-head reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>Trusted By</div>
          <h2 className="heading-md" style={{ color: '#fff' }}>Trusted by Leading Organizations</h2>
          <p>Kenya's top companies rely on Keger for mission-critical infrastructure</p>
        </div>
        <div className="clients-track-wrap">
          <div className="clients-track">
            {[...clients, ...clients].map((c, i) => (
              <div className="client-pill" key={i}>
                <span className="client-sep" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};



export const ContactSection: React.FC = () => (
  <>
    <style>{`
      .contact-section {
        padding: 100px 0;
        background: var(--bg);
        position: relative;
      }
      .contact-section::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent);
      }
      .contact-box {
        background: var(--bg3);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 72px 80px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      .contact-box::before {
        content: '';
        position: absolute;
        top: -1px; left: 25%; right: 25%;
        height: 1px;
        background: linear-gradient(90deg, transparent, #f97316, transparent);
      }
      .contact-eyebrow {
        font-family: 'DM Mono', monospace;
        font-size: 0.7rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #f97316;
        margin-bottom: 16px;
      }
      .contact-title {
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: clamp(2rem, 4vw, 3.4rem);
        line-height: 1.08;
        letter-spacing: -0.03em;
        color: #fff;
        margin-bottom: 18px;
      }
      .contact-sub {
        font-size: 1rem;
        color: rgba(232,236,244,0.5);
        max-width: 460px;
        margin: 0 auto 40px;
        line-height: 1.7;
      }
      .contact-ctas {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 48px;
      }
      .contact-info-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 32px;
        flex-wrap: wrap;
        padding-top: 32px;
        border-top: 1px solid rgba(255,255,255,0.07);
      }
      .contact-info-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.85rem;
        color: rgba(232,236,244,0.5);
      }
      .contact-info-icon {
        width: 30px; height: 30px;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: rgba(232,236,244,0.4);
      }
      .contact-info-item a {
        color: rgba(232,236,244,0.5);
        transition: color 0.2s;
      }
      .contact-info-item a:hover { color: #f97316; }

      @media (max-width: 768px) {
        .contact-box { padding: 48px 24px; }
        .contact-info-row { gap: 20px; }
      }
    `}</style>

    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-box reveal-scale">
          <div className="contact-eyebrow">Let's Get Started</div>
          <h2 className="contact-title">
            Ready to Transform<br />Your ICT Infrastructure?
          </h2>
          <p className="contact-sub">
            From Oracle database setup to cloud architecture and financial systems —
            our team delivers in 90 days or less.
          </p>
          <div className="contact-ctas">
            <a href="mailto:contact@oslabs-ke.com" className="btn btn-primary">
              Email Us Today
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1.5 3.5l6 5 6-5M1.5 3.5h12v8a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="tel:0202324822" className="btn btn-outline">
              020 232 4822
            </a>
          </div>
          <div className="contact-info-row">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              D902 Astrol Apartments, Thika Road, Nairobi
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <a href="mailto:contact@oslabs-ke.com">contact@oslabs-ke.com</a>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.59 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.81a16 16 0 006.29 6.29l1.17-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <a href="tel:0202324822">020 232 4822</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);



export const Footer: React.FC = () => (
  <>
    <style>{`
      .footer {
        padding: 56px 0 28px;
        background: var(--bg3);
        border-top: 1px solid var(--border);
      }
      .footer-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 48px;
        margin-bottom: 48px;
      }
      .footer-brand {}
      .footer-logo-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
      }
      .footer-logo-icon {
        width: 32px; height: 32px;
        background: #f97316;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 0.95rem;
        color: #0a0c10;
        flex-shrink: 0;
      }
      .footer-logo-name {
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 1rem;
        color: #fff;
        letter-spacing: -0.02em;
      }
      .footer-logo-name span { color: #f97316; }
      .footer-desc {
        font-size: 0.83rem;
        color: rgba(232,236,244,0.38);
        line-height: 1.7;
        max-width: 260px;
        margin-bottom: 20px;
      }
      .footer-socials {
        display: flex;
        gap: 8px;
      }
      .footer-social {
        width: 32px; height: 32px;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Syne', sans-serif;
        font-size: 0.72rem;
        font-weight: 700;
        color: rgba(232,236,244,0.35);
        transition: all 0.2s;
        cursor: pointer;
        text-decoration: none;
      }
      .footer-social:hover {
        background: rgba(249,115,22,0.08);
        border-color: rgba(249,115,22,0.2);
        color: #f97316;
      }
      .footer-col-title {
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        font-size: 0.88rem;
        color: #fff;
        margin-bottom: 16px;
      }
      .footer-links {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .footer-links a {
        font-size: 0.83rem;
        color: rgba(232,236,244,0.38);
        transition: color 0.2s;
      }
      .footer-links a:hover { color: rgba(232,236,244,0.8); }
      .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 24px;
        border-top: 1px solid rgba(255,255,255,0.05);
        flex-wrap: wrap;
        gap: 10px;
      }
      .footer-copy {
        font-family: 'DM Mono', monospace;
        font-size: 0.68rem;
        color: rgba(232,236,244,0.22);
        letter-spacing: 0.06em;
      }
      .footer-tagline {
        font-family: 'DM Mono', monospace;
        font-size: 0.68rem;
        color: rgba(249,115,22,0.4);
        letter-spacing: 0.04em;
      }

      @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } }
    `}</style>

    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <div className="footer-logo-icon">K</div>
              <span className="footer-logo-name">Keger<span>Dev</span></span>
            </div>
            <p className="footer-desc">
              Delivering quality ICT services through highly skilled professionals.
              Your technology partner for the digital era.
            </p>
<div className="footer-socials">
  {/* X (Twitter) */}
  <a href="#" className="footer-social" aria-label="X">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </a>
  {/* Facebook */}
  <a href="#" className="footer-social" aria-label="Facebook">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>
  {/* Instagram */}
  <a href="#" className="footer-social" aria-label="Instagram">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  </a>
  {/* LinkedIn */}
  <a href="#" className="footer-social" aria-label="LinkedIn">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  </a>
</div>
          </div>
          <div>
            <div className="footer-col-title">Explore</div>
            <ul className="footer-links">
              {["About Us", "Our Services", "Portfolio", "Contact", "What We Do"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              {["ICT Consultancy", "Cloud & Backup", "Database Solutions", "Mifos Integration", "Staff Outsourcing"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li><a href="tel:0202324822">020 232 4822</a></li>
              <li><a href="mailto:contact@oslabs-ke.com">contact@oslabs-ke.com</a></li>
              <li><a href="#">D902 Astrol Apartments</a></li>
              <li><a href="#">Thika Road, Nairobi</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 KEGER DEVELOPERS LIMITED · ALL RIGHTS RESERVED</span>
          <span className="footer-tagline">ICT Solutions for Tomorrow</span>
        </div>
      </div>
    </footer>
  </>
);