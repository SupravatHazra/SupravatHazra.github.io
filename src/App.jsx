import { lazy, Suspense, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import galaxyBg from './assets/galaxy-background.svg';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Projects from './Projects';

gsap.registerPlugin(ScrollTrigger);

const StarBackground = lazy(() => import('./StarBackground'));

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#languages', label: 'Languages' },
  { href: '/#certifications', label: 'Certifications' },
  { href: '/#education', label: 'Education' },
  { href: '/projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact', className: 'btn-nav' },
];

const industrySkills = [
  'GMP Compliance',
  'Sterile Packaging',
  'Quality Assurance & QC',
  'Warehouse Logistics (FIFO)',
  'Batch Tracking & Documentation',
  'Deviation Handling',
];

const softwareSkills = [
  'Advanced MS Excel',
  'Excel VBA Automation',
  'MS Word & PowerPoint',
  'Data Entry & Migration',
  'Inventory Management Systems',
  'Hardware & OS Troubleshooting',
];

const aiSkills = [
  'Generative AI Essentials',
  'Prompt Engineering',
  'Workflow Automation',
  'Root Cause Analysis (RCA)',
  'Data Cleaning & Reporting',
  'Process Optimization',
];

const professionalSkills = [
  'Cross-Team Collaboration',
  'Floor Supervision',
  'Technical Training',
  'SOP Review & Documentation',
  'Operational Reporting',
  'English, Bengali, Hindi',
];

const digitalSkills = [
  'Excel Dashboarding',
  'Power Query',
  'Presentation Design',
  'ERP & Data Tracking',
  'Team Coordination',
  'Time & Workflow Management',
];

const skillMetrics = [
  { label: 'GMP & QA', value: 95 },
  { label: 'Inventory Control', value: 92 },
  { label: 'Excel Automation', value: 89 },
  { label: 'AI & Data Tools', value: 84 },
  { label: 'Cross-Team Coordination', value: 91 },
  { label: 'Warehouse Ops', value: 90 },
];

const certifications = [
  {
    year: '2026',
    title: 'TCS iON Career Edge – AI Foundation',
    description:
      'Covers AI fundamentals, prompt engineering essentials, generative AI workflows, and responsible AI implementation.',
  },
  {
    year: '2026',
    title: 'TCS iON Career Edge – Generative AI Essentials',
    description:
      'Machine learning foundations, in-context learning, generative modeling concepts, and ethical AI.',
  },
  {
    year: '2026',
    title: 'Microsoft Excel: Beginners to Advance',
    description:
      'Skill Course certified under ISO 9001:2015 covering data manipulation, functions, and reporting.',
  },
  {
    year: '2026',
    title: 'Microsoft Excel with A.I Masterclass',
    description:
      'ISO 9001:2015 certified self-learning course on AI integrations and automated spreadsheet analysis.',
  },
];

const education = [
  {
    date: '2015 – 2017',
    title: 'B.Sc. (Hons. in Mathematics)',
    institution: 'University of Calcutta',
    grade: '53.37%',
  },
  {
    date: '2014',
    title: 'Higher Secondary (WBCHSE)',
    institution: 'Bakrahat High School',
    grade: '62.40%',
  },
  {
    date: '2012',
    title: 'Secondary (WBBSE)',
    institution: 'Bakrahat High School',
    grade: '75.85%',
  },
];

