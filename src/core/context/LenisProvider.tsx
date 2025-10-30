"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const l = new Lenis({ lerp: 0.05, autoResize: true });
    lenisRef.current = l;
    setLenis(l);

    l.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    function raf(time: number) {
      l.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      l.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    const handle = () => lenis?.resize();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [lenis]);

  // useEffect(() => {}, []);

  // const handleTriggerRefresh = useCallback(
  //   debounce(() => ScrollTrigger.refresh(), 100),
  //   []
  // );

  // useEffect(() => {
  //   const handleTriggerRefresh = () => {
  //     ScrollTrigger.refresh(); // recalculates start/end positions
  //   };
  //   window.addEventListener("resize", handleTriggerRefresh);
  //   return () => window.removeEventListener("resize", handleTriggerRefresh);
  // }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
