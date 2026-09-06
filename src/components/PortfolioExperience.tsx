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
  HeroSchematic,
  KrungDiagram,
  OrderFlowDiagram,
  StatementMotif,
  SubjectDiagram,
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

function Index({ number, label }: { number: string; label: string }) {
  return (
    <p className="section-index mono">
      <span>{number}</span>
      <i />
      {label}
    </p>
  );
}
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
      <div className="section-heading">
        <div>
          <Index number="01" label="CURRENT TRAJECTORY" />
          <h2 id="academics-title">
            Academic <em>profile.</em>
          </h2>
        </div>
        <p>
          {portfolio.person.stage} · A Levels
          <br />
          {portfolio.person.school} in {portfolio.person.location}
        </p>
      </div>
      <div className="subjects">
        {data.subjects.map((s) => (
          <article className="subject" key={s.name}>
            <span className="mono">{s.code}</span>
            <SubjectDiagram kind={s.diagram} />
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <span className="subject-connection">
              <i />
              {s.connection}
            </span>
          </article>
        ))}
      </div>
      <div className="academic-convergence">
        <span className="mono">THREE WAYS OF THINKING</span>
        <span className="convergence-line" />
        <span>{data.destinations.join(' / ')}</span>
      </div>
      <div className="academic-record">
        <div className="igcse-record">
          <div className="record-heading">
            <h3>IGCSE results</h3>
            <span className="mono">{data.igcse.length} SUBJECTS</span>
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
            <span className="mono">FIRST SITTING</span>
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
            <span className="mono">ACADEMIC TRAJECTORY</span>
            <p>{data.trajectory}</p>
          </div>
        </div>
        <div className="exam-record">
          <div>
            <span className="mono">SAT / CONFIRMED</span>
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
      <ol className="academic-path">
        {data.path.map((p, i) => (
          <li key={p} className={i === 2 ? 'current' : ''}>
            <span>
              {i < 2 ? <Check size={12} /> : String(i + 1).padStart(2, '0')}
            </span>
            {p}
            {i === 2 && <small>NOW</small>}
          </li>
        ))}
      </ol>
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
          <Index number="02" label="THE QUESTION BEHIND THE WORK" />
          <h2 id="statement-title">
            Why
            <br />
            <em>engineering?</em>
          </h2>
          <p>
            From getting things to work,
            <br />
            to understanding why they do.
          </p>
          <StatementMotif />
          <span className="mono statement-length">
            PERSONAL STATEMENT / {statementWords} WORDS
          </span>
        </div>
        <article className="statement-paper">
          <div className="paper-toolbar">
            <span>
              <FileText size={16} />
              why_engineering.md
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
            <span>
              {staticMode || full
                ? 'FULL TEXT'
                : 'SCROLL TO FOLLOW THE THOUGHT'}
            </span>
            <span>ISHAN DUBEY / PERSONAL STATEMENT</span>
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
          <Index number="03" label="IDEAS → WORKING SYSTEMS" />
          <h2 id="projects-title">
            Selected <em>work.</em>
          </h2>
        </div>
        <p>
          Ideas I tried turning
          <br />
          into real systems.
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
            {key === 'orderflow' ? <OrderFlowDiagram /> : <KrungDiagram />}
            <div className="case-notes">
              {project.caseStudy.map((c, index) => (
                <div key={c.label}>
                  <span className="mono">
                    0{index + 1} / {c.label}
                  </span>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            <div className="project-tools">
              <span className="mono">WORKED WITH</span>
              {project.technology.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        );
      })}
      <div className="smaller-projects">
        {[portfolio.projects.mitra, portfolio.projects.hardware].map((p, i) => (
          <article key={p.name}>
            <span className="mono">
              0{i + 3} / {p.descriptor}
            </span>
            <h3>
              {p.name}
              <span aria-hidden="true">↗</span>
            </h3>
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
          <Index number="08" label="PEOPLE & CONTRIBUTION" />
          <h2 id="community-title">
            A little beyond <em>myself.</em>
          </h2>
        </div>
        <p>
          Community service
          <br />
          <span className="pending-note">
            Photographs and details to follow.
          </span>
        </p>
      </div>
      <div className="community-board">
        {communityItems.map((item, i) => (
          <figure className="community-frame" key={item.title}>
            <span className="photo-tape" aria-hidden="true" />
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
                <span className="frame-cross">+</span>
                <span className="mono">{item.title}</span>
                <span className="placeholder-index mono">FRAME 0{i + 1}</span>
              </div>
            )}
            <figcaption>
              <span className="mono">
                {item.placeholder
                  ? 'PLACEHOLDER / DETAILS PENDING'
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
        <div className="hero-topline mono">
          <span>PERSONAL PORTFOLIO / ENGINEERING & COMPUTING</span>
          <span>
            <i className="status-dot" />
            {portfolio.person.stage} · {portfolio.person.location}
          </span>
        </div>
        <div className="hero-main">
          <div className="hero-copy">
            <p className="hero-pretitle">Curiosity, put to work.</p>
            <h1 id="hero-title">
              <span>{portfolio.person.firstName}</span>
              <span>
                {portfolio.person.lastName}
                <i>.</i>
              </span>
            </h1>
            <p className="hero-role">{portfolio.person.role}</p>
            <p className="hero-mobile-subjects">
              {portfolio.academics.subjects.map((s) => s.name).join(' · ')}
            </p>
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
          <HeroSchematic />
        </div>
        <div className="hero-bottom">
          <div>
            <span className="mono">CURRENTLY STUDYING</span>
            <p>{portfolio.academics.subjects.map((s) => s.name).join(' · ')}</p>
          </div>
          <p>{portfolio.person.direction}</p>
          <a href="#academics" aria-label="Explore portfolio">
            <ArrowDown />
          </a>
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
          <Index number="04" label="ACADEMIC & TECHNICAL JOURNEY" />
          <h2 id="journey-title">
            One question
            <br />
            leads to <em>another.</em>
          </h2>
          <p>
            From small programming problems
            <br />
            to the systems behind them.
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
              <span className="mono">{item.tag}</span>
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
            <Index number="05" label="EXPERIENCE & ACHIEVEMENTS" />
            <h2 id="experience-title">
              Practice. Progress.
              <br />
              <em>A few milestones.</em>
            </h2>
          </div>
          <span className="achievement-stamp" aria-hidden="true">
            LEARN
            <br />
            BY
            <br />
            DOING ↗
          </span>
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
            <Index number="06" label="THINGS I’VE WORKED WITH" />
            <h2 id="toolkit-title">
              Technical <em>toolkit.</em>
            </h2>
          </div>
          <p>
            Tools become more interesting
            <br />
            when they connect to a project.
          </p>
        </div>
        <div className="toolkit-layers">
          {portfolio.skills.map((group) => (
            <article key={group.group}>
              <div>
                <span className="mono">{group.layer}</span>
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
        <p className="toolkit-hint mono">
          HOVER OR FOCUS A TOOL TO SEE WHERE IT CONNECTS.
        </p>
      </section>
      <section
        id="activities"
        className="activities section-pad"
        aria-labelledby="activities-title"
        tabIndex={-1}
      >
        <div className="section-heading">
          <div>
            <Index number="07" label="ACTIVITIES & RESPONSIBILITY" />
            <h2 id="activities-title">
              Beyond <em>the IDE.</em>
            </h2>
          </div>
          <p>
            Some lessons need
            <br />a different kind of classroom.
          </p>
        </div>
        <div className="activity-layout">
          <div className="activity-typography" aria-hidden="true">
            <span>show up.</span>
            <span>listen.</span>
            <span>contribute.</span>
            <i>↗</i>
          </div>
          <div className="activity-notes">
            {portfolio.activities.map((a) => (
              <article key={a.title}>
                <span className="mono">{a.theme}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Community />
      <section className="outside section-pad" aria-labelledby="outside-title">
        <span className="afk-label mono">09 / OUTSIDE THE SCREEN</span>
        <h2 id="outside-title">{portfolio.outside.title}</h2>
        <p>{portfolio.outside.text}</p>
        <div className="outside-notes mono">
          {portfolio.outside.notes.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </section>
      <section
        id="future"
        className="future section-pad"
        aria-labelledby="future-title"
        tabIndex={-1}
      >
        <div className="section-heading">
          <div>
            <Index number="10" label="WHAT’S NEXT?" />
            <h2 id="future-title">
              Different paths.
              <br />
              <em>One direction.</em>
            </h2>
          </div>
          <p>{portfolio.future.text}</p>
        </div>
        <FutureDiagram />
        <div className="build-word" aria-hidden="true">
          BUILD<span>.</span>
        </div>
        <div className="university-heading">
          <span className="mono">INSTITUTIONS OF INTEREST</span>
          <p>
            Possible destinations for the next chapter.
            <br />
            Interests, not admission or affiliation.
          </p>
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
        <Index number="11" label="LET’S KEEP THE CONVERSATION GOING" />
        <h2 id="contact-title">
          Thanks for
          <br />
          <em>exploring.</em>
          <span>↗</span>
        </h2>
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
          <span>BUILT WITH CURIOSITY / THAILAND</span>
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
