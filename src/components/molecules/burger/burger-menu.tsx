import { Container } from "@components/atoms/container";
import FuzzyText from "@components/atoms/text/fuzzy-text";
import { useLenis } from "@core/context/LenisProvider";
import { useNavigationLinks } from "@shared/data/navigation";
import { cn } from "@shared/lib/utils";
import { StateFn, Timeline } from "@shared/types/abbreviations";
import gsap from "gsap";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface BurgerMenuProps {
  isOpen: boolean;
  setIsOpen: StateFn<boolean>;
}

// const iframeParams = new URLSearchParams({ scroll: "false" });

const Dither = dynamic(() =>
  import("../backgrounds/dither").then(mod => mod.default)
);

function BurgerMenu({ isOpen }: BurgerMenuProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<Timeline>(null);

  const { mainNavigation } = useNavigationLinks();
  // const televisionRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  // const [isIframeLoading, setisIframeLoading] = useState(false);

  const lenis = useLenis();

  // useGSAP(
  //   () => {
  //     const tl = gsap
  //       .timeline({
  //         repeat: Infinity,
  //         repeatDelay: 4,
  //         onRepeat() {
  //           const delays = [4, 3, 6];
  //           const index = (this.repeat || 0) % delays.length;

  //           this.pause();
  //           gsap.delayedCall(delays[index], () => this.play());
  //         },
  //       })
  //       .to(".static-fuzz", { opacity: 0.5, duration: 1, ease: "bounce.inOut" })
  //       .to(".static-fuzz", {
  //         opacity: 0.2,
  //         delay: 0.5,
  //         duration: 0.5,
  //         ease: "bounce.inOut",
  //       });

  //     return () => tl.kill();
  //   },
  //   { scope: televisionRef, dependencies: [] }
  // );

  useLayoutEffect(() => {
    if (!tlRef.current) {
      tlRef.current = gsap
        .timeline({
          defaults: { duration: 0.4 },
          paused: true,
          // onStart: () => {
          //   console.log("here", headerState);
          //   if (headerState === "white") return;

          //   setHeaderBuffer(headerState);
          //   setHeaderState("white");
          // },
          // onReverseComplete: () => {
          //   if (!headerBuffer) return;
          //   setHeaderState(headerBuffer);
          //   setHeaderBuffer("white");
          // },
        })
        .to(document.documentElement, { overflow: "clip", duration: 0 })
        .to(boxRef.current, { display: "block" })
        .fromTo(
          ".burger-bg",
          { borderBottomRightRadius: 9999 },
          { scale: 1, ease: "power2.out", borderBottomRightRadius: 0 }
        )
        .to(".burger-content-wrapper", { opacity: 1 })
        .fromTo(
          ".nav-item",
          { opacity: 0 },
          { opacity: 1, stagger: 0.05, duration: 0.2 }
        );
      // .fromTo(
      //   ".television",
      //   { translateY: "500px" },
      //   { translateY: "-50%", duration: 0.6, ease: "bounce.out" },
      //   "<"
      // );
    }

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      tlRef.current?.play();
      lenis?.stop();
    } else {
      tlRef.current?.reverse();
      lenis?.start();
    }
  }, [isOpen, lenis]);

  // useEffect(() => {
  //   setisIframeLoading(true);
  // }, [activeIndex]);

  return (
    <div
      className="burger-menu fixed size-full w-screen overflow-hidden z-40 inset-0 hidden"
      ref={boxRef}
    >
      <div
        className={cn(
          "burger-bg absolute top-0 left-0 size-full scale-0 bg-black",
          "origin-top-left"
        )}
      />

      <div className="burger-content-wrapper size-full relative opacity-0 z-10 flex items-center overflow-hidden">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
          className="!absolute too-0 left-0 size-full z-10"
        />

        <Container className="z-20 relative flex gap-6">
          <nav className="list flex flex-col gap-8 text-6xl basis-1/2">
            {mainNavigation.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="nav-item w-fit"
                onMouseEnter={() => setActiveIndex(index)}
              >
                <FuzzyText
                  baseIntensity={activeIndex === index ? 0.4 : 0.1}
                  hoverIntensity={0.7}
                  fontSize={60}
                >
                  {item.name}
                </FuzzyText>
              </Link>
            ))}
          </nav>
        </Container>

        {/* <div
          ref={televisionRef}
          className={cn(
            "television",
            "absolute top-1/2 -translate-y-1/2 right-24 z-20 rounded-md border-black border-4 bg-white overflow-hidden",
            "scale-50 origin-right"
          )}
        >
          <Image
            alt="static"
            src={"/assets/img/home/television-static.gif"}
            width={1920}
            height={1080}
            unoptimized
            className={cn(
              "static-fuzz opacity-20 absolute top-0 left-0 size-full z-10 select-none pointer-events-none rounded-md",
              { "!opacity-100": isIframeLoading }
            )}
          />
          <iframe
            loading="lazy"
            title={navigationLinks[activeIndex].name}
            src={`${selfURL}${navigationLinks[activeIndex].href}?${iframeParams.toString()}`}
            onLoad={() => setisIframeLoading(false)}
            width={1920}
            className="aspect-video relative rounded-md"
          />
        </div> */}
      </div>
    </div>
  );
}

export default BurgerMenu;
