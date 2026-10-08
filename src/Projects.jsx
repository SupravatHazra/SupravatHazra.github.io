import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import useViewportHover from './useViewportHover';
import screenshot1 from '../Screenshots/SS1.png';
import screenshot2 from '../Screenshots/SS2.png';
import screenshot3 from '../Screenshots/SS3.png';
import screenshot4 from '../Screenshots/SS4.png';
import screenshot5 from '../Screenshots/SS5.png';
import screenshot6 from '../Screenshots/SS6.png';
import screenshot7 from '../Screenshots/SS7.png';
import screenshot8 from '../Screenshots/SS8.png';
import screenshot9 from '../Screenshots/SS9.png';
import screenshot10 from '../Screenshots/SS10.png';
import demonstrationGif from '../macro-demo-trimmed.gif';
import executiveReport from '../Result_PDF/Executive_Report.pdf';
import accountantReport from '../Result_PDF/Report_Accountant.pdf';
import excelProject from '../Excel_Project.xlsm';
import departmentChartCode from '../Codes/Department_Chart_Code.txt?raw';
import emailExportCode from '../Codes/Email_Export_Code.txt?raw';
import filterEngineCode from '../Codes/Filter_Engine_Code.txt?raw';
import pdfExportCode from '../Codes/PDF_Export_Code.txt?raw';
import pieChartCode from '../Codes/Pie_Chart_Code.txt?raw';
import regionChartCode from '../Codes/Region_Chart_Code.txt?raw';
import yearChartCode from '../Codes/Year_Chart_Code.txt?raw';

const projectDescription =
  'Engineered a comprehensive Excel VBA automation tool designed to streamline data processing and executive reporting. The macro replaces repetitive manual data entry with a one-click workflow, instantly transforming raw employee and regional sales data into formatted visual dashboards.';
const keyFeatures = [
  'Custom Filter Engine',
  'Automated Dashboarding',
  '1-Click PDF Export',
  'Workflow Integration',
];

const projectActionsVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.12,
    },
  },
};

const projectActionVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 22 },
  },
};

const galleryControlsVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.08,
    },
  },
};

const galleryButtonVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 22 },
  },
};

const galleryThumbnailsVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const codeFiles = [
  { name: 'Department_Chart_Code.txt', content: departmentChartCode },
  { name: 'Email_Export_Code.txt', content: emailExportCode },
  { name: 'Filter_Engine_Code.txt', content: filterEngineCode },
  { name: 'PDF_Export_Code.txt', content: pdfExportCode },
  { name: 'Pie_Chart_Code.txt', content: pieChartCode },
  { name: 'Region_Chart_Code.txt', content: regionChartCode },
  { name: 'Year_Chart_Code.txt', content: yearChartCode },
];

const resultPdfs = [
  { name: 'Executive Report', fileName: 'Executive_Report.pdf', src: executiveReport },
  { name: 'Accountant Report', fileName: 'Report_Accountant.pdf', src: accountantReport },
];

const screenshots = [
  { src: screenshot1, alt: 'Department share chart on the Excel dashboard' },
  { src: screenshot2, alt: 'Excel filter engine with region, salary, and year filters' },
  { src: screenshot3, alt: 'Sales dashboard with summary metrics and a department chart' },
  { src: screenshot4, alt: 'PowerPoint report slide with a sales chart' },
  { src: screenshot5, alt: 'Filtered employee records in the Excel output sheet' },
  { src: screenshot6, alt: 'Excel output sheet with export, print, and email actions' },
  { src: screenshot7, alt: 'Exported employee report displayed as a PDF' },
  { src: screenshot8, alt: 'Dashboard chart comparing sales across regions' },
  { src: screenshot9, alt: 'Excel filter engine with an Accountant filter and matching records' },
  { src: screenshot10, alt: 'Sales by region chart in the Excel dashboard' },
];

