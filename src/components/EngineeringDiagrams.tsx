import { useEffect, useState } from 'react';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { portfolio } from '@/src/data/portfolio';

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
        <span>Order workflow</span>
        <span>Six connected steps</span>
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
        <div className="order-stage-note" aria-live="polite">
          <span className="mono">
            Step {selected + 1} of {project.stages.length}
          </span>
          <h4>{stage.name}</h4>
          <p>{stage.detail}</p>
          <small>
            This is a workflow explanation. Actual interface screenshots are
            still to be added.
          </small>
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
        <span>How information is organised</span>
        <span>Content relationships</span>
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
        </svg>
        <div className="central-story">
          <span className="mono">KRUNG</span>
          <strong>Storyline</strong>
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
