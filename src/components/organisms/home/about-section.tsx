"use client";

import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import { useGSAP } from "@gsap/react";
import { aboutInfo } from "@shared/data/about-me";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import { cn } from "@shared/lib/utils";
import { gsap } from "gsap";
import { useRef } from "react";

function AboutSection() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".fact-figure",
        { opacity: 0, translateX: 200 },
        {
          opacity: 1,
          translateX: 0,
          stagger: 0.4,
          duration: 0.8,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "20% 60%",
          },
        }
      );
    },
    {
      dependencies: [],
      revertOnUpdate: true,
      scope: triggerRef,
    }
  );

  useGSAP(() => {
    if (!triggerRef.current) return;

    const elements = triggerRef.current.querySelectorAll(".fact-card");

    const timelines = Array.from(elements).map(i =>
      animateFloat(i, { duration: [4, 8], intensity: [2, 2.5] })
    );

    return () => cleanupFloatAnimation(timelines);
  }, []);

  return (
    <section
      ref={triggerRef}
      className="about-section overflow-clip relative"
    >
      <Container className="flex items-center py-32 flex-col">
        <div className="grid md:grid-cols-2 place-items-center gap-10 w-full mt-20">
          {aboutInfo.map((item, index) => (
            <div
              key={index}
              className="fact-figure w-full xl:w-auto"
            >
              <div
                className={cn(
                  "fact-card glass-panel flex flex-col justify-center",
                  "px-12 py-8 text-left gap-6"
                )}
              >
                <Headline
                  size={"lg"}
                  as="h3"
                  className="font-medium"
                >
                  {item.title}
                </Headline>

                <Headline
                  asChild
                  size={"semi-sm"}
                >
                  {item.content}
                </Headline>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
