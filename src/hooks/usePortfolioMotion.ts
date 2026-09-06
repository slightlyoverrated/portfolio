import { type RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

type MotionRefs = { root: RefObject<HTMLElement | null>; reduced: boolean };

/** Animations decorate visible content. All timelines revert on mode changes and unmount. */
export function usePortfolioMotion({ root, reduced }: MotionRefs) {
  useEffect(() => {
    const element = root.current;
    if (!element || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      anchors: true,
    });
    const drive = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', () => ScrollTrigger.update());
    gsap.ticker.add(drive);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      gsap.utils.toArray<SVGPathElement>('.draw-path').forEach((path) => {
        gsap.fromTo(
          path,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: path.closest('svg'),
              start: 'top 85%',
              end: 'bottom 50%',
              scrub: 0.5,
            },
          },
        );
      });
      gsap.to('.hero-schematic', {
        y: -28,
        rotation: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
      gsap.to('.signal-dot', {
        cy: 94,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      // A single reversible caret follows the document without adding scroll distance.
      const words = Array.from(
        element.querySelectorAll<HTMLElement>('.statement-word'),
      );
      let previous = -1;
      let previousParagraph: Element | null = null;
      gsap.fromTo(
        words,
        { '--reveal': '0%' },
        {
          '--reveal': '100%',
          stagger: 0.04,
          duration: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: '.statement-prose',
            start: 'top 72%',
            end: 'bottom 65%',
            scrub: true,
            onUpdate: (self) => {
              const index = Math.min(
                words.length - 1,
                Math.floor(self.progress * words.length),
              );
              words[previous]?.classList.remove('is-current');
              previousParagraph?.classList.remove('is-active');
              if (self.progress > 0 && self.progress < 1) {
                words[index]?.classList.add('is-current');
                previousParagraph =
                  words[index]?.closest('.statement-paragraph') ?? null;
                previousParagraph?.classList.add('is-active');
              }
              previous = index;
            },
          },
        },
      );
      gsap.fromTo(
        '.pipeline-line i',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.order-demo',
            start: 'top 70%',
            end: 'bottom 45%',
            scrub: true,
          },
        },
      );
      const pipeline = element.querySelector<HTMLElement>('.order-pipeline');
      let orderStage = -1;
      gsap.to('.order-packet', {
        y: () => Math.max(0, (pipeline?.offsetHeight ?? 0) - 40),
        ease: 'none',
        scrollTrigger: {
          trigger: '.order-demo',
          start: 'top 70%',
          end: 'bottom 45%',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(5, Math.floor(self.progress * 6));
            if (next !== orderStage) {
              orderStage = next;
              window.dispatchEvent(
                new CustomEvent('portfolio:order-stage', { detail: next }),
              );
            }
          },
        },
      });
      gsap.from('.order-interface', {
        y: 18,
        rotate: -1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.order-demo',
          start: 'top 85%',
          end: 'center 60%',
          scrub: 0.5,
        },
      });
      gsap.utils.toArray<HTMLElement>('.community-frame').forEach((photo, i) =>
        gsap.from(photo, {
          y: 25,
          rotation: i % 2 ? 4 : -4,
          ease: 'none',
          scrollTrigger: {
            trigger: photo,
            start: 'top 95%',
            end: 'top 65%',
            scrub: 0.6,
          },
        }),
      );
      gsap.from('.build-word', {
        scale: 0.92,
        letterSpacing: '-.03em',
        ease: 'none',
        scrollTrigger: {
          trigger: '.build-word',
          start: 'top 90%',
          end: 'center 65%',
          scrub: 0.5,
        },
      });
      media.add('(min-width: 951px) and (min-height: 700px)', () => {
        ScrollTrigger.create({
          trigger: '.statement-layout',
          start: 'top 115px',
          end: 'bottom bottom',
          pin: '.statement-heading',
          pinSpacing: false,
        });
      });
    }, element);
    const refresh = () => ScrollTrigger.refresh();
    const images = Array.from(element.querySelectorAll('img'));
    images.forEach((img) => img.addEventListener('load', refresh));
    void document.fonts.ready.then(() => {
      if (element.isConnected) refresh();
    });
    return () => {
      media.revert();
      context.revert();
      lenis.destroy();
      gsap.ticker.remove(drive);
      images.forEach((img) => img.removeEventListener('load', refresh));
      element
        .querySelectorAll('.is-current,.is-active')
        .forEach((node) => node.classList.remove('is-current', 'is-active'));
    };
  }, [reduced, root]);
}
