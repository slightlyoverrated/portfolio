'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Bell,
  Box,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleUserRound,
  Command as CommandIcon,
  Cpu,
  Download,
  FileArchive,
  FileCode2,
  FileText,
  Folder,
  FolderOpen,
  GitCommitHorizontal,
  Globe2,
  GraduationCap,
  Link2,
  Mail,
  Mic,
  PackageCheck,
  ReceiptText,
  RefreshCw,
  Save,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TerminalSquare,
  Trophy,
  Truck,
  X,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { portfolio } from '@/src/data/portfolio';
import { usePortfolioMotion } from '@/src/hooks/usePortfolioMotion';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

const sections = [
  ['hello', 'Hello'],
  ['about', 'About'],
  ['statement', 'Statement'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['academics', 'Academics'],
  ['future', 'Next'],
] as const;

const flowIcons = [ShoppingBag, Link2, CircleUserRound, ReceiptText, Truck];

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

function WindowBar({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div className={`window-bar${dark ? ' window-bar-dark' : ''}`}>
      <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
      <span>{title}</span>
      <span className="window-status">ISHAN.OS</span>
    </div>
  );
}

function SectionIndex({ number, label }: { number: string; label: string }) {
  return <p className="section-index"><span>{number}</span> / {label}</p>;
}

function LogoMark() {
  return <span className="wordmark-mark" aria-hidden="true"><i /><i /></span>;
}

export function PortfolioExperience() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('Hello');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('Try “help” or “whoami”.');
  const statement = useMemo(() => portfolio.personalStatement.join('\n\n'), []);

  usePortfolioMotion({ root, statement, reduced });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = total > 0 ? Math.min(100, Math.round((window.scrollY / total) * 100)) : 0;
      setProgress(nextProgress);

      const marker = window.innerHeight * 0.34;
      let current = 'Hello';
      for (const [id, label] of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= marker) current = label;
      }
      setActiveSection(current);
      document.title = `Ishan — ${current}`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const jumpTo = (id: string) => {
    setPaletteOpen(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }), 30);
  };

  const runTerminal = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    const responses: Record<string, string> = {
      help: "Try scrolling. That’s kind of the whole point.",
      whoami: 'Ishan — student / programmer / builder',
      projects: 'KRUNG, OrderFlow and Mitra. See ~/projects above.',
      build: 'Good command. Still working on that one.',
    };
    setTerminalOutput(responses[command] ?? `Command not found: ${command || '…'}`);
    setTerminalInput('');
  };

  return (
    <main ref={root}>
      <a className="skip-link" href="#about">Skip to main content</a>

      <div className="boot-screen" aria-hidden="true">
        <div className="boot-mark"><LogoMark /> ISHAN.OS</div>
        <div className="boot-track"><span /></div>
        <div className="boot-messages">
          <span>Loading curiosity…</span>
          <span>Loading questionable amounts of code…</span>
          <span>Loading future engineer…</span>
        </div>
      </div>

      <header className="site-nav">
        <a className="wordmark" href="#hello" aria-label="Ishan — back to the beginning"><LogoMark />ISHAN.OS</a>
        <nav aria-label="Portfolio sections">
          {sections.filter(([, label]) => ['Hello', 'About', 'Projects', 'Academics'].includes(label)).map(([id, label]) => (
            <a className={activeSection === label ? 'active' : ''} href={`#${id}`} key={id}>{label}</a>
          ))}
        </nav>
        <Button className="command-key" variant="outline" onClick={() => setPaletteOpen(true)} aria-label="Open command palette">
          <CommandIcon aria-hidden="true" /><span>Ctrl K</span>
        </Button>
      </header>

      <aside className="global-progress" aria-label={`Application explored — ${progress}%`}>
        <span>application explored</span>
        <div><i style={{ width: `${progress}%` }} /></div>
        <strong>{String(progress).padStart(3, '0')}%</strong>
      </aside>

      <section className="hero" id="hello" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <p className="eyebrow"><Sparkles aria-hidden="true" /> Application workspace · Bangkok</p>
        <div className="hero-copy">
          <p className="hero-kicker">somewhere between here…</p>
          <h1 id="hero-title">Hi, I’m <em>Ishan.</em></h1>
          <p className="hero-role">Student. Programmer. Builder. <span>Future Engineer.</span></p>
          <p className="hero-intro">{portfolio.person.intro}</p>
        </div>

        <div className="destination-stage" aria-label="University destinations Ishan is interested in">
          {portfolio.universities.map((university, index) => (
            <figure className={`destination-card destination-${index + 1}`} key={university.short}>
              <div className="destination-photo">
                {/* Static Vite output serves these local files directly; no runtime image service is available or needed. */}
                {/* oxlint-disable-next-line next/no-img-element */}
                <img
                  src={assetUrl(university.image)}
                  alt={university.alt}
                  sizes="(max-width: 560px) 58vw, (max-width: 900px) 47vw, 336px"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span>ASPIRATION · NOT AFFILIATION</span>
              </div>
              <figcaption>
                <div><span>{String(index + 1).padStart(2, '0')} · DESTINATION</span><strong>{university.short}</strong></div>
                <p>{university.name}</p>
                <small>{university.focus}</small>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="hero-tags" aria-label="Areas of interest">
          {['Bangkok', 'Engineering', 'AI', 'Robotics', 'Computer Engineering'].map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <p className="hero-outro">…and whatever I build next.</p>
        <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ArrowDown aria-hidden="true" /></a>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="desktop-icons" aria-hidden="true">
          <div><Folder /><span>ideas</span></div>
          <div><FileCode2 /><span>build.py</span></div>
          <div><RefreshCw /><span>try_again</span></div>
        </div>
        <div className="about-file app-window">
          <WindowBar title="ishan_about_me.txt" />
          <div className="about-window-body">
            <div className="file-meta">
              <FileText aria-hidden="true" />
              <span>LAST MODIFIED: CONTINUOUSLY</span>
            </div>
            <SectionIndex number="01" label="WHO IS THIS?" />
            <h2 id="about-title">I turn ideas into <em>working systems.</em></h2>
            <div className="bio-columns">
              {portfolio.person.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="about-status"><span className="status-light" /> Current mode: learning by building</div>
          </div>
        </div>
      </section>

      <section className="statement-section" id="statement" aria-labelledby="statement-title">
        <div className="statement-pin">
          <div className="statement-window app-window">
            <WindowBar title="why_engineering.md" />
            <div className="editor-layout">
              <aside aria-hidden="true"><span>EXPLORER</span><p><ChevronRight /> application</p><p className="selected"><FileText /> why_engineering.md</p><p><FileText /> curiosity.log</p><p><Folder /> systems</p></aside>
              <article>
                <div className="editor-tabs"><span><FileText /> why_engineering.md <X /></span></div>
                <div className="editor-breadcrumb">application <ChevronRight /> writing <ChevronRight /> why_engineering.md</div>
                <h2 id="statement-title"><span>#</span> Why engineering?</h2>
                <p className="statement-text" aria-label={statement} />
                <span className="typing-caret" aria-hidden="true" />
              </article>
            </div>
            <footer className="editor-status"><span><GitCommitHorizontal /> main*</span><span><Check /> scroll-synced</span><span>0% written</span></footer>
          </div>
          <div className="save-transition" aria-hidden="true"><Save /><span>CTRL + S</span></div>
        </div>
      </section>

      <section className="timeline-section" id="experience" aria-labelledby="experience-title">
        <div className="section-shell timeline-shell">
          <div className="timeline-heading">
            <SectionIndex number="02" label="EXPERIENCE.LOG" />
            <h2 id="experience-title">One commit<br />{' '}at a time.</h2>
            <p>No dates invented. Just a record of how small experiments became larger systems.</p>
          </div>
          <div className="timeline-list">
            <div className="timeline-line"><span className="timeline-fill" /></div>
            {portfolio.timeline.map((item, index) => (
              <article className="commit" key={item.commit}>
                <span className="commit-node"><GitCommitHorizontal aria-hidden="true" /></span>
                <div className="commit-top"><code>{item.commit}</code><span>{item.tag}</span></div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <small>{String(index + 1).padStart(2, '0')} / {String(portfolio.timeline.length).padStart(2, '0')}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-index" id="projects" aria-labelledby="projects-title">
        <SectionIndex number="03" label="PROJECTS" />
        <div className="project-index-head">
          <h2 id="projects-title"><code>~/projects</code></h2>
          <p>Three folders. Two product-sized rabbit holes. Plenty of lessons.</p>
        </div>
        <div className="project-folders">
          {Object.values(portfolio.projects).map((project, index) => (
            <a href={`#project-${project.name.toLowerCase()}`} className={`project-folder folder-${index + 1}`} key={project.name}>
              <span className="folder-back" /><span className="folder-sheet">{index === 0 ? 'case_study.pdf' : index === 1 ? 'system_flow.map' : 'assistant.py'}</span><span className="folder-front" />
              <strong>{project.name}</strong><small>{project.descriptor}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="krung-section" id="project-krung" aria-labelledby="krung-title">
        <div className="krung-pin">
          <div className="krung-intro">
            <span className="project-number">PROJECT / 01</span>
            <h2 id="krung-title">KRUNG</h2>
            <p>{portfolio.projects.krung.summary}</p>
          </div>
          <div className="krung-browser app-window">
            <div className="browser-bar">
              <div className="window-dots"><i /><i /><i /></div>
              <div className="browser-address"><ShieldCheck /> krung.news <RefreshCw /></div>
              <ArrowUpRight />
            </div>
            <div className="krung-shot">
              <div className="krung-shot-main krung-layer one">
                <div className="krung-mast"><strong>KRUNG</strong><span>THAILAND, EXPLAINED.</span></div>
                <div className="krung-story-copy"><span>THE BIG STORY</span><h3>Understand the story,<br />{' '}not just the headline.</h3><p>Context, sources and the people shaping what happens next.</p></div>
                <div className="mock-headlines"><i /><i /><i /></div>
              </div>
              <div className="krung-layer two receipts-panel"><span>SOURCES / RECEIPTS</span>{[1,2,3].map((n) => <p key={n}><Check /> Source {n} verified</p>)}</div>
              <div className="krung-label label-one">01 · CONTEXT</div>
              <div className="krung-label label-two">02 · EVIDENCE</div>
              <div className="krung-label label-three">03 · CLARITY</div>
            </div>
          </div>
          <aside className="lessons-folder">
            <div className="lessons-tab"><FolderOpen /> lessons_learned</div>
            <div className="lessons-body">
              {portfolio.projects.krung.lessons.map((lesson, index) => <p key={lesson}><span>0{index + 1}</span>{lesson}</p>)}
              <div className="lesson-tools">{portfolio.projects.krung.learned.map((item) => <small key={item}>{item}</small>)}</div>
            </div>
          </aside>
        </div>
      </section>

      <section className="orderflow-section" id="project-orderflow" aria-labelledby="orderflow-title">
        <div className="orderflow-shell">
          <header className="orderflow-heading">
            <div><span className="project-number">PROJECT / 02</span><h2 id="orderflow-title">OrderFlow</h2></div>
            <div><p>{portfolio.projects.orderflow.summary}</p><small>{portfolio.projects.orderflow.note}</small></div>
          </header>
          <div className="flow-system">
            <div className="pipeline-track"><span className="pipeline-fill" /></div>
            {portfolio.projects.orderflow.stages.map((stage, index) => {
              const Icon = flowIcons[index];
              return (
                <article className="flow-node" key={stage}>
                  <div className="flow-index">0{index + 1}</div>
                  <div className="flow-icon"><Icon aria-hidden="true" /></div>
                  <div><span>STATUS: {index === 4 ? 'READY' : 'PASSING'}</span><h3>{stage}</h3><p>{['Create a product with variants and inventory.', 'Share one storefront-first product link.', 'A mobile checkout designed for real customers.', 'Automatically organise the order for the seller.', 'Move clearly from paid to completed.'][index]}</p></div>
                  <Check className="flow-check" aria-hidden="true" />
                </article>
              );
            })}
            <div className="parcel" aria-hidden="true"><Box /><span>ORD-0142</span></div>
          </div>
          <div className="orderflow-foot">
            <div>{portfolio.projects.orderflow.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
            <p><Zap /> What I worked with: {portfolio.projects.orderflow.technology.join(' · ')}</p>
          </div>
        </div>
      </section>

      <section className="mitra-section" id="project-mitra" aria-labelledby="mitra-title">
        <div className="mitra-window">
          <WindowBar title="Mitra Assistant — Python" dark />
          <div className="mitra-body">
            <aside><strong>M</strong><button aria-label="Microphone"><Mic /></button><button aria-label="Reminders"><Bell /></button><button aria-label="Quick launch"><Zap /></button></aside>
            <article>
              <span className="project-number">PROJECT / 03</span>
              <h2 id="mitra-title">Hello, I’m Mitra.</h2>
              <p>{portfolio.projects.mitra.summary}</p>
              <div className="mitra-chat"><span>M</span><p>Small experiment. Big “what if?” energy.<i>now</i></p></div>
              <div className="mitra-actions">{portfolio.projects.mitra.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
            </article>
          </div>
        </div>
      </section>

      <section className="skills-section" aria-labelledby="skills-title">
        <div className="skills-copy"><SectionIndex number="04" label="TOOLS I’VE WORKED WITH" /><h2 id="skills-title">What I actually do.</h2><p>No percentages. No “mastered” badges. Just tools I have used to turn ideas into systems.</p></div>
        <div className="skills-orbit">
          <div className="orbit-core"><Cpu /><strong>BUILD</strong><span>learn · test · repeat</span></div>
          {portfolio.skills.flatMap((group, groupIndex) => group.items.map((item, itemIndex) => (
            <span className={`skill-node skill-g${groupIndex + 1}`} style={{ '--index': portfolio.skills.slice(0, groupIndex).reduce((total, previous) => total + previous.items.length, 0) + itemIndex } as React.CSSProperties} key={`${group.group}-${item}`}><i />{item}</span>
          )))}
          <div className="skill-legend">{portfolio.skills.map((group, index) => <span key={group.group}><i className={`legend-${index + 1}`} />{group.group}</span>)}</div>
        </div>
      </section>

      <section className="academics-section" id="academics" aria-labelledby="academics-title">
        <div className="academic-file-icon" aria-hidden="true"><FileText /><span>academic_record.pdf</span></div>
        <div className="academic-window app-window">
          <WindowBar title="academic_record.pdf — verified data" />
          <div className="academic-header">
            <div><SectionIndex number="05" label="SYSTEM INFORMATION" /><h2 id="academics-title">Academic record.</h2></div>
            <div className="student-chip"><span>YEAR 13</span><strong>MATHEMATICS · PHYSICS · COMPUTER SCIENCE</strong></div>
          </div>
          <div className="academic-grid">
            <section>
              <div className="record-title"><h3>IGCSE results</h3><span>7 subjects</span></div>
              <div className="grade-grid">{portfolio.academics.igcse.map((result) => <div className="grade-block" key={result.subject}><span>{result.subject}</span><strong>{result.grade}</strong></div>)}</div>
            </section>
            <section className="alevel-record">
              <div className="record-title"><h3>International A Levels</h3><span>Current AS record</span></div>
              <div className="alevel-list">{portfolio.academics.aLevels.map((result) => <div className="grade-block current-grade" key={result.subject}><span><i />{result.subject}</span><strong>{result.grade}</strong></div>)}</div>
              <div className="recovery-note"><RefreshCw /><p><strong>Recovery in progress.</strong>{portfolio.academics.recovery}</p></div>
            </section>
          </div>
          <div className="academic-path">{portfolio.academics.path.map((step, index) => <div className={index === 2 ? 'active' : ''} key={step}><i>{index < 2 ? <Check /> : index === 2 ? <RefreshCw /> : index + 1}</i><span>{step}</span></div>)}</div>
          <div className="testing-strip">
            <div><span>SAT</span><strong>{portfolio.academics.exams.sat.total}</strong><small>Math {portfolio.academics.exams.sat.math} · R&amp;W {portfolio.academics.exams.sat.readingWriting}</small></div>
            <div><span>IELTS</span><strong>—</strong><small>{portfolio.academics.exams.ielts.status}</small></div>
            <div className="academic-connect"><span>MATHEMATICS + PHYSICS + CS</span><ChevronRight /><strong>ENGINEERING · AI · ROBOTICS</strong></div>
          </div>
        </div>
      </section>

      <section className="achievements-section" aria-labelledby="achievements-title">
        <div className="archive-shell">
          <div className="archive-title"><FileArchive /><div><SectionIndex number="06" label="ARCHIVE" /><h2 id="achievements-title">achievements.zip</h2><p>Credible by design. No inflated participation. No invented metrics.</p></div><span>DECOMPRESSING…</span></div>
          <div className="archive-items">{portfolio.achievements.map((item, index) => <article key={item.title}><div className="archive-icon">{index === 0 ? <Trophy /> : index === 1 ? <FileText /> : index === 2 ? <BrainCircuit /> : index === 3 ? <GraduationCap /> : <FileCode2 />}</div><span>{item.type}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
        </div>
      </section>

      <section className="offline-section" aria-labelledby="offline-title">
        <div className="offline-heading"><span>ESC</span><h2 id="offline-title">offline.exe</h2><p>Because not every useful lesson happens behind a screen.</p></div>
        <div className="scrapbook">
          {portfolio.offline.map((item, index) => <article className={`scrap scrap-${index + 1}`} key={item.label}><div className="scrap-tape" /><div className="personal-placeholder"><span>PERSONAL PHOTO SLOT</span></div><strong>{item.label}</strong><p>{item.text}</p></article>)}
          <div className="scrap-sticker sticker-one">AFK,<br />still learning.</div>
          <div className="scrap-sticker sticker-two">THAILAND<br />→ WORLD</div>
        </div>
      </section>

      <section className="values-section" aria-label="Ishan's values">
        {portfolio.values.map((value, index) => <article className={`value-statement value-${index + 1}`} key={value.title}><span>0{index + 1}</span><h2>{value.title}</h2><p>{value.text}</p></article>)}
      </section>

      <section className="future-section" id="future" aria-labelledby="future-title">
        <div className="future-heading"><SectionIndex number="07" label="/NEXT" /><h2 id="future-title">Different paths.<br />{' '}<em>One direction.</em></h2><p>{portfolio.future.question}</p></div>
        <div className="future-map">
          <svg aria-hidden="true" viewBox="0 0 1000 660" preserveAspectRatio="none">
            <path className="future-route route-1" pathLength="1" d="M25 80 C 230 80, 180 330, 500 330 S 760 330, 970 330" />
            <path className="future-route route-2" pathLength="1" d="M25 200 C 250 200, 240 330, 500 330" />
            <path className="future-route route-3" pathLength="1" d="M25 330 L 500 330 L 970 330" />
            <path className="future-route route-4" pathLength="1" d="M25 460 C 250 460, 240 330, 500 330" />
            <path className="future-route route-5" pathLength="1" d="M25 580 C 230 580, 180 330, 500 330" />
            <circle cx="500" cy="330" r="16" />
          </svg>
          <div className="future-labels">{portfolio.future.paths.map((path, index) => <span style={{ '--row': index } as React.CSSProperties} key={path}><i />{path}</span>)}</div>
          <div className="future-destination"><span>destination</span><strong>SYSTEMS THAT MATTER</strong></div>
        </div>
        <div className="build-word">BUILD.</div>
      </section>

      <footer className="final-section" aria-labelledby="final-title">
        <div className="final-window app-window">
          <WindowBar title="application_complete.app" />
          <div className="final-body">
            <div className="complete-icon"><Check /></div>
            <p>APPLICATION SUCCESSFULLY EXPLORED · NO INSTALLATION REQUIRED</p>
            <h2 id="final-title">Thanks for<br />{' '}<em>exploring.</em></h2>
            <div className="final-person"><strong>Ishan</strong><span>Student · Programmer · Builder</span></div>
            <div className="final-links">
              {portfolio.links.github && <a href={portfolio.links.github} target="_blank" rel="noreferrer"><FileCode2 />GitHub<ArrowUpRight /></a>}
              <a href={portfolio.links.krung} target="_blank" rel="noreferrer"><Globe2 />KRUNG<ArrowUpRight /></a>
              {portfolio.links.orderflow && <a href={portfolio.links.orderflow} target="_blank" rel="noreferrer"><PackageCheck />OrderFlow<ArrowUpRight /></a>}
              {portfolio.links.email && <a href={`mailto:${String(portfolio.links.email)}`}><Mail />Email<ArrowUpRight /></a>}
              {portfolio.links.cv && <a href={portfolio.links.cv}><Download />CV / PDF<ArrowUpRight /></a>}
            </div>
            {Object.values(portfolio.links).filter(Boolean).length < 3 && <p className="link-placeholder-note">More links can be added from <code>src/data/portfolio.ts</code>.</p>}
          </div>
        </div>
        <div className="tiny-terminal">
          <div><TerminalSquare /><span>tiny_terminal</span><i /><i /><i /></div>
          <p>{terminalOutput}</p>
          <form onSubmit={runTerminal}><label htmlFor="terminal-command">ishan@portfolio ~ %</label><input id="terminal-command" value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} autoComplete="off" aria-label="Enter a tiny terminal command" /><Button type="submit" size="xs" className="terminal-run">Run</Button></form>
        </div>
        <div className="footer-meta"><span>ISHAN.OS © 2026</span><a href="#hello">Back to top <ArrowDown /></a><span>BUILT IN THAILAND</span></div>
      </footer>

      <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen} title="Jump through Ishan's application" description="Choose a portfolio section">
        <Command className="portfolio-command">
          <CommandInput placeholder="Where should we go?" />
          <CommandList>
            <CommandEmpty>No section found.</CommandEmpty>
            <CommandGroup heading="Application map">
              {sections.map(([id, label], index) => (
                <CommandItem key={id} value={label} onSelect={() => jumpTo(id)}>
                  <span className="command-number">{String(index + 1).padStart(2, '0')}</span>
                  {label}
                  <CommandShortcut>↵</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </main>
  );
}
