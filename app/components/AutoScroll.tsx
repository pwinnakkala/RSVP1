"use client";

import { useEffect } from "react";

/**
 * AutoScroll — a very gentle idle auto-scroll.
 * Only begins after 60 seconds of NO user activity (no scroll, touch, wheel,
 * key, or pointer movement). Scrolls slowly. Any activity immediately stops
 * it and restarts the 60s idle timer. Stops at the bottom.
 * Respects prefers-reduced-motion.
 */
export default function AutoScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const IDLE_MS = 60000; // 1 minute of inactivity before auto-scroll starts
    const SPEED = 0.25; // px per frame (~15px/sec — very slow)

    let raf = 0;
    let idleTimer: number | undefined;
    let scrolling = false;
    let acc = 0;
    let stopped = false;

    const step = () => {
      if (stopped || !scrolling) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY < max - 1) {
        acc += SPEED;
        if (acc >= 1) {
          const px = Math.floor(acc);
          window.scrollBy(0, px);
          acc -= px;
        }
        raf = window.requestAnimationFrame(step);
      } else {
        scrolling = false; // reached the bottom
      }
    };

    const startScrolling = () => {
      if (stopped || scrolling) return;
      scrolling = true;
      acc = 0;
      raf = window.requestAnimationFrame(step);
    };

    const resetIdle = () => {
      // Any activity: stop auto-scroll and restart the idle countdown
      scrolling = false;
      if (raf) window.cancelAnimationFrame(raf);
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(startScrolling, IDLE_MS);
    };

    // We only treat USER-initiated events as activity. The auto-scroll uses
    // window.scrollBy which also fires 'scroll', so we don't listen to 'scroll'
    // directly — we listen to the input events that indicate a real person.
    const events: (keyof WindowEventMap)[] = [
      "wheel",
      "touchstart",
      "touchmove",
      "keydown",
      "pointerdown",
      "mousemove",
    ];
    events.forEach((e) =>
      window.addEventListener(e, resetIdle, { passive: true })
    );

    resetIdle(); // start the initial 60s countdown

    return () => {
      stopped = true;
      if (raf) window.cancelAnimationFrame(raf);
      if (idleTimer) window.clearTimeout(idleTimer);
      events.forEach((e) => window.removeEventListener(e, resetIdle));
    };
  }, []);

  return null;
}
