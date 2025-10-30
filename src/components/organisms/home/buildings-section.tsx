"use client";

import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import BlurText from "@components/atoms/text/blur-text";
import { useGSAP } from "@gsap/react";
import { useBuildingsData } from "@shared/data/buildings";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import { cn } from "@shared/lib/utils";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

function BuildingsSection() {
  const [isAppeared, setisAppeared] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);

  const t = useTranslations();
  const { data } = useBuildingsData();

  useGSAP(
    () => {
      gsap.fromTo(
        ".building-card",
        { translateY: 200, opacity: 0 },
        {
          translateY: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.in",
          stagger: 0.4,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "30% 90%",
          },
          onComplete: () => {
            gsap.set(".building-card", { clearProps: "all" });
            setisAppeared(true);
          },
        }
      );
    },
    { scope: triggerRef, dependencies: [] }
  );

  useGSAP(() => {
    if (!triggerRef.current || !isAppeared) return;

    const elements = triggerRef.current.querySelectorAll(".building-card");

    const timelines = Array.from(elements).map(i =>
      animateFloat(i, { duration: [5, 10], intensity: [1, 2] })
    );

    return () => cleanupFloatAnimation(timelines);
  }, [isAppeared]);

  return (
    <section
      ref={triggerRef}
      className="buildings-section relative overflow-clip"
    >
      <Container className="flex items-center flex-col">
        <Headline
          size={"2xl"}
          className="buildings-title block w-fit"
        >
          <BlurText
            text={t("home.our-services")}
            delay={150}
            animateBy="words"
            direction="bottom"
          />
        </Headline>

        <div className="grid gap-20 my-20 place-items-center 2xl:grid-cols-2 w-full">
          {data.map((item, index) => (
            <Link
              href={"/"}
              className={cn("building-card w-fit relative steady-hover")}
              key={item.id}
            >
              <Image
                width={720}
                height={300}
                alt={item.title}
                src={item.image}
                className="h-80 w-auto aspect-video object-cover rounded-md"
              />

              <div
                className={cn(
                  "glass-panel absolute -bottom-12",
                  "overflow-hidden rounded-xl backdrop-blur-lg bg-white/6 border border-gray-200/30 p-8",
                  "max-md:left-1/2 max-md:-translate-x-1/2 w-full md:w-auto",
                  index % 2 === 0 ? "md:-right-12" : "md:-left-16"
                )}
              >
                <Headline as="h3">{item.title}</Headline>
                <Headline
                  as="h4"
                  size={"semi-sm"}
                >
                  {item.description}
                </Headline>

                <div className="flex gap-2 items-center">
                  {t("common.ui.learn-more")} <ArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default BuildingsSection;
