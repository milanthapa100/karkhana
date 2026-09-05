"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Signal = { start: () => void; complete: () => void };

const SignalCtx = createContext<Signal>({
  start: () => {},
  complete: () => {},
});

export function useNavigationSignal(): Signal {
  return useContext(SignalCtx);
}

/**
 * Drives a genuinely real top loading bar. Client-side navigation causes the
 * nearest `loading.tsx` boundary to mount (adds a segment to the Suspense
 * boundary). Those boundaries call `useNavigationSignal().start()` on mount and
 * `complete()` on unmount, so the bar advances only while real data is loading
 * and finishes exactly when the new page has streamed in.
 */
export function NavigationProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const setLive = useCallback((value: number) => {
    progressRef.current = value;
    setProgress(value);
  }, []);

  const stopAnimation = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    isAnimatingRef.current = false;
  }, []);

  const animate = useCallback(
    (target: number, duration: number, onDone?: () => void) => {
      stopAnimation();
      isAnimatingRef.current = true;
      const startVal = progressRef.current;
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        setLive(startVal + (target - startVal) * (0.3 + 0.7 * t));
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          isAnimatingRef.current = false;
          setLive(target);
          onDone?.();
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [setLive, stopAnimation],
  );

  const start = useCallback(() => {
    stopAnimation();
    if (hideTimer.current !== null) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setVisible(true);
    setLive(10);
    isAnimatingRef.current = true;
    rafRef.current = requestAnimationFrame(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        if (!isAnimatingRef.current) return;
        const t = (now - t0) / 6000;
        const next = 10 + 75 * (1 - Math.exp(-t));
        setLive(next);
        if (next < 85) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          isAnimatingRef.current = false;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    });
  }, [setLive, stopAnimation]);

  const complete = useCallback(() => {
    stopAnimation();
    if (hideTimer.current !== null) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    animate(100, 180, () => {
      hideTimer.current = setTimeout(() => {
        setVisible(false);
        setLive(0);
        hideTimer.current = null;
      }, 250);
    });
  }, [animate, setLive, stopAnimation]);

  useEffect(
    () => () => {
      stopAnimation();
      if (hideTimer.current !== null) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    },
    [stopAnimation],
  );

  const signal = useMemo(() => ({ start, complete }), [start, complete]);

  return (
    <SignalCtx.Provider value={signal}>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-0.5 w-full bg-transparent"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 250ms" }}
      >
        <div
          className="h-full origin-left bg-brand-500"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
      {children}
    </SignalCtx.Provider>
  );
}
