import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Box,
  Cpu,
  GitBranch,
  Radio,
  Terminal,
} from 'lucide-react';
import { portfolio } from '@/src/data/portfolio';

export function SubjectDiagram({ kind }: { kind: string }) {
  return (
    <svg
      className={`subject-diagram diagram-${kind}`}
      viewBox="0 0 320 130"
      aria-hidden="true"
    >
      {kind === 'math' ? (
        <>
          <path className="axis" d="M20 105H300M45 120V10" />
          <path
            className="draw-path"
            pathLength="1"
            d="M25 100C75 110 87 15 135 26S190 123 235 63S273 17 300 27"
          />
          <circle className="diagram-point" cx="135" cy="26" r="5" />
          <text x="254" y="115">
            x
          </text>
          <text x="57" y="20">
            f(x)
          </text>
        </>
      ) : kind === 'physics' ? (
        <>
          <circle className="axis" cx="154" cy="66" r="47" />
          <path className="axis" d="M50 109H280M154 119V8M154 66H225V20" />
          <path
            className="draw-path"
            pathLength="1"
            d="M154 66L225 20M210 22L225 20L220 35"
          />
          <path className="vector-component" d="M154 66H224M224 66V21" />
          <circle cx="154" cy="66" r="5" />
          <text x="237" y="31">
            F
          </text>
          <text x="181" y="83">
            Fₓ
          </text>
          <text x="234" y="60">
            Fᵧ
          </text>
        </>
      ) : (
        <>
          <path
            className="draw-path"
            pathLength="1"
            d="M40 34H100L137 65H210L245 32H285M40 98H100L137 65M210 65L245 98H285"
          />
          {[
            [40, 34],
            [40, 98],
            [137, 65],
            [210, 65],
            [285, 32],
            [285, 98],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />
          ))}
          <rect x="140" y="42" width="45" height="45" rx="7" />
          <text x="147" y="70">
            01
          </text>
        </>
      )}
    </svg>
  );
}

export function HeroSchematic() {
  return (
    <div
      className="hero-schematic"
      aria-label="Connected interests: code, mathematics and physical systems"
    >
      <div className="schematic-label mono">FIG. 01 — A WORK IN PROGRESS</div>
      <svg viewBox="0 0 500 450" aria-hidden="true">
        <g className="schematic-guides">
          <circle cx="250" cy="225" r="164" />
          <circle cx="250" cy="225" r="112" />
          <path d="M20 225H480M250 10V440M92 67L408 383M92 383L408 67" />
        </g>
        <g className="hero-traces">
          <path
            className="draw-path"
            pathLength="1"
            d="M250 225H170L130 185V94H58M250 225H330L375 180V74H443M250 225V313L304 365H435M250 225H169L105 289V366H43"
          />
        </g>
        <g className="chip">
          <rect x="191" y="166" width="118" height="118" rx="22" />
          <rect x="202" y="177" width="96" height="96" rx="16" />
          {[207, 225, 243, 261, 279].map((n) => (
            <path
              key={n}
              d={`M180 ${n}H191M309 ${n}H320M${n} 155V166M${n} 284V295`}
            />
          ))}
          <text x="250" y="233" textAnchor="middle">
            ID
          </text>
        </g>
        <g className="schematic-terminals">
          {[
            [58, 94],
            [443, 74],
            [435, 365],
            [43, 366],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="6" />
          ))}
        </g>
        <g className="schematic-note">
          <text x="39" y="74">
            SOFTWARE
          </text>
          <text x="348" y="53">
            MATHEMATICS
          </text>
          <text x="350" y="393">
            PHYSICAL SYSTEMS
          </text>
          <text x="23" y="397">
            CURIOSITY
          </text>
        </g>
        <circle className="signal-dot" cx="130" cy="150" r="5" />
      </svg>
      <div className="schematic-foot">
        <span>
          <i /> ALWAYS LEARNING
        </span>
        <span>INPUT → IDEA → BUILD</span>
      </div>
    </div>
  );
}

