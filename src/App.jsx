import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeAnimation } from 'react-type-animation';
import useViewportHover from './useViewportHover';
import galaxyBg from './assets/galaxy-background.svg';
import profilePhoto from '../profile-photo.jpg';
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
const certificateImageFiles = Object.entries(
  import.meta.glob('../Certificates/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
  })
);

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
  { label: 'AI Tools & Technologies', value: 84 },
  { label: 'Cross-Team Coordination', value: 91 },
  { label: 'Warehouse Ops', value: 90 },
  { label: 'Data Analysis', value: 88 },
  { label: 'Web Development Using AI', value: 85 },
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
].map((certificate) => {
  const normalizedTitle = certificate.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const exactMatches = certificateImageFiles.filter(([path]) => {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
    return filename.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedTitle;
  });
  const partialMatches = certificateImageFiles.filter(([path]) => {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
    return filename.toLowerCase().replace(/[^a-z0-9]/g, '').startsWith(normalizedTitle);
  });
  const matches = exactMatches.length > 0 ? exactMatches : partialMatches;

  return {
    ...certificate,
    certificateImage: matches.length === 1 ? matches[0][1] : null,
  };
});

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
  const [activeCertificate, setActiveCertificate] = useState(null);

  useViewportHover('.card, .skill-bar');

  useEffect(() => {
    setYear(new Date().getFullYear());

    gsap.fromTo(
      '.brand-logo',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
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
          <div className="container hero-content flex flex-col-reverse items-center justify-center gap-10">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <p className="hero-greeting text-white/80">Hello I'm</p>
              <h1 className="name-title text-5xl md:text-[clamp(3rem,5vw,4.5rem)] font-bold text-white">
                <span>Supravat Hazra</span>
              </h1>
              <h2 className="hero-role">
                And I'm{' '}
                <TypeAnimation
                  className="role-text text-purple-400 font-bold"
                  sequence={[
                    'Production Executive',
                    2000,
                    'Biotech Operations Specialist',
                    2000,
                    'GMP & Quality Controller',
                    2000,
                    'AI & Excel Automation Enthusiast',
                    2000,
                    'Data Analyst',
                    2000,
                    'Web Developer',
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </h2>
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
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            >
              <div className="hero-image-wrap rounded-full border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                <img src={profilePhoto} alt="Supravat Hazra portrait" />
              </div>
            </motion.div>
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
                  <div className="cert-card-heading">
                    <h3>{item.title}</h3>
                    {item.certificateImage && (
                      <button
                        type="button"
                        className="btn btn-outline certificate-view-button"
                        onClick={() => setActiveCertificate(item)}
                      >
                        View Certificate
                      </button>
                    )}
                  </div>
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
              <a
                className="btn btn-primary"
                href="/resume/Supravat_Hazra_Resume.pdf"
                download
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>
      </main>
      {activeCertificate &&
        createPortal(
          <CertificateModal
            certificate={activeCertificate}
            onClose={() => setActiveCertificate(null)}
          />,
          document.body
        )}

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

function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      className="certificate-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="certificate-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${certificate.title} certificate`}
      >
        <button
          type="button"
          className="btn btn-outline certificate-modal-close"
          onClick={onClose}
          aria-label="Close certificate"
          autoFocus
        >
          ×
        </button>
        <img src={certificate.certificateImage} alt={certificate.title} />
      </section>
    </div>
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
