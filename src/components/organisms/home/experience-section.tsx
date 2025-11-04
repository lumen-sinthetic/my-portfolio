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
import { refs } from "@shared/lib/refs";
import { format, formatDistanceStrict } from "date-fns";
import { ru } from "date-fns/locale";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";

function ExperienceSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const isLargeScreen = useMediaQuery({ minWidth: 500 });

  const { ref, inView } = useInView({
    rootMargin: "20px",
    triggerOnce: true,
  });

  useGSAP(
    () => {
      if (!triggerRef.current || !inView) return;

      gsap.fromTo(
        ".experience-wrapper",
        { opacity: 0, translateX: 200 },
        {
          opacity: 1,
          translateX: 0,
          stagger: 0.4,
          duration: 0.8,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "20% 50%",
          },
        }
      );
    },
    {
      dependencies: [inView],
      revertOnUpdate: true,
      scope: triggerRef,
    }
  );

  useGSAP(
    () => {
      if (!triggerRef.current || !isLargeScreen) return;

      const glass = triggerRef.current.querySelector(".glass-panel");
      const anim = animateFloat(glass);

      return () => {
        cleanupFloatAnimation(anim);
      };
    },
    { scope: triggerRef, dependencies: [isLargeScreen] }
  );

  return (
    <section
      ref={refs(triggerRef, ref)}
      className="experience-section overflow-clip relative pt-32 pb-16"
    >
      <Container>
        <Headline
          size={"2xl"}
          className="title w-fit mx-auto"
        >
          <BlurText
            text={"Мой опыт работы"}
            delay={150}
            animateBy="words"
            direction="bottom"
            className="justify-center"
          />
        </Headline>

        <div className="list mt-16 grid xl:grid-cols-2">
          {experience.map((item, index) => (
            <div
              className="experience-wrapper"
              key={index}
            >
              <div className="experience-card glass-panel steady-hover p-6 space-y-4">
                <div className="card-header flex items-center max-md:flex-col max-md:text-center gap-6">
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
                    <div className="job-span md:ml-auto">
                      {format(item.jobSpan[0], "LLLL yyyy", { locale: ru })} -{" "}
                      {format(item.jobSpan[1], "LLLL yyyy", { locale: ru })} (
                      {formatDistanceStrict(...item.jobSpan, { locale: ru })})
                    </div>
                  </Headline>
                </div>

                <Headline
                  as="h4"
                  size={"semi-sm"}
                  className="font-medium max-md:text-center"
                >
                  Должность: {item.position}
                </Headline>

                <ul className="list-disc pl-6 text-sm md:text-base">
                  {item.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>

                <div className="flex gap-2 flex-wrap">
                  {item.stack.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ExperienceSection;
