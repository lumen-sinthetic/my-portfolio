"use client";

import { Headline } from "@components/atoms/headline";
import BlurText from "@components/atoms/text/blur-text";
import { useGSAP } from "@gsap/react";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import gsap from "gsap";
import { useRef } from "react";

function ExperienceSection() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!triggerRef.current) return;

      const glass = triggerRef.current.querySelector(".glass-panel");
      const anim = animateFloat(glass);

      gsap.fromTo(
        ".iframe-wrapper",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power1",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "100px 60%",
          },
        }
      );

      return () => {
        cleanupFloatAnimation(anim);
      };
    },
    { scope: triggerRef, dependencies: [] }
  );

  return (
    <section
      ref={triggerRef}
      className="cta-location-section overflow-clip relative"
    >
      <Headline
        size={"2xl"}
        className="title text-center w-fit mx-auto"
      >
        <BlurText
          text={"Мой опыт работы"}
          delay={150}
          animateBy="words"
          direction="bottom"
        />
      </Headline>
    </section>
  );
}

export default ExperienceSection;
