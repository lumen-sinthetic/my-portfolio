"use client";

import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import BlurText from "@components/atoms/text/blur-text";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import { useLayoutEffect, useRef } from "react";

function HeroSection() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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
        <BlurText
          delay={300}
          animateBy="words"
          direction="bottom"
          text="Привет, я"
        />
      </Headline>
      <Container className="min-h-screen select-none">
        <Headline
          as="h1"
          size={"3xl"}
          className="flex justify-center gap-12 flex-col font-bold w-full min-h-screen"
        >
          <div className="initial-text">
            <BlurText
              delay={100}
              animateBy="letters"
              direction="bottom"
              text="Вадим"
            />
          </div>
          <div className="initial-text">
            <BlurText
              delay={100}
              animateBy="letters"
              direction="bottom"
              text="Сикорский"
              className="text-right justify-end"
            />
          </div>
        </Headline>
      </Container>

      <Headline className="absolute bottom-4 left-1/2 -translate-x-1/2 select-none">
        <BlurText
          delay={300}
          animateBy="words"
          direction="bottom"
          text="Front-end developer"
          className="justify-center"
        />
      </Headline>
    </section>
  );
}

export default HeroSection;