export function OrderFlowDiagram() {
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const update = (event: Event) =>
      setSelected((event as CustomEvent<number>).detail);
    window.addEventListener('portfolio:order-stage', update);
    return () => window.removeEventListener('portfolio:order-stage', update);
  }, []);
  const project = portfolio.projects.orderflow;
  const stage = project.stages[selected];
  return (
    <div className="order-demo">
      <div className="demo-caption mono">
        <span>SYSTEM WALKTHROUGH</span>
        <span>ILLUSTRATIVE INTERFACE</span>
      </div>
      <div className="order-demo-body">
        <div
          className="order-pipeline"
          aria-label="Explore the OrderFlow workflow"
        >
          <div className="pipeline-line">
            <i />
          </div>
          <span className="order-packet" aria-hidden="true" />
          {project.stages.map((item, index) => (
            <button
              type="button"
              key={item.name}
              onClick={() => setSelected(index)}
              className={index === selected ? 'selected' : ''}
              aria-pressed={selected === index}
            >
              <span className="stage-dot">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{item.name}</span>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
        <div className="order-interface" aria-live="polite">
          <div className="interface-brand">
            <Box size={18} />
            <strong>OrderFlow</strong>
            <span>TH / EN</span>
          </div>
          <div className="interface-content" key={stage.name}>
            <span className="mono">
              {String(selected + 1).padStart(2, '0')} / {project.stages.length}{' '}
              · WORKFLOW
            </span>
            <h4>{stage.view}</h4>
            <p>{stage.detail}</p>
            <div className="interface-fields">
              {stage.fields.map((field, i) => (
                <div key={field}>
                  <span>{field}</span>
                  <i>{i === 2 ? '↗' : '—'}</i>
                </div>
              ))}
            </div>
            <div className="interface-next">
              <span>
                {selected === 5
                  ? 'The loop, connected.'
                  : 'One step in a connected system.'}
              </span>
              <Box size={18} />
            </div>
          </div>
        </div>
      </div>
      <p className="demo-hint">Select a stage to follow the order.</p>
    </div>
  );
}

export function KrungDiagram() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="krung-demo">
      <div className="demo-caption mono">
        <span>CONTEXT, CONNECTED</span>
        <span>CONCEPTUAL MAP</span>
      </div>
      <div className="context-network">
        <svg
          viewBox="0 0 600 310"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="draw-path"
            pathLength="1"
            d="M300 155L95 55M300 155L505 55M300 155L95 245M300 155L505 245"
          />
          <circle cx="300" cy="155" r="98" />
        </svg>
        <div className="central-story">
          <span className="mono">THAILAND / STORYLINE</span>
          <strong>
            What happened.
            <br />
            <em>And why it matters.</em>
          </strong>
        </div>
        {portfolio.projects.krung.nodes.map((node, i) => (
          <button
            type="button"
            key={node.name}
            className={`context-node node-${i} ${selected === i ? 'selected' : ''}`}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <i />
            {node.name}
          </button>
        ))}
      </div>
      <div className="context-note" aria-live="polite">
        <span className="mono">
          0{selected + 1} / {portfolio.projects.krung.nodes[selected].name}
        </span>
        <p>{portfolio.projects.krung.nodes[selected].detail}</p>
      </div>
    </div>
  );
}

export function StatementMotif() {
  return (
    <div className="statement-motif" aria-hidden="true">
      <Terminal />
      <span>software</span>
      <GitBranch />
      <span>systems</span>
      <Radio />
      <span>physics</span>
      <Cpu />
      <span>hardware / AI</span>
    </div>
  );
}

export function FutureDiagram() {
  return (
    <div
      className="future-diagram"
      aria-label="Mathematics, Physics and Computer Science lead toward Computer Engineering, then AI, Robotics, Secure systems and Software"
    >
      <div className="future-inputs">
        {portfolio.academics.subjects.map((s) => (
          <span key={s.name}>{s.name}</span>
        ))}
      </div>
      <svg
        className="future-wires"
        viewBox="0 0 800 270"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="draw-path"
          pathLength="1"
          d="M0 30H75L180 135H400M0 135H400M0 240H75L180 135M400 135H550L690 25H800M550 135L690 98H800M550 135L690 172H800M550 135L690 245H800"
        />
      </svg>
      <div className="future-core">
        <Cpu />
        <span>{portfolio.future.destination}</span>
      </div>
      <div className="future-outputs">
        {portfolio.future.paths.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
    </div>
  );
}
