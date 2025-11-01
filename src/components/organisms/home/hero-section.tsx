"use client";

import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import { useEffect, useRef } from "react";

function HerroSection() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const elements = triggerRef.current.querySelectorAll(".initial-text");

    const timelines = Array.from(elements).map(i =>
      animateFloat(i, { duration: [3, 5], intensity: [1, 1.5] })
    );

    return () => cleanupFloatAnimation(timelines);
  }, []);

  return (
    <section
      ref={triggerRef}
      className="min-h-screen relative"
    >
      <Headline className="absolute top-24 left-1/2 -translate-x-1/2">
        Привет, я
      </Headline>
      <Container className="min-h-screen select-none">
        <h1 className="flex justify-center gap-12 flex-col text-[15rem] font-bold w-full min-h-screen">
          <div className="initial-text">Вадим</div>{" "}
          <div className="initial-text text-right">Сикорский</div>
        </h1>
      </Container>

      <Headline className="absolute bottom-4 left-1/2 -translate-x-1/2 select-none">
        Front-end developer
      </Headline>
    </section>
  );
}

export default HerroSection;
