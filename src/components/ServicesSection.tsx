import React, { useEffect, useRef } from "react";
import ImageShowcase from "./ImageShowcase";
import { FiDatabase, FiCloud, FiCreditCard, FiMonitor, FiSettings, FiUsers } from 'react-icons/fi';

const SERVICES = [
  {
    icon: <FiDatabase />,
    tag: "01 / DATABASE",
    title: "Oracle & MySQL Databases",
    desc: "Enterprise and Standard Oracle editions with full installation, configuration, and 24/7 technical support. Optimized for performance at any scale.",
    points: ["Oracle Enterprise & Standard", "MySQL Configuration", "Performance Tuning", "24/7 Technical Support"],
    color: "#f97316",
  },
  {
    icon: <FiCloud />,
    tag: "02 / CLOUD",
    title: "Cloud Services & Backup",
    desc: "Modern cloud infrastructure with bulletproof backup solutions, disaster recovery planning, and load balancing for business continuity.",
    points: ["Disaster Recovery", "Cloud Migration", "Load Balancing", "Tape & Virtual Tape Libraries"],
    color: "#fb923c",
  },
  {
    icon: <FiCreditCard />,
    tag: "03 / FINTECH",
    title: "Mifos X Integration",
    desc: "Complete financial inclusion platform configured for your specific needs. From MFI to full banking — we deploy, configure, and support.",
    points: ["Mifos X Deployment", "Custom Configuration", "Financial Workflows", "Ongoing Support"],
    color: "#f97316",
  },
  {
    icon: <FiMonitor />,
    tag: "04 / SOFTWARE",
    title: "SaaS & Software Development",
    desc: "Custom software solutions built for Africa's unique business environment. From web portals to enterprise systems that scale.",
    points: ["Custom Web Applications", "Microsoft 365 & Licensing", "System Integration", "API Development"],
    color: "#a78bfa",
  },
  {
    icon: <FiSettings />,
    tag: "05 / INFRASTRUCTURE",
    title: "ICT Consultancy & Strategy",
    desc: "15+ years of experience guiding Kenya's top organizations on infrastructure planning, technology roadmaps, and long-term ICT strategy.",
    points: ["Technology Roadmapping", "Vendor Selection", "Data Center Design", "ICT Project Management"],
    color: "#fb923c",
  },
  {
    icon: <FiUsers />,
    tag: "06 / OUTSOURCING",
    title: "Staff Outsourcing & Training",
    desc: "Instantly deploy skilled ICT professionals for data center, networking, desktop, and application support roles.",
    points: ["System Administrators", "Database Administrators", "Network Engineers", "Technical Training"],
    color: "#f472b6",
  },
];

const ServicesSection: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    cardsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const el = cardsRef.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
    el.style.boxShadow = `${-x * 1.5}px ${y * 1.5}px 40px rgba(249,115,22,0.08)`;
  };

  const handleMouseLeave = (idx: number) => {
    const el = cardsRef.current[idx];
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
  };

  return (
    <>
      <style>{`
        .services-section {
          padding: 120px 0 0;
          position: relative;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 60px;
        }
        .service-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          cursor: default;
          opacity: 0;
          transform: translateY(40px);
        }
        .service-card.visible {
          opacity: 1;
          transform: none;
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.3s,
                      box-shadow 0.3s;
        }
        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(400px circle at 50% 50%, rgba(249,115,22,0.04), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover { border-color: rgba(249,115,22,0.15); }
        .service-card-glow {
          position: absolute;
          top: 0; right: 0;
          width: 120px; height: 120px;
          border-radius: 0 18px 0 100%;
          opacity: 0.06;
          transition: opacity 0.3s;
        }
        .service-card:hover .service-card-glow { opacity: 0.12; }
        .service-icon { 
          font-size: 2rem; 
          margin-bottom: 16px; 
          display: block; 
          color: #fff; 
        }
        .service-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .service-title {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .service-desc {
          font-size: 0.88rem;
          color: rgba(240,244,255,0.5);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .service-points {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .service-points li {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 0.83rem;
          color: rgba(240,244,255,0.6);
        }
        .service-points li .spt-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .service-card-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .service-learn {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(240,244,255,0.4);
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: none;
        }
        .service-card:hover .service-learn { color: #f97316; }
        .service-num {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: rgba(240,244,255,0.15);
        }
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 640px)  { .services-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="services-section" id="services">
        <div className="container">
          <div className="reveal">
            <div className="section-label">Our Services</div>
            <h2 className="heading-lg" style={{ maxWidth: 560 }}>
              Everything Your Business<br />
              <span style={{ color: "var(--green)" }}>Needs to Thrive</span>
            </h2>
            <p style={{ color: "var(--text-muted)", marginTop: 16, maxWidth: 500, fontSize: "1rem", lineHeight: 1.7 }}>
              End-to-end ICT solutions delivered by Kenya's most experienced technical team.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <div
                className="service-card"
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                style={{ transitionDelay: `${i * 0.08}s` }}
                onMouseMove={e => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <div className="service-card-glow" style={{ background: svc.color }} />
                <span className="service-icon">{svc.icon}</span>
                <div className="service-tag" style={{ color: svc.color }}>{svc.tag}</div>
                <div className="service-title">{svc.title}</div>
                <div className="service-desc">{svc.desc}</div>
                <ul className="service-points">
                  {svc.points.map((p, j) => (
                    <li key={j}>
                      <span className="spt-dot" style={{ background: svc.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="service-card-footer">
                  <button className="service-learn">
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <span className="service-num">0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageShowcase />
    </>
  );
};

export default ServicesSection;
