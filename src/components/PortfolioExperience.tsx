/* oxlint-disable next/no-img-element -- Static Vite site: local, lazy-loaded images require no Next image server. */
import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  FileText,
  Menu,
  Minus,
  Plus,
  X,
} from 'lucide-react';
import { portfolio } from '@/src/data/portfolio';
import { usePortfolioMotion } from '@/src/hooks/usePortfolioMotion';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import {
  FutureDiagram,
  KrungDiagram,
  OrderFlowDiagram,
} from './EngineeringDiagrams';

const sections = [
  ['overview', 'Overview'],
  ['academics', 'Academics'],
  ['statement', 'Personal Statement'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['activities', 'Activities'],
  ['community', 'Community'],
  ['future', 'Future / Contact'],
] as const;
const discovered = import.meta.glob<string>(
  '../assets/community-service/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' },
);
const photos = Object.entries(discovered)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({ name: path.split('/').pop()!, url }));
const explicitPhotos = new Set(
  portfolio.community.map((item) => item.image).filter(Boolean),
);
const unassigned = photos.filter((photo) => !explicitPhotos.has(photo.name));
let autoPhotoIndex = 0;
const communityItems = portfolio.community.map((item) => ({
  ...item,
  photo: item.image
    ? photos.find((photo) => photo.name === item.image)
    : unassigned[autoPhotoIndex++],
}));
const extraPhotos = unassigned.slice(autoPhotoIndex);
const assetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const statementWords = portfolio.personalStatement
  .join(' ')
  .split(/\s+/).length;

