"use client";

import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import BlurText from "@components/atoms/text/blur-text";
import CountUp from "@components/atoms/text/count-up";
import { useGSAP } from "@gsap/react";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import { cn } from "@shared/lib/utils";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";

interface Measurement {
  number: number;
  unit?: string;
  name: string;
}

function AboutSection() {
  const triggerRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("home.about");

  const measurements: Measurement[] = useMemo(
    () => [
      { number: 9, name: t("floors") },
      { number: 15500, unit: "м²", name: t("active-area") },
      { number: 150, name: t("parking-places") },
      { number: 3640, unit: "м²", name: t("additional-area") },
    ],
    [t]
  );

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
      <Container className="flex items-center py-64 flex-col">
        <Headline
          size={"2xl"}
          className="block w-fit"
        >
          <BlurText
            text={t("title")}
            delay={150}
            animateBy="words"
            direction="bottom"
          />
        </Headline>

        <div className="grid md:grid-cols-2 place-items-center gap-10 xl:flex xl:justify-between w-full mt-20">
          {measurements.map((item, index) => (
            <div
              className="fact-figure w-full xl:w-auto"
              key={index}
            >
              <div
                className={cn(
                  "fact-card glass-panel flex items-center flex-col justify-center",
                  "px-12 py-8 text-center items-center gap-6"
                )}
                key={index}
              >
                <Headline
                  size={"xl"}
                  as="h3"
                >
                  <CountUp
                    from={0}
                    to={item.number}
                    direction="up"
                    separator=" "
                    duration={0.2}
                  />{" "}
                  {item.unit}
                </Headline>

                <Headline as="h4">{item.name}</Headline>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
