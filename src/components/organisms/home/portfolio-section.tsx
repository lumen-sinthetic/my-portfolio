"use client";

import { Badge } from "@components/atoms/badge";
import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import BlurText from "@components/atoms/text/blur-text";
import { useGSAP } from "@gsap/react";
import { portfolio } from "@shared/data/portfolio";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import { useRefArray } from "@shared/lib/refs";
import { cn } from "@shared/lib/utils";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
              <button
                type="button"
                className="advantage-thesis min-h-12 w-full group cursor-pointer relative"
                onClick={() => {
                  elements.current[index].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                key={index}
              >
                <div className="size-full flex items-center justify-between gap-4 pr-4">
                  <Headline
                    className="my-2"
                    size={"semi-sm"}
                    as="h3"
                  >
                    <span className="font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>{" "}
                    {item.name}
                  </Headline>

                  <div
                    className={cn(
                      "size-2 rounded-full bg-white transition-all duration-300",
                      "scale-0 group-hover:scale-100",
                      { "lg:scale-100": activeIndex === index }
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "aboslute inset-x-0 bottom-0 h-px bg-black/30",
                    "w-full"
                  )}
                />

                <div
                  className={cn(
                    "aboslute inset-x-0 bottom-0 h-px bg-white",
                    "transition-all duration-300 w-0 group-hover:w-full",
                    { "lg:w-full": activeIndex === index }
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="basis-2/3 flex flex-col gap-36">
          {portfolio.map((item, index) => (
            <div
              className={cn(
                "advantage-wrapper w-full py-20",
                "grid place-items-center"
              )}
              key={index}
              ref={ref}
            >
              <div className="advantage-container w-full grid place-items-center">
                <figure className="advantage-figure relative steady-hover w-10/12">
                  <Image
                    width={1080}
                    height={608}
                    src={item.image}
                    alt={item.name}
                    className="advantage-image rounded-md w-full h-auto"
                  />

                  <div className="glass-panel !bg-black/40 p-8 absolute top-[80%] left-0 md:-left-12 flex gap-4 items-center">
                    <div className="text-8xl hidden md:block">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex flex-col gap-3">
                      <Headline asChild>
                        <Link
                          href={item.link}
                          rel="noindex nofollow"
                          target="_blank"
                          className="flex gap-2"
                        >
                          {item.name}

                          <ArrowUpRight />
                        </Link>
                      </Headline>
                      {item.description && <p>{item.description}</p>}
                      {!!item.tags?.length && (
                        <div className="flex gap-3">
                          {item.tags.map((tag, index) => (
                            <Badge key={index}>{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PortfolioSection;
