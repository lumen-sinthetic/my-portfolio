"use client";

import { Badge } from "@components/atoms/badge";
import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import BlurText from "@components/atoms/text/blur-text";
import { useGSAP } from "@gsap/react";
import { experience } from "@shared/data/experience";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import { format, formatDistanceStrict } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";
import { useRef } from "react";

function ExperienceSection() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!triggerRef.current) return;

      const glass = triggerRef.current.querySelector(".glass-panel");
      const anim = animateFloat(glass);

      return () => {
        cleanupFloatAnimation(anim);
      };
    },
    { scope: triggerRef, dependencies: [] }
  );

  return (
    <section
      ref={triggerRef}
      className="cta-location-section overflow-clip relative py-32"
    >
      <Container>
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

        <div className="list mt-32 grid grid-cols-2">
          {experience.map((item, index) => (
            <div
              key={index}
              className="experience-card glass-panel steady-hover p-6 space-y-4"
            >
              <div className="experience card-header flex items-center gap-6">
                <Image
                  width={60}
                  height={60}
                  src={item.companyLogo}
                  alt={item.companyName}
                />

                <Headline as="h3">{item.companyName}</Headline>

                <Headline
                  asChild
                  size={"sm"}
                >
                  <div className="job-span ml-auto">
                    {format(item.jobSpan[0], "LLLL yyyy", { locale: ru })} -{" "}
                    {format(item.jobSpan[1], "LLLL yyyy", { locale: ru })} (
                    {formatDistanceStrict(...item.jobSpan, { locale: ru })})
                  </div>
                </Headline>
              </div>

              <Headline
                as="h4"
                size={"semi-sm"}
                className="font-medium"
              >
                Должность: {item.position}
              </Headline>

              <ul className="list-disc pl-6">
                {item.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>

              <div className="flex gap-2">
                {item.stack.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ExperienceSection;
