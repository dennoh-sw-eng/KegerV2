import React, { useState, useRef, useEffect } from "react";
import logo from '../assets/images/logo.webp';
import oracle from '../assets/images/oracle.png';
import { FiZap, FiLock, FiGlobe, FiUsers, FiMapPin, FiMail, FiPhone, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

/* ─── ABOUT SECTION ──────────────────────────────────────── */
export const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const pillars = [
    { icon: <FiZap />, title: "Speed", desc: "We deliver in 3 months or less post contract." },
    { icon: <FiLock />, title: "Security", desc: "Enterprise-grade security on every deployment." },
    { icon: <FiGlobe />, title: "Local Expertise", desc: "Built for Kenya, scalable across Africa." },
    { icon: <FiUsers />, title: "Partnership", desc: "Long-term support, not one-time delivery." },
  ];

  return (
    <>
      <style>{`
        .about-section {
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }
        .about-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.3), rgba(251,146,60,0.2), transparent);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .about-visual {
          position: relative;
          perspective: 800px;
        }
        .about-3d-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          transition: transform 0.4s ease;
          animation: float 7s ease-in-out infinite;
        }
        .about-3d-card:hover {
          transform: rotateY(-8deg) rotateX(4deg);
        }
        .about-card-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(249,115,22,0.05), transparent 70%),
                      radial-gradient(circle at 80% 80%, rgba(251,146,60,0.04), transparent 60%);
        }
        .about-card-content { position: relative; z-index: 1; }
        .about-card-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: rgba(240,244,255,0.35);
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .about-years {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800;
          font-size: 5rem;
          line-height: 1;
          letter-spacing: -0.05em;
          color: #fff;
          margin-bottom: 4px;
        }
        .about-years span { color: var(--green); }
        .about-years-label {
          font-size: 1rem;
          color: rgba(240,244,255,0.5);
          margin-bottom: 32px;
        }
        .about-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 24px 0;
        }
        .about-cert-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .about-cert {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(249,115,22,0.07);
          border: 1px solid rgba(249,115,22,0.15);
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 0.78rem;
          color: rgba(240,244,255,0.7);
        }
        .about-cert-dot {
          width: 6px; height: 6px;
          background: var(--green);
          border-radius: 50%;
          animation: ping 2s ease-out infinite;
        }
        .about-float-badge {
          position: absolute;
          background: rgba(4,8,18,0.9);
          border: 1px solid rgba(249,115,22,0.2);
          border-radius: 12px;
          padding: 12px 18px;
          font-family: 'Cabinet Grotesk', sans-serif;
          backdrop-filter: blur(10px);
        }
        .about-float-badge.top-right {
          top: -20px; right: -20px;
          font-size: 0.82rem;
          color: #fff;
          animation: float 5s ease-in-out infinite 0.5s;
        }
        .about-float-badge.bottom-left {
          bottom: -20px; left: -20px;
          font-size: 0.78rem;
          color: rgba(240,244,255,0.7);
          animation: float 6s ease-in-out infinite 1s;
        }
        .about-float-num {
          font-weight: 800;
          font-size: 1.4rem;
          color: var(--cyan);
          display: block;
          line-height: 1;
        }

        .about-text { }
        .about-intro {
          font-size: 1.05rem;
          color: rgba(240,244,255,0.6);
          line-height: 1.8;
          margin-bottom: 32px;
        }
        .about-pillars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 36px;
        }
        .pillar {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px;
          transition: border-color 0.3s, background 0.3s;
        }
        .pillar:hover {
          border-color: rgba(249,115,22,0.2);
          background: rgba(249,115,22,0.03);
        }
        .pillar-icon { 
          font-size: 1.5rem; 
          margin-bottom: 8px; 
          color: var(--green); 
          display: flex; 
          align-items: center; 
        }
        .pillar-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #fff;
          margin-bottom: 4px;
        }
        .pillar-desc {
          font-size: 0.8rem;
          color: rgba(240,244,255,0.45);
          line-height: 1.5;
        }
        .about-oracle-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.2);
          border-radius: 10px;
          padding: 12px 20px;
          font-size: 0.85rem;
          color: rgba(240,244,255,0.7);
        }
        .oracle-dot { width: 8px; height: 8px; background: #f97316; border-radius: 50%; }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
          .about-visual { max-width: 480px; margin: 0 auto; }
          .about-pillars { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) { .about-pillars { grid-template-columns: 1fr; } }
      `}</style>

      <section className="about-section" id="about" ref={ref}>
        <div className="container">
          <div className="about-grid">
            <div className="about-visual reveal-left">
              <div className="about-3d-card">
                <div className="about-card-bg" />
                <div className="about-card-content">
                  <div className="about-card-tag"></div>
                  <div className="about-years">15<span>+</span></div>
                  <div className="about-years-label">Years of ICT Excellence</div>
                  <div className="about-divider" />
                  <div className="about-cert-row">
                    {["Oracle Partner", "Microsoft Partner", "Mifos X Certified", "ISO Compliant"].map(c => (
                      <div className="about-cert" key={c}>
                        <div className="about-cert-dot" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="about-float-badge top-right">
                <span className="about-float-num">99%</span>
                <span style={{fontSize:"0.72rem", color:"rgba(240,244,255,0.5)"}}>Uptime SLA</span>
              </div>
              <div className="about-float-badge bottom-left">
                <span className="about-float-num" style={{color:"var(--green)"}}>300+</span>
                <span style={{fontSize:"0.72rem", color:"rgba(240,244,255,0.5)"}}>Projects Delivered</span>
              </div>
            </div>

            <div className="about-text">
              <div className="reveal">
                <div className="section-label">About Keger</div>
                <h2 className="heading-lg" style={{marginBottom:24}}>
                  Powering Kenya's<br />
                  <span style={{color:"var(--green)"}}>Digital Future</span>
                </h2>
              </div>

              <p className="about-intro reveal">
                Keger Developers Limited is a Nairobi-based ICT consultancy delivering world-class
                technology infrastructure to businesses across Kenya and East Africa. Our mission is
                to deliver quality services by employing highly skilled professionals in identified
                core competence areas.
              </p>

              <div className="about-pillars reveal">
                {pillars.map((p, i) => (
                  <div className="pillar" key={i} style={{transitionDelay:`${i*0.05}s`}}>
                    <div className="pillar-icon">{p.icon}</div>
                    <div className="pillar-title">{p.title}</div>
                    <div className="pillar-desc">{p.desc}</div>
                  </div>
                ))}
              </div>

              <div className="about-oracle-badge reveal">
                <img src={oracle} alt="Oracle" style={{width: '200px', height: 'auto'}} />
                <div className="oracle-dot" />
                Official Oracle Partner- Enterprise & Standard Database Editions
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ─── FAQ SECTION ─────────────────────────────────────────── */
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
    q: "What products do you support for Microsoft?",
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
          padding: 120px 0;
          position: relative;
        }
        .faq-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: start;
        }
        .faq-sticky { position: sticky; top: 100px; }
        .faq-big-num {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800;
          font-size: 8rem;
          line-height: 1;
          letter-spacing: -0.05em;
          color: rgba(255,255,255,0.04);
          margin-bottom: -40px;
        }
        .faq-contact-card {
          background: linear-gradient(135deg, rgba(249,115,22,0.08), rgba(251,146,60,0.04));
          border: 1px solid rgba(249,115,22,0.15);
          border-radius: 16px;
          padding: 28px;
          margin-top: 32px;
        }
        .faq-contact-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 8px;
        }
        .faq-contact-desc {
          font-size: 0.85rem;
          color: rgba(240,244,255,0.5);
          margin-bottom: 16px;
        }
        .faq-items { display: flex; flex-direction: column; gap: 1px; }
        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .faq-q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 0;
          cursor: pointer;
          gap: 20px;
        }
        .faq-q-text {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: rgba(240,244,255,0.85);
          transition: color 0.2s;
          line-height: 1.4;
        }
        .faq-item.open .faq-q-text { color: #fff; }
        .faq-icon {
          width: 28px; height: 28px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s;
          font-size: 0.8rem;
          color: rgba(240,244,255,0.5);
        }
        .faq-item.open .faq-icon {
          background: rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.3);
          color: var(--green);
          transform: rotate(45deg);
        }
        .faq-answer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), padding 0.3s;
          padding-bottom: 0;
        }
        .faq-item.open .faq-answer {
          max-height: 200px;
          padding-bottom: 20px;
        }
        .faq-answer-text {
          font-size: 0.9rem;
          color: rgba(240,244,255,0.55);
          line-height: 1.75;
        }

        @media (max-width: 900px) {
          .faq-layout { grid-template-columns: 1fr; gap: 48px; }
          .faq-sticky { position: static; }
          .faq-big-num { font-size: 5rem; }
        }
      `}</style>

      <section className="faq-section" id="faq">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-sticky reveal-left">
              <div className="faq-big-num">FAQ</div>
              <div className="section-label">Questions</div>
              <h2 className="heading-md" style={{marginBottom:16}}>
                Frequently<br />Asked Questions
              </h2>
              <p style={{color:"var(--text-muted)", fontSize:"0.9rem", lineHeight:1.7, marginBottom:24}}>
                Can't find what you're looking for? Talk to our team.
              </p>
              <div className="faq-contact-card">
                <div className="faq-contact-title">Still have questions?</div>
                <div className="faq-contact-desc">Our engineers are ready to help with any technical query.</div>
                <a href="mailto:info@kegerdevelopers.co.ke" className="btn btn-primary" style={{fontSize:"0.85rem", padding:"10px 20px"}}>
                  Email Our Team
                </a>
              </div>
            </div>

            <div className="faq-items reveal-right">
              {FAQS.map((f, i) => (
                <div
                  className={`faq-item${open === i ? " open" : ""}`}
                  key={i}
                >
                  <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                    <span className="faq-q-text">{f.q}</span>
                    <div className="faq-icon">+</div>
                  </div>
                  <div className="faq-answer">
                    <p className="faq-answer-text">{f.a}</p>
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

/* ─── CLIENTS SECTION ────────────────────────────────────── */
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
          padding: 80px 0;
          position: relative;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
        }
        .clients-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .clients-marquee-wrap {
          position: relative;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%);
        }
        .clients-track {
          display: flex;
          gap: 0;
          animation: marquee 28s linear infinite;
          width: max-content;
        }
        .clients-track:hover { animation-play-state: paused; }
        .client-item {
          flex-shrink: 0;
          padding: 0 40px;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: rgba(240,244,255,0.2);
          letter-spacing: -0.02em;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .client-item::before {
          content: '◆';
          font-size: 0.4rem;
          color: rgba(249,115,22,0.3);
        }
        .client-item:hover { color: rgba(240,244,255,0.7); }
      `}</style>

      <section className="clients-section" id="clients">
        <div className="clients-header reveal">
          <div className="section-label" style={{justifyContent:"center"}}>Our Clients</div>
          <h2 className="heading-md">Trusted by Leading Organizations</h2>
        </div>
        <div className="clients-marquee-wrap">
          <div className="clients-track">
            {[...clients, ...clients].map((c, i) => (
              <div className="client-item" key={i}>{c}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ─── CONTACT / CTA SECTION ──────────────────────────────── */
export const ContactSection: React.FC = () => (
  <>
    <style>{`
      .contact-section {
        padding: 120px 0;
        position: relative;
        overflow: hidden;
      }
      .contact-section::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.06), transparent 70%);
        pointer-events: none;
      }
      .contact-inner {
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 28px;
        padding: 72px 80px;
        position: relative;
        overflow: hidden;
        text-align: center;
      }
      .contact-inner::before {
        content: '';
        position: absolute;
        top: -1px; left: 20%; right: 20%;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--green), var(--cyan), transparent);
      }
      .contact-bg-circles {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }
      .contact-circle {
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(249,115,22,0.07);
        animation: spin-slow 30s linear infinite;
      }
      .contact-tagline {
        font-family: 'Instrument Serif', serif;
        font-style: italic;
        font-size: clamp(1rem, 2vw, 1.3rem);
        color: var(--green);
        margin-bottom: 16px;
        position: relative;
      }
      .contact-title {
        font-family: 'Cabinet Grotesk', sans-serif;
        font-weight: 800;
        font-size: clamp(2.2rem, 5vw, 4rem);
        line-height: 1.05;
        letter-spacing: -0.04em;
        color: #fff;
        margin-bottom: 20px;
        position: relative;
      }
      .contact-sub {
        font-size: 1rem;
        color: rgba(240,244,255,0.5);
        max-width: 480px;
        margin: 0 auto 44px;
        line-height: 1.7;
        position: relative;
      }
      .contact-ctas {
        display: flex;
        gap: 14px;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 48px;
        position: relative;
      }
      .contact-info-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 32px;
        flex-wrap: wrap;
        padding-top: 32px;
        border-top: 1px solid rgba(255,255,255,0.07);
        position: relative;
      }
      .contact-info-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.88rem;
        color: rgba(240,244,255,0.55);
      }
      .contact-info-icon {
        width: 32px; height: 32px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        color: rgba(240,244,255,0.6);
      }
      .contact-info-item a {
        color: rgba(240,244,255,0.55);
        transition: color 0.2s;
      }
      .contact-info-item a:hover { color: var(--green); }

      @media (max-width: 768px) {
        .contact-inner { padding: 48px 24px; }
      }
    `}</style>

    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-inner reveal-scale">
          <div className="contact-bg-circles">
            <div className="contact-circle" style={{width:400,height:400,top:"50%",left:"50%",transform:"translate(-50%,-50%)",animationDuration:"40s"}} />
            <div className="contact-circle" style={{width:600,height:600,top:"50%",left:"50%",transform:"translate(-50%,-50%)",animationDuration:"55s",animationDirection:"reverse"}} />
          </div>

          <div className="contact-tagline">Let's get started</div>
          <h2 className="contact-title">
            Ready to Transform<br />Your ICT Infrastructure?
          </h2>
          <p className="contact-sub">
            From Oracle database setup to cloud architecture and financial systems-
            our team delivers in 90 days or less.
          </p>

          <div className="contact-ctas">
            <a href="mailto:info@kegerdevelopers.co.ke" className="btn btn-primary">
              Email Us Today
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 5 6-5M2 4h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="tel:0202324822" className="btn btn-outline">
              📞 0202 324 822
            </a>
          </div>

          <div className="contact-info-row">
            <div className="contact-info-item">
              <div className="contact-info-icon"><FiMapPin /></div>
              D902 Astrol Apartments, Thika Road, Nairobi
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon"><FiMail /></div>
              <a href="mailto:info@kegerdevelopers.co.ke">info@kegerdevelopers.co.ke</a>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon"><FiPhone /></div>
              <a href="tel:0202324822">020 232 4822</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

/* ─── FOOTER ─────────────────────────────────────────────── */
export const Footer: React.FC = () => (
  <>
    <style>{`
      .footer {
        padding: 60px 0 32px;
        border-top: 1px solid rgba(255,255,255,0.05);
        position: relative;
      }
      .footer-logo-img {
      height: 34px;
      width: 34px;
      object-fit: contain;
      border-radius: 8px;
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
        margin-bottom: 16px;
      }
      .footer-logo-icon {
        width: 34px; height: 34px;
        background: linear-gradient(135deg, #f97316, #ea6c0a);
        border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        font-family: 'Cabinet Grotesk', sans-serif;
        font-weight: 800; font-size: 1rem; color: #040812;
      }
      .footer-logo-name {
        font-family: 'Cabinet Grotesk', sans-serif;
        font-weight: 800; font-size: 1.1rem;
        letter-spacing: -0.03em; color: #fff;
      }
      .footer-logo-name span { color: #f97316; }
      .footer-desc {
        font-size: 0.85rem;
        color: rgba(240,244,255,0.4);
        line-height: 1.7;
        max-width: 280px;
        margin-bottom: 24px;
      }
      .footer-socials {
        display: flex; gap: 10px;
      }
      .footer-social {
        width: 36px; height: 36px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 9px;
        display: flex; align-items: center; justify-content: center;
        color: rgba(240,244,255,0.45);
        transition: all 0.2s;
        cursor: pointer;
      }
      .footer-social:hover {
        background: rgba(249,115,22,0.08);
        border-color: rgba(249,115,22,0.2);
        color: var(--green);
      }
      .footer-col-title {
        font-family: 'Cabinet Grotesk', sans-serif;
        font-weight: 700;
        font-size: 0.9rem;
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
        font-size: 0.85rem;
        color: rgba(240,244,255,0.4);
        transition: color 0.2s;
        cursor: pointer;
      }
      .footer-links a:hover { color: rgba(240,244,255,0.85); }
      .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 24px;
        border-top: 1px solid rgba(255,255,255,0.05);
        flex-wrap: wrap;
        gap: 12px;
      }
      .footer-copy {
        font-family: 'Space Mono', monospace;
        font-size: 0.7rem;
        color: rgba(240,244,255,0.25);
        letter-spacing: 0.06em;
      }
      .footer-tagline {
        font-family: 'Instrument Serif', serif;
        font-style: italic;
        font-size: 0.82rem;
        color: rgba(249,115,22,0.5);
      }

      @media (max-width: 900px) {
        .footer-grid { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 480px) {
        .footer-grid { grid-template-columns: 1fr; }
      }
    `}</style>

    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-row">
            <img src={logo} alt="KegerDev Logo" className="footer-logo-img" />              <span className="footer-logo-name">Keger<span>Dev</span></span>
            </div>
            <p className="footer-desc">
              Delivering quality ICT services through highly skilled professionals.
              Your technology partner for the digital era.
            </p>
            <div className="footer-socials">
              {[
                {icon: <FiFacebook />, label:"Facebook"},
                {icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>, label:"X"},
                {icon: <FiInstagram />, label:"Instagram"},
                {icon: <FiLinkedin />, label:"LinkedIn"},
              ].map(s => (
                <a key={s.label} href="#" className="footer-social" title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Explore</div>
            <ul className="footer-links">
              {["About", "Services", "Portfolio", "Contact", "What We Do"].map(l => (
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
              <li><a href="mailto:info@kegerdevelopers.co.ke">info@kegerdevelopers.co.ke</a></li>
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
