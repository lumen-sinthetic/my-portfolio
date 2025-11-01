"use client";

import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import BlurText from "@components/atoms/text/blur-text";
import { PortfolioCard } from "@components/molecules/portfolio/portfolio-card";
import PortfolioParagraph from "@components/molecules/portfolio/portfolio-paragraph";
import { useGSAP } from "@gsap/react";
import { portfolio } from "@shared/data/portfolio";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import { useRefArray } from "@shared/lib/refs";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [elements, ref] = useRefArray<HTMLDivElement>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({ rootMargin: "20px" });

  useGSAP(
    () => {
      if (!inView) return;

      elements.current.forEach(el => {
        const image = el.querySelector(".advantage-container");

        gsap.set(image, { opacity: 0, x: 200, filter: "blur(10px)" });

        const tl = gsap.timeline({
          defaults: { ease: "circ.inOut" },
          scrollTrigger: {
            trigger: el,
            start: "10% 80%",
            end: "90% 30%",
            scrub: 2,
          },
        });

        tl.to(image, {
          opacity: 1,
          x: 0,
          filter: "none",
          duration: 0.6,
        })
          .to(image, {
            opacity: 1,
            x: 0,
            filter: "none",
            ease: "none",
            duration: 1.5,
          })
          .to(image, {
            opacity: 0,
            x: 200,
            filter: "blur(10px)",
            duration: 0.6,
          });
      });
    },
    {
      dependencies: [inView],
      revertOnUpdate: true,
    }
  );

  useEffect(() => {
    if (!elements.current.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const index =
            elements.current?.indexOf(entry.target as HTMLDivElement) ?? -1;

          if (index !== -1) setActiveIndex(index);
        });
      },
      { threshold: 0.5 }
    );

    elements.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, [setActiveIndex]);

  useGSAP(
    () => {
      if (!inView) return;

      gsap.from(".advantage-thesis", {
        translateY: 200,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "20% 60%",
        },
      });

      const images = document.querySelectorAll(".advantage-figure");

      const timelines = Array.from(images).map(i =>
        animateFloat(i, { duration: [4, 6], intensity: [2, 2.5] })
      );

      return () => cleanupFloatAnimation(timelines);
    },
    { dependencies: [inView], revertOnUpdate: true }
  );

  return (
    <section
      ref={inViewRef}
      className="advantages-section py-64 overflow-clip relative"
    >
      <Container className="flex gap-6 mt-20 flex-col lg:flex-row">
        <div className="basis-1/3">
          <div className="wrapper lg:sticky lg:top-1/3 mt-24 mb-10">
            <Headline
              size={"lg"}
              as="h2"
              className="mb-4"
            >
              <BlurText
                text={"Портфолио"}
                delay={150}
                animateBy="words"
                direction="bottom"
              />
            </Headline>
            {portfolio.map((item, index) => (
              <PortfolioParagraph
                key={index}
                index={index}
                activeIndex={activeIndex}
                title={item.name}
                onClick={() => {
                  elements.current[index].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              />
            ))}
          </div>
        </div>

        <div className="basis-2/3 flex flex-col gap-36">
          {portfolio.map((item, index) => (
            <PortfolioCard
              key={index}
              ref={ref}
              data={item}
              order={index + 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PortfolioSection;