function GalleryControls({ onPrevious, onNext, onFullscreen }) {
  return (
    <motion.div
      className="project-gallery-controls"
      variants={galleryControlsVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        type="button"
        onClick={onPrevious}
        aria-label="Show previous screenshot"
        className="project-button project-image-control project-image-control-previous"
        style={{ y: '-50%' }}
        variants={galleryButtonVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Previous
      </motion.button>
      <motion.button
        type="button"
        onClick={onNext}
        aria-label="Show next screenshot"
        className="project-button project-image-control project-image-control-next"
        style={{ y: '-50%' }}
        variants={galleryButtonVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next
      </motion.button>
      {onFullscreen && (
        <motion.button
          type="button"
          onClick={onFullscreen}
          className="project-button project-image-fullscreen"
          variants={galleryButtonVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Full Screen
        </motion.button>
      )}
    </motion.div>
  );
}

function ScreenshotThumbnails({ activeScreenshot, onSelect }) {
  return (
    <motion.div
      className="project-gallery-thumbnails"
      aria-label="Project screenshots"
      variants={galleryThumbnailsVariants}
      initial="hidden"
      animate="visible"
    >
      {screenshots.map((screenshot, index) => (
        <motion.button
          key={screenshot.src}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Show screenshot ${index + 1}`}
          aria-pressed={activeScreenshot === index}
          className={`project-thumbnail${activeScreenshot === index ? ' is-active' : ''}`}
          variants={galleryButtonVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={screenshot.src} alt="" />
        </motion.button>
      ))}
    </motion.div>
  );
}

export function ProjectCard() {
  const [activeDialog, setActiveDialog] = useState(null);
  const [activeScreenshot, setActiveScreenshot] = useState(2);
  const [activeCode, setActiveCode] = useState(0);

  useViewportHover('.project-hover-card');

  const showScreenshot = (offset) => {
    setActiveScreenshot((current) => (current + offset + screenshots.length) % screenshots.length);
  };

  useEffect(() => {
    if (!activeDialog) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActiveDialog(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activeDialog]);

  return (
    <article className="project-hover-card mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-transparent shadow-none transition-all duration-300 md:hover:-translate-y-2 md:hover:scale-[1.02] md:hover:border-purple-400 md:hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] active:scale-95 active:border-purple-400 active:shadow-[0_0_25px_rgba(168,85,247,0.4)]">
      <div className="project-preview">
        <img
          src={screenshots[activeScreenshot].src}
          alt={screenshots[activeScreenshot].alt}
          className="h-full w-full object-contain"
        />
        <GalleryControls
          onPrevious={() => showScreenshot(-1)}
          onNext={() => showScreenshot(1)}
          onFullscreen={() => setActiveDialog('gallery')}
        />
      </div>

      <ScreenshotThumbnails activeScreenshot={activeScreenshot} onSelect={setActiveScreenshot} />

      <div className="p-6 sm:p-7">
        <h2 className="text-xl font-bold text-white drop-shadow-md capitalize">Excel VBA Automation</h2>
        <div className="mt-4 flex flex-col gap-4">
          <p className="leading-7 text-[#c9b9d5]">{projectDescription}</p>

          <section>
            <h3 className="text-xl font-bold text-white drop-shadow-md capitalize">Key Features</h3>
            <ul className="mt-2 grid gap-2 text-sm text-[#c9b9d5] sm:grid-cols-2 lg:text-base lg:leading-[1.65]">
              {keyFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c6a4e2]/15 text-xs font-bold text-[#d7b8ee]"
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <aside className="rounded-xl border border-[#c6a4e2]/20 bg-[#c6a4e2]/[0.07] p-4">
            <h3 className="text-xl font-bold text-white drop-shadow-md capitalize">Business Impact</h3>
            <p className="mt-2 text-sm leading-6 text-[#c9b9d5] lg:text-base lg:leading-[1.65]">
              Eliminated hours of manual data aggregation and formatting, ensuring 100% accuracy in
              reporting and allowing the team to focus on data analysis rather than data entry.
            </p>
          </aside>
        </div>

        <motion.div
          className="project-actions"
          variants={projectActionsVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            type="button"
            onClick={() => setActiveDialog('code')}
            className="project-button project-action-button border-[#c6a4e2] bg-transparent text-[#c6a4e2] transition-colors duration-300 hover:bg-[#c6a4e2] hover:text-[#241330]"
            variants={projectActionVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Code
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setActiveDialog('demo')}
            className="project-button project-action-button border-[#c6a4e2] bg-transparent text-[#c6a4e2] transition-colors duration-300 hover:bg-[#c6a4e2] hover:text-[#241330]"
            variants={projectActionVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Demonstration
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setActiveDialog('pdfs')}
            className="project-button project-action-button border-[#c6a4e2] bg-transparent text-[#c6a4e2] transition-colors duration-300 hover:bg-[#c6a4e2] hover:text-[#241330]"
            variants={projectActionVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Result PDFs
          </motion.button>
          <motion.a
            href={excelProject}
            download="Excel_Project.xlsm"
            className="project-button project-action-button border-[#c6a4e2] bg-transparent text-[#c6a4e2] transition-colors duration-300 hover:bg-[#c6a4e2] hover:text-[#241330]"
            variants={projectActionVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Excel File
          </motion.a>
        </motion.div>
      </div>

      {activeDialog === 'gallery' &&
        createPortal(
          <div className="project-fullscreen-backdrop">
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-fullscreen-title"
              className="project-fullscreen-panel"
            >
              <motion.button
                type="button"
                autoFocus
                onClick={() => setActiveDialog(null)}
                aria-label="Close full-screen project view"
                className="project-button absolute right-4 top-4 z-10"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.16 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>

              <div className="project-fullscreen-gallery">
                <div className="project-fullscreen-image">
                  <img
                    src={screenshots[activeScreenshot].src}
                    alt={screenshots[activeScreenshot].alt}
                    className="h-full w-full object-contain"
                  />
                  <GalleryControls
                    onPrevious={() => showScreenshot(-1)}
                    onNext={() => showScreenshot(1)}
                  />
                </div>
                <ScreenshotThumbnails
                  activeScreenshot={activeScreenshot}
                  onSelect={setActiveScreenshot}
                />
              </div>

              <div className="project-fullscreen-details bg-[#211927] p-6 text-[#f1e8f8] sm:p-8">
                <h2
                  id="project-fullscreen-title"
                  className="text-xl font-bold text-white capitalize"
                >
                  Excel VBA Automation
                </h2>
                <p className="mt-3 leading-7 text-[#c9b9d5]">{projectDescription}</p>
              </div>
            </section>
          </div>,
          document.body,
        )}

      {activeDialog && activeDialog !== 'gallery' &&
        createPortal(
          <div className="project-resource-backdrop">
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-resource-title"
              className="project-resource-panel"
            >
              <header className="project-resource-header">
                <h2 id="project-resource-title" className="text-2xl font-bold tracking-tight">
                  {activeDialog === 'code' && 'Project Source Code'}
                  {activeDialog === 'demo' && 'Project Demonstration'}
                  {activeDialog === 'pdfs' && 'Result PDFs'}
                </h2>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setActiveDialog(null)}
                  aria-label="Close project resource"
                  className="project-button"
                >
                  Close
                </button>
              </header>

              {activeDialog === 'code' && (
                <div className="project-code-viewer">
                  <nav className="project-code-tabs" aria-label="Project code files">
                    {codeFiles.map((file, index) => (
                      <button
                        key={file.name}
                        type="button"
                        onClick={() => setActiveCode(index)}
                        aria-pressed={activeCode === index}
                        className={`project-button project-code-tab${activeCode === index ? ' is-active' : ''}`}
                      >
                        {file.name}
                      </button>
                    ))}
                  </nav>
                  <pre className="project-code-content">
                    <code>{codeFiles[activeCode].content}</code>
                  </pre>
                </div>
              )}

              {activeDialog === 'demo' && (
                <div className="project-demo-viewer">
                  <img src={demonstrationGif} alt="Animated demonstration of the Excel VBA project" />
                </div>
              )}

              {activeDialog === 'pdfs' && (
                <ul className="project-pdf-list">
                  {resultPdfs.map((pdf) => (
                    <li key={pdf.fileName}>
                      <span>
                        <strong>{pdf.name}</strong>
                        <small>{pdf.fileName}</small>
                      </span>
                      <a className="project-button" href={pdf.src} target="_blank" rel="noreferrer">
                        Open PDF
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>,
          document.body,
        )}
    </article>
  );
}

function Projects() {
  return (
    <main className="min-h-[calc(100vh-64px)] px-5 py-16 text-[#f1e8f8] sm:px-8 sm:py-20 lg:px-[32px]">
      <section className="site-container">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Projects</h1>
          <p className="mt-4 text-base leading-7 text-[#c9b9d5] sm:text-lg">
            Practical tools and automation projects focused on improving everyday workflows.
          </p>
        </div>

        <div className="w-full">
          <ProjectCard />
        </div>
      </section>
    </main>
  );
}

export default Projects;
