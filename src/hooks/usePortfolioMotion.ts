'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

type MotionRefs = {
  root: RefObject<HTMLElement | null>;
  statement: string;
  reduced: boolean;
};

export function usePortfolioMotion({ root, statement, reduced }: MotionRefs) {
  useEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const rootEl = root.current;
    const statementNode = rootEl.querySelector<HTMLParagraphElement>('.statement-text');
    const saveNode = rootEl.querySelector<HTMLSpanElement>('.editor-status span:last-child');

    if (reduced) {
      statementNode?.replaceChildren(statement);
      saveNode?.replaceChildren('Saved.');
      return;
    }

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.86 });
    lenis.on('scroll', () => ScrollTrigger.update());
    const driveLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(driveLenis);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.to('.hero-copy', {
        yPercent: -38,
        scale: 0.82,
        opacity: 0.12,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.utils.toArray<HTMLElement>('.destination-card').forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 ? -170 : -95,
          x: index === 0 ? 120 : index === 2 ? -80 : 0,
          rotation: index === 0 ? 10 : index === 2 ? -8 : 0,
          scale: 0.72,
          opacity: 0.18,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: '12% top', end: 'bottom 10%', scrub: true },
        });
      });

      gsap.fromTo('.about-file',
        { scale: 0.56, y: 180, rotation: -4 },
        { scale: 1, y: 0, rotation: 0, ease: 'none', scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: '45% 45%', scrub: true } },
      );

      ScrollTrigger.create({
        trigger: '.statement-section',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.statement-pin',
        onUpdate: ({ progress }) => {
          const typingProgress = Math.min(1, Math.max(0, progress / 0.88));
          const length = Math.floor(statement.length * typingProgress);
          if (statementNode) statementNode.textContent = statement.slice(0, length);
          if (saveNode) {
            saveNode.textContent = progress > 0.965 ? 'Saved.' : progress > 0.9 ? 'Saving…' : `${Math.round(typingProgress * 100)}% written`;
          }
        },
      });

      gsap.to('.timeline-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.timeline-list', start: 'top 72%', end: 'bottom 58%', scrub: true },
      });
      gsap.utils.toArray<HTMLElement>('.commit').forEach((commit) => {
        gsap.from(commit, { x: 70, opacity: 0.15, rotate: 1.5, ease: 'none', scrollTrigger: { trigger: commit, start: 'top 92%', end: 'top 55%', scrub: true } });
      });

      const krungTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.krung-section', start: 'top top', end: 'bottom bottom', scrub: true, pin: '.krung-pin' },
      });
      krungTimeline.fromTo('.krung-browser', { y: 160, scale: 0.72 }, { y: 0, scale: 1, ease: 'power2.out' })
        .to('.krung-shot-main', { scale: 1.08, xPercent: -4, yPercent: -5, ease: 'none' })
        .to('.krung-layer.one', { xPercent: -28, yPercent: -10, rotate: -3 }, '<')
        .to('.krung-layer.two', { xPercent: 26, yPercent: 6, rotate: 4 }, '<')
        .to('.krung-label', { opacity: 1, y: 0, stagger: 0.04 }, '<.1')
        .to('.krung-browser', { xPercent: -28, scale: 0.68, yPercent: 10 })
        .fromTo('.lessons-folder', { opacity: 0, scale: 0.7, x: 120 }, { opacity: 1, scale: 1, x: 0 }, '<');

      gsap.to('.pipeline-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.orderflow-section', start: 'top 70%', end: 'bottom 55%', scrub: true },
      });
      gsap.utils.toArray<HTMLElement>('.flow-node').forEach((node, index) => {
        gsap.fromTo(node, { opacity: 0.25, x: index % 2 ? 50 : -50, scale: 0.88 }, {
          opacity: 1, x: 0, scale: 1, ease: 'none',
          scrollTrigger: { trigger: node, start: 'top 88%', end: 'top 58%', scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.skill-node').forEach((node, index) => {
        gsap.from(node, {
          x: Math.sin(index * 2.1) * 180,
          y: Math.cos(index * 1.7) * 130,
          rotate: (index % 3 - 1) * 12,
          opacity: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: '.skills-orbit', start: 'top 85%', end: 'center 52%', scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.grade-block').forEach((grade, index) => {
        gsap.from(grade, {
          x: (index % 3 - 1) * 95,
          y: (index % 2 ? 1 : -1) * 80,
          rotate: (index % 4 - 2) * 8,
          opacity: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: '.academic-window', start: 'top 88%', end: 'center 48%', scrub: true },
        });
      });

      gsap.fromTo('.archive-items', { scaleY: 0.05, opacity: 0 }, { scaleY: 1, opacity: 1, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '.achievements-section', start: 'top 80%', end: '45% 52%', scrub: true } });

      const values = gsap.utils.toArray<HTMLElement>('.value-statement');
      values.forEach((value, index) => {
        gsap.fromTo(value, { opacity: 0.12, scale: 0.86, y: 80 }, { opacity: 1, scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: value, start: 'top 88%', end: 'center 52%', scrub: true } });
        if (index < values.length - 1) gsap.to(value, { opacity: 0.1, scale: 0.9, scrollTrigger: { trigger: value, start: 'center 42%', end: 'bottom 12%', scrub: true } });
      });

      gsap.to('.future-route', {
        strokeDashoffset: 0,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: { trigger: '.future-section', start: 'top 75%', end: '70% 55%', scrub: true },
      });
      gsap.fromTo('.build-word', { scale: 0.42, opacity: 0.08, letterSpacing: '.4em' }, { scale: 1, opacity: 1, letterSpacing: '-.07em', ease: 'none', scrollTrigger: { trigger: '.build-word', start: 'top 90%', end: 'center 58%', scrub: true } });
    }, rootEl);

    return () => {
      context.revert();
      lenis.destroy();
      gsap.ticker.remove(driveLenis);
    };
  }, [reduced, root, statement]);
}