function SkillItem({ name, evidence }: { name: string; evidence: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className="skill-item"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      onBlur={() => setOpen(false)}
    >
      {name}
      <span className={`skill-evidence ${open ? 'visible' : ''}`}>
        {evidence}
      </span>
    </button>
  );
}
function Links() {
  return (
    <div className="contact-links">
      {Object.entries(portfolio.links)
        .filter(([, url]) => url)
        .map(([key, url]) => (
          <a
            key={key}
            href={
              key === 'email'
                ? `mailto:${url}`
                : url.startsWith('https:')
                  ? url
                  : assetUrl(url)
            }
            target={key === 'email' ? undefined : '_blank'}
            rel="noreferrer"
          >
            {
              (
                {
                  github: 'GitHub',
                  krung: 'KRUNG',
                  orderflow: 'OrderFlow',
                  email: 'Email',
                  cv: 'CV',
                } as Record<string, string>
              )[key]
            }
            <ArrowUpRight size={19} />
          </a>
        ))}
    </div>
  );
}
function Academics() {
  const data = portfolio.academics;
  return (
    <section
      id="academics"
      className="academics section-pad"
      aria-labelledby="academics-title"
      tabIndex={-1}
    >
      <div className="record-title">
        <h2 id="academics-title">Academic record</h2>
        <p>{portfolio.person.stage} · A Levels · Thailand</p>
      </div>
      <p className="current-subjects">
        Mathematics · Physics · Computer Science
      </p>
      <div className="academic-record">
        <div className="igcse-record">
          <div className="record-heading">
            <h3>IGCSE results</h3>
            <span className="mono">{data.igcse.length} subjects</span>
          </div>
          <dl className="grades">
            {data.igcse.map((r) => (
              <div key={r.subject}>
                <dt>{r.subject}</dt>
                <dd>{r.grade}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="as-record">
          <div className="record-heading">
            <h3>AS record</h3>
            <span className="mono">First sitting</span>
          </div>
          <dl className="grades">
            {data.aLevels.map((r) => (
              <div key={r.subject}>
                <dt>{r.subject}</dt>
                <dd>{r.grade}</dd>
              </div>
            ))}
          </dl>
          <div className="trajectory-note">
            <span className="mono">Retake note</span>
            <p>{data.trajectory}</p>
          </div>
        </div>
        <div className="exam-record">
          <div>
            <span className="mono">SAT</span>
            <strong>
              {data.exams.sat.total}
              <small>/ 1600</small>
            </strong>
            <p>
              Math {data.exams.sat.math}
              <br />
              Reading &amp; Writing {data.exams.sat.readingWriting}
            </p>
          </div>
          <div>
            <span className="mono">IELTS</span>
            <h3>{data.exams.ielts.score ?? data.exams.ielts.status}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement({ staticMode }: { staticMode: boolean }) {
  const [full, setFull] = useState(false);
  return (
    <section
      id="statement"
      className={`statement section-pad ${full ? 'statement-full' : ''}`}
      aria-labelledby="statement-title"
      tabIndex={-1}
    >
      <div className="statement-layout">
        <div className="statement-heading">
          <h2 id="statement-title">
            Why
            <br />
            <em>engineering?</em>
          </h2>
          <span className="mono statement-length">
            Personal statement · {statementWords} words
          </span>
        </div>
        <article className="statement-paper">
          <div className="paper-toolbar">
            <span>
              <FileText size={16} />
              Personal statement
            </span>
            <button
              type="button"
              onClick={() => setFull(!full)}
              aria-pressed={full}
            >
              {full ? 'Scroll reading' : 'Read full text'}
              {full ? <Minus size={14} /> : <Plus size={14} />}
            </button>
          </div>
          <div
            className={`statement-prose ${staticMode || full ? 'show-all' : ''}`}
          >
            {portfolio.personalStatement.map((p, i) => (
              <p className="statement-paragraph" key={p}>
                <span className="sr-only">{p}</span>
                <span className="paragraph-number mono" aria-hidden="true">
                  0{i + 1}
                </span>
                {p.split(' ').map((word, j) => (
                  <span className="statement-word" key={j} aria-hidden="true">
                    {word}{' '}
                    <span className="word-ink" aria-hidden="true">
                      {word}{' '}
                    </span>
                  </span>
                ))}
              </p>
            ))}
          </div>
          <div className="paper-footer mono">
            <span>{staticMode || full ? 'Full text' : 'Scroll to read'}</span>
            <span>Ishan Dubey</span>
          </div>
        </article>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="projects section-pad"
      aria-labelledby="projects-title"
      tabIndex={-1}
    >
      <div className="section-heading">
        <div>
          <h2 id="projects-title">Projects</h2>
        </div>
        <p>
          Two web projects, a desktop assistant and some hardware experiments.
        </p>
      </div>
      {(['orderflow', 'krung'] as const).map((key, i) => {
        const project = portfolio.projects[key];
        return (
          <article
            key={key}
            id={`project-${key}`}
            className={`project-case ${key}`}
          >
            <div className="project-top">
              <span className="mono">
                0{i + 1} / {project.descriptor}
              </span>
              {key === 'krung' && (
                <a
                  href={portfolio.links.krung}
                  target="_blank"
                  rel="noreferrer"
                >
                  krung.news
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
            <div className="project-intro">
              <div>
                <h3>{project.name}</h3>
                <h4>{project.summary}</h4>
              </div>
              <p>{project.intro}</p>
            </div>
            <figure className="project-evidence">
              {project.evidence.image ? (
                <img
                  src={assetUrl(project.evidence.image)}
                  alt={project.evidence.alt}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="evidence-placeholder">
                  <FileText size={23} aria-hidden="true" />
                  <span>Screenshot not added yet</span>
                </div>
              )}
              <figcaption>
                <strong>{project.evidence.caption}</strong>
                <p>{project.evidence.description}</p>
              </figcaption>
            </figure>
            {key === 'orderflow' ? <OrderFlowDiagram /> : <KrungDiagram />}
            <div className="case-notes">
              {project.caseStudy.map((c) => (
                <div key={c.label}>
                  <span className="mono">{c.label}</span>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            <div className="project-tools">
              <span className="mono">
                {key === 'orderflow' ? 'Tools used' : 'Work involved'}
              </span>
              {project.technology.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p className="missing-process">
              <strong>Development record</strong> ·{' '}
              {project.evidence.process ||
                'Bug notes, earlier versions and code excerpts not added yet.'}
            </p>
          </article>
        );
      })}
      <div className="smaller-projects">
        {[portfolio.projects.mitra, portfolio.projects.hardware].map((p, i) => (
          <article key={p.name}>
            <span className="mono">
              0{i + 3} / {p.descriptor}
            </span>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
            <p className="project-lesson">{p.lesson}</p>
            <div className="mini-tools">{p.technology.join(' · ')}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Community() {
  return (
    <section
      id="community"
      className="community section-pad"
      aria-labelledby="community-title"
      tabIndex={-1}
    >
      <div className="section-heading">
        <div>
          <h2 id="community-title">Community service</h2>
        </div>
        <p>
          <span className="pending-note">
            Photographs and details to follow.
          </span>
        </p>
      </div>
      <div className="community-board">
        {communityItems.map((item, i) => (
          <figure className="community-frame" key={item.title}>
            {item.photo ? (
              <img
                src={item.photo.url}
                alt={
                  item.placeholder
                    ? 'Community photograph; activity details pending'
                    : item.description || item.title
                }
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="photo-placeholder">
                <span className="frame-cross" aria-hidden="true">
                  —
                </span>
                <span className="mono">{item.title}</span>
                <span className="placeholder-index mono">Photo 0{i + 1}</span>
              </div>
            )}
            <figcaption>
              <span className="mono">
                {item.placeholder
                  ? 'Date and activity details pending'
                  : item.date || item.organization}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.organization && <p>{item.organization}</p>}
              {item.role && (
                <p>
                  <strong>Role:</strong> {item.role}
                </p>
              )}
              {item.impact && (
                <p>
                  <strong>Impact:</strong> {item.impact}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
        {extraPhotos.map((photo) => (
          <figure className="community-frame" key={photo.name}>
            <img
              src={photo.url}
              alt="Community photograph; caption pending"
              loading="lazy"
            />
            <figcaption>
              <span className="mono">DETAILS PENDING</span>
              <h3>Community photograph</h3>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function PortfolioExperience() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [quick, setQuick] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('overview');
  const [progress, setProgress] = useState(0);
  usePortfolioMotion({ root, reduced: reduced || quick || motionPaused });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0,
      );
      let current = 'overview';
      for (const [id] of sections) {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <=
          window.innerHeight * 0.35
        )
          current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (menu)
      document
        .querySelector<HTMLAnchorElement>('#section-navigation a')
        ?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menu) {
        setMenu(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);
  const toggleQuick = () => {
    setQuick(!quick);
    setMenu(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };
  return (
    <main
      ref={root}
      className={`${quick ? 'quick-view ' : ''}${reduced || motionPaused || quick ? 'motion-off' : ''}`}
    >
      <a className="skip-link" href="#academics">
        Skip to academic profile
      </a>
      <div className="scroll-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <header className="site-nav">
        <a
          className="wordmark"
          href="#overview"
          onClick={() => {
            if (quick) toggleQuick();
          }}
          aria-label={`${portfolio.person.name}, overview`}
        >
          i<span>d</span>
          <i />
        </a>
        <nav
          id="section-navigation"
          className={menu ? 'open' : ''}
          aria-label="Portfolio sections"
        >
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => {
                setMenu(false);
                if (id === 'overview' && quick) toggleQuick();
              }}
              aria-current={active === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="quick-toggle"
            type="button"
            aria-pressed={quick}
            onClick={toggleQuick}
          >
            {quick ? <Check size={14} /> : <FileText size={14} />}
            <span>{quick ? 'Full experience' : 'Quick View'}</span>
          </button>
          <button
            id="menu-toggle"
            className="menu-toggle"
            type="button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="section-navigation"
            aria-label={menu ? 'Close navigation' : 'Open navigation'}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <section
        id="overview"
        className="hero section-pad"
        aria-labelledby="hero-title"
        tabIndex={-1}
      >
        <div className="hero-main">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span>{portfolio.person.firstName}</span>
              <span>
                {portfolio.person.lastName}
                <i>.</i>
              </span>
            </h1>
            <p className="hero-role">Year 13 student in Thailand</p>
            <p className="hero-subjects">
              {portfolio.academics.subjects.map((s) => s.name).join(' · ')}
            </p>
            <p className="hero-direction">{portfolio.person.direction}</p>
            <p className="hero-intro">{portfolio.person.intro}</p>
            <div className="hero-ctas">
              <a className="primary-link" href="#projects">
                View projects
                <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#academics">
                Academic profile
                <ArrowDown size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
      {quick && (
        <aside className="quick-banner">
          <span>
            <Check size={17} />
            Admissions Quick View
          </span>
          <p>
            Complete academic record, statement, projects and achievements.
            Motion is paused.
          </p>
          <button type="button" onClick={() => window.print()}>
            Print / save PDF
            <ArrowUpRight size={15} />
          </button>
        </aside>
      )}
      <Academics />
      <Statement staticMode={reduced || quick || motionPaused} />
      <Projects />
      <section
        id="journey"
        className="journey section-pad"
        aria-labelledby="journey-title"
      >
        <div className="journey-heading">
          <h2 id="journey-title">How I got here</h2>
          <p>
            I started with Python problems. The projects gradually needed more
            than one file.
          </p>
          <a className="text-link" href="#academics">
            Current academic record
            <ArrowUpRight size={16} />
          </a>
        </div>
        <ol className="timeline">
          {portfolio.timeline.map((item, i) => (
            <li key={item.title}>
              <span className="timeline-node">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        id="experience"
        className="experience section-pad"
        aria-labelledby="experience-title"
        tabIndex={-1}
      >
        <div className="section-heading">
          <div>
            <h2 id="experience-title">Experience &amp; achievements</h2>
          </div>
        </div>
        <div className="achievement-list">
          {portfolio.achievements.map((a, i) => (
            <article key={a.title}>
              <span className="mono">0{i + 1}</span>
              <span className="achievement-type mono">{a.type}</span>
              <h3>{a.title}</h3>
              <p>{a.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="toolkit"
        className="toolkit section-pad"
        aria-labelledby="toolkit-title"
      >
        <div className="section-heading">
          <div>
            <h2 id="toolkit-title">Things I actually use</h2>
          </div>
          <p>Select a tool to see where I have used it.</p>
        </div>
        <div className="toolkit-layers">
          {portfolio.skills.map((group) => (
            <article key={group.group}>
              <div>
                <h3>{group.group}</h3>
              </div>
              <div className="skill-items">
                {group.items.map((s) => (
                  <SkillItem key={s.name} name={s.name} evidence={s.evidence} />
                ))}
              </div>
            </article>
          ))}
        </div>
        <details
          className="implementation-note"
          onToggle={() => window.dispatchEvent(new Event('portfolio:layout'))}
        >
          <summary>Implementation note: motion in this portfolio</summary>
          <p>
            The scroll animations share one hook. Quick View, the pause button
            and reduced-motion preferences all bypass it.
          </p>
          <pre>
            <code>
              {
                'const element = root.current;\nif (!element || reduced) return;'
              }
            </code>
          </pre>
          <a
            className="text-link"
            href="https://github.com/slightlyoverrated/portfolio/blob/9e5592ce2c6885769daac6b149af56fccfe9796c/src/hooks/usePortfolioMotion.ts#L11-L13"
            target="_blank"
            rel="noreferrer"
          >
            View the source at commit 9e5592c <ArrowUpRight size={14} />
          </a>
        </details>
      </section>
      <section
        id="activities"
        className="activities section-pad"
        aria-labelledby="activities-title"
        tabIndex={-1}
      >
        <div className="section-heading">
          <div>
            <h2 id="activities-title">Activities</h2>
          </div>
          <p>School life and Ror Dor.</p>
        </div>
        <div className="activity-layout">
          <figure className="activity-photo">
            {portfolio.activityPhoto.image ? (
              <img
                src={assetUrl(portfolio.activityPhoto.image)}
                alt={portfolio.activityPhoto.alt}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="photo-placeholder">
                <span>Activity photograph to add</span>
              </div>
            )}
            <figcaption>{portfolio.activityPhoto.caption}</figcaption>
          </figure>
          <div className="activity-notes">
            {portfolio.activities.map((a) => (
              <article key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Community />
      <section className="outside section-pad" aria-labelledby="outside-title">
        <h2 id="outside-title">{portfolio.outside.title}</h2>
        <p>{portfolio.outside.text}</p>
      </section>
      <section
        id="future"
        className="future section-pad"
        aria-labelledby="future-title"
        tabIndex={-1}
      >
        <div className="section-heading">
          <div>
            <h2 id="future-title">What I want to study</h2>
          </div>
          <p>{portfolio.future.text}</p>
        </div>
        <FutureDiagram />
        <div className="university-heading">
          <span className="mono">Universities I’m considering</span>
          <p>These are university interests, not admissions or affiliations.</p>
        </div>
        <div className="universities">
          {portfolio.universities.map((u) => (
            <figure key={u.short}>
              <img
                src={assetUrl(u.image)}
                alt={u.alt}
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
              <figcaption>
                <span>{u.short}</span>
                <p>{u.name}</p>
                <small>{u.source}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <footer
        id="contact"
        className="contact section-pad"
        aria-labelledby="contact-title"
        tabIndex={-1}
      >
        <h2 id="contact-title">Contact &amp; links</h2>
        <div className="contact-bottom">
          <div>
            <strong>{portfolio.person.name}</strong>
            <p>
              {portfolio.person.role}
              <br />
              {portfolio.person.stage} · {portfolio.person.location}
            </p>
          </div>
          <div>
            <Links />
            {!portfolio.links.email && (
              <p className="contact-pending">
                Contact details and CV will be added here.
              </p>
            )}
          </div>
        </div>
        <div className="footer-meta mono">
          <span>Ishan Dubey · Thailand</span>
          <button
            type="button"
            aria-pressed={motionPaused || reduced || quick}
            onClick={() => setMotionPaused(!motionPaused)}
            disabled={reduced || quick}
          >
            {reduced
              ? 'Reduced motion respected'
              : quick
                ? 'Motion paused in Quick View'
                : motionPaused
                  ? 'Resume motion'
                  : 'Pause motion'}
          </button>
          <a href="#overview">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