const languages = [
  { name: 'Bengali', level: 'Native / Fluent' },
  { name: 'English', level: 'Professional Working Proficiency' },
  { name: 'Hindi', level: 'Conversational / Working Knowledge' },
];

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo" onClick={() => setMenuOpen(false)}>
          Supravat Hazra
        </Link>
        <button
          type="button"
          className="nav-toggle"
          id="navToggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={link.className || ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());

    gsap.fromTo(
      '.brand-logo',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-copy',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, delay: 0.15, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-visual',
      { opacity: 0, scale: 0.94, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 0.25, ease: 'power3.out' }
    );

    gsap.utils.toArray('.reveal-up').forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      );
    });

    gsap.utils.toArray('.skill-bar').forEach((bar) => {
      const fill = bar.querySelector('.skill-fill');
      const value = bar.dataset.level;

      gsap.fromTo(
        fill,
        { width: 0 },
        {
          width: `${value}%`,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <main>
        <section id="hero" className="hero-block">
          <div className="container hero-content">
            <div className="hero-copy reveal-up">
              <span className="badge">
                <span className="status-dot" aria-hidden="true" />
                <span className="badge-skills">
                  <span className="badge-skill">
                    Biotech Operations <span aria-hidden="true">|</span>
                  </span>
                  <span className="badge-skill">
                    GMP <span aria-hidden="true">|</span>
                  </span>
                  <span className="badge-skill">
                    Inventory Management <span aria-hidden="true">|</span>
                  </span>
                  <span className="badge-skill">Data Analyst</span>
                </span>
              </span>
              <h1 className="name-title">
                <span>Supravat Hazra</span>
              </h1>
              <h2>Production Executive</h2>
              <p>
                Experienced in biotech production floor coordination, GMP compliance, quality control,
                and warehouse inventory management (FIFO). Leveraging a mathematics background and
                data/AI tools to optimize production schedules and operational workflows.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  Get In Touch
                </a>
                <a
                  href="https://linkedin.com/in/supravat-hazra"
                  target="_blank"
                  rel="noopener"
                  className="btn btn-outline"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div className="hero-visual reveal-up">
              <div className="hero-image-wrap">
                <img src="/profile-photo.jpg" alt="Supravat Hazra portrait" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">Professional Summary</h2>
            <div className="card about-card reveal-up">
              <p>
                Dedicated Production Executive at GCC Biotech India Pvt. Ltd. with hands-on expertise
                overseeing production floor routines, guiding technical staff, and ensuring strict
                adherence to Good Manufacturing Practice (GMP) protocols.
              </p>
              <p>
                Combining analytical training from a B.Sc. in Mathematics with certifications in AI
                fundamentals and advanced Excel to resolve operational bottlenecks, maintain inventory
                accuracy, and enhance cross-functional workflow coordination.
              </p>
            </div>
          </div>
        </section>

        <section id="experience" className="section section-gray">
          <div className="container">
            <h2 className="section-title">Work Experience</h2>
            <div className="card experience-card reveal-up">
              <div className="job-header">
                <div>
                  <h3>Production Executive</h3>
                  <p className="company-name">GCC Biotech India Pvt. Ltd.</p>
                </div>
                <span className="job-period">25/10/2021 – Present</span>
              </div>

              <div className="job-section">
                <h4>Operations Support & Floor Coordination</h4>
                <ul>
                  <li>Directed and guided shop-floor personnel to ensure consistent output and operational safety.</li>
                  <li>Planned and executed manufacturing schedules to meet client delivery deadlines.</li>
                  <li>Collaborated with R&D, QA, and logistics teams for seamless product handoffs.</li>
                  <li>Trained and supported laboratory technicians during onboarding and technical queries.</li>
                </ul>
              </div>

              <div className="job-section">
                <h4>Inventory Control & Warehouse Operations</h4>
                <ul>
                  <li>Managed warehouse stock levels using cycle counting, reconciliations, and routine audits.</li>
                  <li>Enforced First-In, First-Out (FIFO) stock rotation to mitigate product obsolescence.</li>
                  <li>Supervised raw material intake, controlled storage, and dispatched finished goods.</li>
                </ul>
              </div>

              <div className="job-section">
                <h4>Quality Control & Sterile Packaging</h4>
                <ul>
                  <li>Conducted stage-wise quality checks and product testing across production phases.</li>
                  <li>Aided in drafting and revising Standard Operating Procedures (SOPs).</li>
                  <li>Supported sterile packaging lines and performed root cause analysis on production deviations.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <h2 className="section-title">Core Competencies & Skills</h2>

            <div className="skills-meter reveal-up">
              {skillMetrics.map((skill) => (
                <div className="skill-bar" key={skill.label} data-level={skill.value}>
                  <div className="skill-label-row">
                    <span>{skill.label}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid-layout five-col skills-grid">
              <div className="card reveal-up">
                <h3>Industry & Biotech</h3>
                <ul className="skill-list">
                  {industrySkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="card reveal-up">
                <h3>Software & Systems</h3>
                <ul className="skill-list">
                  {softwareSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="card reveal-up">
                <h3>AI & Analytics</h3>
                <ul className="skill-list">
                  {aiSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="card reveal-up">
                <h3>Professional Skills</h3>
                <ul className="skill-list">
                  {professionalSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="card reveal-up">
                <h3>Digital & Reporting</h3>
                <ul className="skill-list">
                  {digitalSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="languages" className="section section-gray">
          <div className="container">
            <h2 className="section-title">Languages</h2>
            <div className="grid-layout three-col">
              {languages.map((language) => (
                <div className="card reveal-up" key={language.name}>
                  <h3>{language.name}</h3>
                  <ul className="skill-list">
                    <li>{language.level}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="section section-gray">
          <div className="container">
            <h2 className="section-title">Certifications</h2>
            <div className="grid-layout two-col">
              {certifications.map((item) => (
                <div className="card cert-card reveal-up" key={item.title}>
                  <span className="cert-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section">
          <div className="container">
            <h2 className="section-title">Education</h2>
            <div className="grid-layout three-col">
              {education.map((edu) => (
                <div className="card edu-card reveal-up" key={edu.title}>
                  <span className="edu-date">{edu.date}</span>
                  <h3>{edu.title}</h3>
                  <p className="institution">{edu.institution}</p>
                  <span className="grade-pill">{edu.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-gray">
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <div className="card contact-card reveal-up">
              <div className="contact-entry">
                <strong>Location:</strong>
                <span>Bakrahat, South 24 Parganas, West Bengal, India, PIN-743377</span>
              </div>
              <div className="contact-entry">
                <strong>Phone:</strong>
                <a href="tel:+917980728399">+91 7980728399</a>
              </div>
              <div className="contact-entry">
                <strong>Email:</strong>
                <a href="mailto:suprohazra4@gmail.com">suprohazra4@gmail.com</a>
              </div>
              <div className="contact-entry">
                <strong>LinkedIn:</strong>
                <a href="https://linkedin.com/in/supravat-hazra" target="_blank" rel="noopener">
                  linkedin.com/in/supravat-hazra
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <p>
            &copy; <span id="currentYear">{year}</span> Supravat Hazra. All rights reserved.
          </p>
          <a href="/#hero" className="top-anchor">
            Back to Top ↑
          </a>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="relative isolate min-h-screen">
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${galaxyBg})` }}
        >
          <div className="absolute inset-0 bg-purple-950/90 mix-blend-multiply" />
        </div>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
        <div className="relative z-10">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
