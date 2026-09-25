"use client";

import { useEffect, useState } from "react";

/*
 * Tiny store that tells the page when the intro (preloader) has finished,
 * so hero animations start as the preloader opens up.
 */

let done = false;
const listeners = new Set<() => void>();

const isDone = () => done || document.documentElement.dataset.intro === "skip";

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((listener) => listener());
}

/**
 * `true` once the intro is over. Uses a plain mount effect (not useSyncExternalStore)
 * so components that hydrate late – after the intro already finished – still update.
 */
export function useIntroDone() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const update = () => setIntroDone(isDone());
    listeners.add(update);
    queueMicrotask(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  return introDone;
}
