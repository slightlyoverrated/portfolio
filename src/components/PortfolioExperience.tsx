import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Cpu,
  Download,
  GraduationCap,
  Mail,
  Menu,
  Moon,
  Package,
  ShoppingBag,
  Sun,
  Trophy,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin } from './BrandIcons';
import { portfolio } from '@/src/data/portfolio';

const { links } = portfolio;
const navigation = [
  'Education',
  'Projects',
  'Skills',
  'Involvement',
  'Contact',
];

function SectionHeading({
  number,
  label,
  title,
  id,
  description,
}: {
  number: string;
  label: string;
  title: string;
  id: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span>{number} /</span> {label}
      </p>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function ProjectPreview({ project }: { project: string }) {
  if (project === 'krung')
    return (
      <figure
        className="project-preview krung-preview"
        aria-label="KRUNG concept preview: story, context, and sources organised together"
      >
        <div className="preview-window">
          <div className="preview-window-bar">
            <span>
              KRUNG<span className="blue-dot">.</span>
            </span>
            <span>THAILAND, IN CONTEXT</span>
          </div>
          <div className="news-preview">
            <div>
              <span className="preview-label">BEYOND THE HEADLINE</span>
              <strong>
                One story.
                <br />
                The bigger picture.
              </strong>
              <span className="preview-rule" />
              <span className="preview-rule short-rule" />
            </div>
            <div className="source-stack">
              <span>
                01 <b>Storyline</b>
              </span>
              <span>
                02 <b>Context</b>
              </span>
              <span>
                03 <b>Sources</b>
              </span>
            </div>
          </div>
        </div>
        <figcaption className="preview-caption">Interface concept</figcaption>
      </figure>
    );
  if (project === 'orderflow')
    return (
      <figure
        className="project-preview orderflow-preview"
        aria-label="OrderFlow workflow: products move through checkout to organised orders"
      >
        <div className="flow-preview">
          <div className="flow-preview-header">
            <span className="flow-logo">
              <ShoppingBag size={19} aria-hidden="true" /> OrderFlow
            </span>
            <span>THE ORDER JOURNEY</span>
          </div>
          <div className="flow-steps">
            <span>
              <Package size={24} aria-hidden="true" />
              <b>Product</b>
            </span>
            <ArrowRight size={17} aria-hidden="true" />
            <span>
              <ShoppingBag size={24} aria-hidden="true" />
              <b>Checkout</b>
            </span>
            <ArrowRight size={17} aria-hidden="true" />
            <span>
              <Check size={24} aria-hidden="true" />
              <b>Order</b>
            </span>
          </div>
          <div className="flow-bottom">
            <Check size={14} aria-hidden="true" /> A clearer path from product
            to fulfilment
          </div>
        </div>
        <figcaption className="preview-caption">Workflow concept</figcaption>
      </figure>
    );
  if (project === 'mitra')
    return (
      <figure
        className="project-preview mitra-preview"
        aria-label="Mitra concept preview showing Python reminders, audio interaction, and app launching"
      >
        <div className="terminal-preview">
          <div className="terminal-bar">
            <span className="terminal-dots">
              <i />
              <i />
              <i />
            </span>
            <span>mitra.py</span>
          </div>
          <div className="terminal-body">
            <span className="code-comment"># Small tasks. One assistant.</span>
            <span>
              <b>from</b> mitra <b>import</b> assistant
            </span>
            <span className="terminal-space">
              assistant.<em>remind</em>()
            </span>
            <span>
              assistant.<em>listen</em>()
            </span>
            <span>
              assistant.<em>launch</em>()
            </span>
            <span className="terminal-prompt">
              › <span className="terminal-cursor" />
            </span>
          </div>
        </div>
        <figcaption className="preview-caption">
          Illustrative interface
        </figcaption>
      </figure>
    );
  return (
    <figure
      className="project-preview portfolio-preview"
      aria-label="Academic portfolio preview with light and dark themes and education, projects, and skills sections"
    >
      <div className="mini-portfolio">
        <div className="mini-header">
          <b>
            Ishan<span>.</span>
          </b>
          <span>Education · Projects · Skills</span>
          <Sun size={15} aria-hidden="true" />
        </div>
        <div className="mini-content">
          <span className="preview-label">LEARN. BUILD. REPEAT.</span>
          <strong>
            Curious by nature.
            <br />
            <span>Engineer in the making.</span>
          </strong>
          <span className="preview-rule" />
          <span className="preview-rule short-rule" />
        </div>
        <div className="mini-footer">
          <span>React</span>
          <span>TypeScript</span>
          <span>GitHub Pages</span>
        </div>
      </div>
      <figcaption className="preview-caption">This portfolio</figcaption>
    </figure>
  );
}

export function PortfolioExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  );
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  }

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('navigation-toggle')?.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0f172a' : '#f8fafc');
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }, [theme]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#main" aria-label="Ishan, back to top">
            Ishan<span>.</span>
          </a>
          <nav
            id="main-navigation"
            className={menuOpen ? 'main-nav is-open' : 'main-nav'}
            aria-label="Main navigation"
          >
            {navigation.map((label) => (
              <a
                key={label}
                href={'#' + label.toLowerCase()}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <Button
              className="icon-button"
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={
                theme === 'light'
                  ? 'Switch to dark theme'
                  : 'Switch to light theme'
              }
            >
              {theme === 'light' ? (
                <Moon aria-hidden="true" />
              ) : (
                <Sun aria-hidden="true" />
              )}
            </Button>
            <a
              className="button button-small header-cv"
              href={links.cv}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download academic CV (PDF, opens in a new tab)"
            >
              <span>
                <span className="cv-long">Download </span>CV
              </span>{' '}
              <Download size={16} aria-hidden="true" />
            </a>
            <Button
              id="navigation-toggle"
              className="icon-button menu-toggle"
              variant="ghost"
              size="icon"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-controls="main-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="status-pill">
              <span className="status-dot" /> Aspiring Computer Engineering & AI
              student
            </p>
            <p className="hero-intro">Hi, I’m {portfolio.person.name}.</p>
            <h1 id="hero-title">
              Curious by nature.
              <br />
              <span>Engineer in the making.</span>
            </h1>
            {portfolio.person.bio.map((paragraph) => (
              <p className="hero-description" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <div className="hero-actions">
              <a className="button" href="#projects">
                View projects <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a
                className="button button-outline"
                href={links.cv}
                target="_blank"
                rel="noopener noreferrer"
              >
                Academic resume <Download size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="social-links" aria-label="Social and contact links">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <Github size={20} aria-hidden="true" />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a href={'mailto:' + links.email} aria-label="Email Ishan">
                <Mail size={20} aria-hidden="true" />
              </a>
              <span>
                Based in {portfolio.person.location} · Graduating{' '}
                {portfolio.person.graduation}
              </span>
            </div>
          </div>
          <aside className="study-card" aria-label="My academic direction">
            <div className="study-card-top">
              <span className="eyebrow">THE NEXT CHAPTER</span>
              <GraduationCap size={25} aria-hidden="true" />
            </div>
            <h2>
              From understanding
              <br />
              to building.
            </h2>
            <p>
              Strong foundations. Real problems.
              <br />A lot of questions worth asking.
            </p>
            <div className="study-row">
              <BookOpen size={21} aria-hidden="true" />
              <div>
                <span>Studying</span>
                <strong>Mathematics · Physics · CS</strong>
              </div>
            </div>
            <div className="study-row">
              <Code2 size={21} aria-hidden="true" />
              <div>
                <span>Exploring</span>
                <strong>Software · AI · Robotics</strong>
              </div>
            </div>
            <div className="study-card-footer">
              <span className="study-monogram" aria-hidden="true">
                i.
              </span>
              <span>
                Learning by making,
                <br />
                <strong>one project at a time.</strong>
              </span>
            </div>
          </aside>
          <a className="scroll-cue" href="#education">
            A little more about my journey{' '}
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </section>

        <section
          id="education"
          className="section container"
          aria-labelledby="education-title"
        >
          <SectionHeading
            number="01"
            label="EDUCATION"
            title="The foundations behind the work."
            id="education-title"
            description="A growing academic toolkit, a clear engineering direction, and the motivation to keep improving."
          />
          <div className="education-grid">
            <article className="education-card">
              <div className="card-title-row">
                <span className="section-icon">
                  <GraduationCap size={25} aria-hidden="true" />
                </span>
                <span className="subtle-badge">
                  Class of {portfolio.person.graduation}
                </span>
              </div>
              <h3>{portfolio.person.school}</h3>
              <p className="school-meta">
                Year 13 · A Level studies · Thailand
              </p>
              <p className="card-description">
                Building the mathematical and scientific foundations for a
                future in computer engineering. Expected graduation:{' '}
                {portfolio.person.graduation}.
              </p>
              <h4 className="small-heading">CURRENT COURSEWORK</h4>
              <ul className="pills" aria-label="Current coursework">
                {portfolio.person.subjects.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
              <div className="education-summary">
                <div>
                  <strong>A</strong>
                  <span>IGCSE Computer Science</span>
                </div>
                <div>
                  <strong>{portfolio.academics.sat.total}</strong>
                  <span>
                    SAT · {portfolio.academics.sat.math} Math /{' '}
                    {portfolio.academics.sat.readingWriting} R&W
                  </span>
                </div>
              </div>
              <details className="academic-details">
                <summary>
                  Academic results & exam plans{' '}
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <div className="results-grid">
                  <div>
                    <h4>IGCSE results</h4>
                    <dl>
                      {portfolio.academics.igcse.map((result) => (
                        <div key={result.subject}>
                          <dt>{result.subject}</dt>
                          <dd>{result.grade}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div>
                    <h4>Current AS results</h4>
                    <dl>
                      {portfolio.academics.asLevels.map((result) => (
                        <div key={result.subject}>
                          <dt>{result.subject}</dt>
                          <dd>{result.grade}</dd>
                        </div>
                      ))}
                    </dl>
                    <p>{portfolio.academics.recovery}</p>
                    <p>
                      <strong>IELTS:</strong> {portfolio.academics.ielts}.
                    </p>
                  </div>
                </div>
              </details>
            </article>
            <aside className="honors-card" aria-labelledby="honors-title">
              <div className="card-title-row">
                <h3 id="honors-title">Academic highlights</h3>
                <Award size={22} aria-hidden="true" />
              </div>
              <ul className="honors-list">
                {portfolio.honors.map((honor) => (
                  <li key={honor.title}>
                    <span className="honor-mark">
                      <Check size={15} aria-hidden="true" />
                    </span>
                    <div>
                      <h4>{honor.title}</h4>
                      <p>{honor.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="direction-note">
                <span className="small-heading">LOOKING AHEAD</span>
                <p>
                  At university, I want to understand the principles beneath the
                  tools, learn from different perspectives, and build systems
                  beyond my current experience.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="projects"
          className="section projects-section"
          aria-labelledby="projects-title"
        >
          <div className="container">
            <SectionHeading
              number="02"
              label="SELECTED PROJECTS"
              title="Where curiosity becomes something useful."
              id="projects-title"
              description="Independent work that has taken me beyond classroom exercises—each project comes with a new set of questions and lessons."
            />
            <div className="project-grid">
              {portfolio.projects.map((project) => (
                <article
                  className={'project-card project-' + project.id}
                  key={project.id}
                >
                  <ProjectPreview project={project.id} />
                  <div className="project-body">
                    <span className="project-category">{project.category}</span>
                    <div className="project-title">
                      <h3>{project.name}</h3>
                      <span className="project-index" aria-hidden="true">
                        0{portfolio.projects.indexOf(project) + 1}
                      </span>
                    </div>
                    <p className="project-descriptor">{project.descriptor}</p>
                    <p className="card-description">{project.summary}</p>
                    <div className="learning-note">
                      <span className="small-heading">WHAT I LEARNED</span>
                      <p>{project.outcome}</p>
                    </div>
                    <ul
                      className="pills tech-pills"
                      aria-label={
                        project.name + ' technologies and disciplines'
                      }
                    >
                      {project.stack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                    <div className="project-links">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={
                            project.name + ' live demo (opens in a new tab)'
                          }
                        >
                          Live demo{' '}
                          <ArrowUpRight size={17} aria-hidden="true" />
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={
                            project.name +
                            ' GitHub repository (opens in a new tab)'
                          }
                        >
                          <Github size={16} aria-hidden="true" /> GitHub repo
                        </a>
                      )}
                      {!project.live && !project.repo && (
                        <span className="project-status">{project.status}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <a
              className="text-link more-code"
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} aria-hidden="true" /> More code and experiments
              on GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          id="skills"
          className="section container"
          aria-labelledby="skills-title"
        >
          <SectionHeading
            number="03"
            label="SKILLS & FOUNDATIONS"
            title="Tools I use. Ideas I’m growing into."
            id="skills-title"
            description="A practical toolkit built through coursework, independent projects, and plenty of debugging—not a claim to have finished learning."
          />
          <div className="skills-grid">
            {portfolio.skills.map((group, index) => {
              const Icon = [Code2, Wrench, Braces, Cpu][index];
              return (
                <article className="skill-card" key={group.title}>
                  <span className="section-icon">
                    <Icon size={23} aria-hidden="true" />
                  </span>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul className="pills">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="involvement"
          className="section involvement-section"
          aria-labelledby="involvement-title"
        >
          <div className="container">
            <SectionHeading
              number="04"
              label="INVOLVEMENT"
              title="Learning doesn’t stop at the screen."
              id="involvement-title"
              description="Competition, hands-on exploration, and experiences that shape how I approach challenges and work with others."
            />
            <div className="involvement-grid">
              {portfolio.involvement.map((activity, index) => {
                const Icon = [Trophy, Users, Cpu][index];
                return (
                  <article className="involvement-card" key={activity.title}>
                    <div className="involvement-top">
                      <Icon size={24} aria-hidden="true" />
                      <span>{activity.role}</span>
                    </div>
                    <h3>{activity.title}</h3>
                    <p className="organisation">{activity.organisation}</p>
                    <p>{activity.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section container"
          aria-labelledby="contact-title"
        >
          <div className="contact-panel">
            <div className="contact-copy">
              <span className="eyebrow">05 / GET IN TOUCH</span>
              <h2 id="contact-title">
                Good work starts
                <br />
                with a conversation.
              </h2>
              <p>
                I’d love to connect about university opportunities, technical
                internships, or a project worth learning from.
              </p>
              <div className="contact-socials">
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={18} aria-hidden="true" /> LinkedIn{' '}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} aria-hidden="true" /> GitHub{' '}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="contact-details">
              <span className="contact-mail-icon">
                <Mail size={25} aria-hidden="true" />
              </span>
              <p className="small-heading">SAY HELLO</p>
              <a className="email-link" href={'mailto:' + links.email}>
                {links.email}
              </a>
              <Button
                variant="outline"
                className="button copy-button"
                onClick={copyEmail}
              >
                {copyStatus === 'copied' ? (
                  <Check size={17} aria-hidden="true" />
                ) : (
                  <Copy size={17} aria-hidden="true" />
                )}
                {copyStatus === 'copied' ? 'Email copied' : 'Copy email'}
              </Button>
              <output className="copy-status" aria-live="polite">
                {copyStatus === 'failed'
                  ? 'Copy unavailable. Select the email address above or open your email app.'
                  : copyStatus === 'copied'
                    ? 'Ready to paste into your email app.'
                    : 'Direct email. No forms, no fuss.'}
              </output>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <p>
          © {new Date().getFullYear()} {portfolio.person.name}{' '}
          <span aria-hidden="true">·</span> Built for GitHub Pages
        </p>
        <a href="#main">
          Back to top <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </footer>
    </>
  );
}
