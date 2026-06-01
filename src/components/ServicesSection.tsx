import React, { useEffect, useRef } from "react";
import ImageShowcase from "./ImageShowcase";
import { FiDatabase, FiCloud, FiCreditCard, FiMonitor, FiSettings, FiUsers } from 'react-icons/fi';

const SERVICES = [
  {
    icon: <FiDatabase />,
    number: "01",
    tag: "Database",
    title: "Oracle & MySQL Databases",
    desc: "Enterprise and Standard Oracle editions with full installation, configuration, and 24/7 technical support. Optimised for performance at any scale.",
    points: ["Oracle Enterprise & Standard", "MySQL Configuration", "Performance Tuning", "24/7 Technical Support"],
    color: "#f97316",
  },
  {
    icon: <FiCloud />,
    number: "02",
    tag: "Cloud",
    title: "Cloud Services & Backup",
    desc: "Modern cloud infrastructure with bulletproof backup solutions, disaster recovery planning, and load balancing for business continuity.",
    points: ["Disaster Recovery", "Cloud Migration", "Load Balancing", "Tape & Virtual Tape Libraries"],
    color: "#fb923c",
  },
  {
    icon: <FiCreditCard />,
    number: "03",
    tag: "Fintech",
    title: "Mifos X Integration",
    desc: "Complete financial inclusion platform configured for your specific needs. From MFI to full banking — we deploy, configure, and support.",
    points: ["Mifos X Deployment", "Custom Configuration", "Financial Workflows", "Ongoing Support"],
    color: "#f97316",
  },
  {
    icon: <FiMonitor />,
    number: "04",
    tag: "Software",
    title: "SaaS & Software Development",
    desc: "Custom software solutions built for Africa's unique business environment. From web portals to enterprise systems that scale.",
    points: ["Custom Web Applications", "Microsoft 365 & Licensing", "System Integration", "API Development"],
    color: "#fb923c",
  },
  {
    icon: <FiSettings />,
    number: "05",
    tag: "Infrastructure",
    title: "ICT Consultancy & Strategy",
    desc: "15+ years guiding Kenya's top organisations on infrastructure planning, technology roadmaps, and long-term ICT strategy.",
    points: ["Technology Roadmapping", "Vendor Selection", "Data Center Design", "ICT Project Management"],
    color: "#f97316",
  },
  {
    icon: <FiUsers />,
    number: "06",
    tag: "Outsourcing",
    title: "Staff Outsourcing & Training",
    desc: "Deploy skilled ICT professionals instantly for data center, networking, desktop, and application support roles.",
    points: ["System Administrators", "Database Administrators", "Network Engineers", "Technical Training"],
    color: "#fb923c",
  },
];

const ServicesSection: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    cardsRef.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .services-section {
          padding: 100px 0 0;
          background: var(--bg);
          position: relative;
        }
        .services-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent);
        }

        .services-intro {
          margin-bottom: 56px;
        }
        .services-intro p {
          color: rgba(232,236,244,0.5);
          font-size: 1rem;
          max-width: 460px;
          margin-top: 14px;
          line-height: 1.7;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }

        .service-card {
          background: var(--bg2);
          padding: 36px 32px;
          position: relative;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.65s cubic-bezier(0.16,1,0.3,1),
            transform 0.65s cubic-bezier(0.16,1,0.3,1),
            background 0.25s;
        }
        .service-card.visible {
          opacity: 1;
          transform: none;
        }
        .service-card:hover {
          background: var(--bg3);
        }

        /* Top: number + icon */
        .service-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .service-number {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: rgba(232,236,244,0.2);
          letter-spacing: 0.1em;
          padding-top: 2px;
        }
        .service-icon {
          width: 40px; height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: #fff;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 8px;
          transition: border-color 0.25s, background 0.25s;
        }
        .service-card:hover .service-icon {
          border-color: var(--border-accent);
          background: rgba(249,115,22,0.08);
          color: #f97316;
        }

        /* Tag */
        .service-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(249,115,22,0.7);
          margin-bottom: 8px;
        }

        /* Title */
        .service-title {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        /* Desc */
        .service-desc {
          font-size: 0.85rem;
          color: rgba(232,236,244,0.48);
          line-height: 1.72;
          margin-bottom: 20px;
        }

        /* Divider */
        .service-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 20px;
        }

        /* Points */
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
          font-size: 0.82rem;
          color: rgba(232,236,244,0.55);
          font-family: 'DM Sans', sans-serif;
        }
        .spt-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #f97316;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
          .service-card { padding: 28px 22px; }
        }
      `}</style>

      <section className="services-section" id="services">
        <div className="container">
          <div className="services-intro reveal">
            <div className="section-label">Our Services</div>
            <h2 className="heading-lg" style={{ color: '#fff' }}>
              Everything Your Business<br />Needs to Thrive
            </h2>
            <p>End-to-end ICT solutions delivered by Kenya's most experienced technical team.</p>
          </div>

          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <div
                key={i}
                className="service-card"
                ref={el => { cardsRef.current[i] = el; }}
                style={{ transitionDelay: `${(i % 3) * 0.07}s` }}
              >
                <div className="service-card-top">
                  <span className="service-number">{svc.number}</span>
                  <div className="service-icon">{svc.icon}</div>
                </div>
                <div className="service-tag">{svc.tag}</div>
                <div className="service-title">{svc.title}</div>
                <div className="service-desc">{svc.desc}</div>
                <div className="service-divider" />
                <ul className="service-points">
                  {svc.points.map((p, j) => (
                    <li key={j}><span className="spt-dot" />{p}</li>
                  ))}
                </ul>
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