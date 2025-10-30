"use client";

import { useUIContext } from "@core/context/ui-provider";
import { useGSAP } from "@gsap/react";
import { refs } from "@shared/lib/refs";
import { cn } from "@shared/lib/utils";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Particles = dynamic(() =>
  import("@components/molecules/backgrounds/particles").then(mod => mod.default)
);

function AnotherBg({ children }: PropsWithChildren) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { ref: inViewBgRef, inView: inViewBg } = useInView({ threshold: 0.1 });

  const { setHeaderState } = useUIContext();

  useGSAP(
    () => {
      if (inView) {
        gsap.to(".magnifier", {
          scale: 1,
          borderRadius: 0,
          onComplete: () => {},
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "400px 50%",
            end: "95% 70%",
            scrub: true,
            onEnter: () => setHeaderState("black"),
            onLeaveBack: () => setHeaderState("white"),
          },
        });
      }

      gsap.to([".white-black-bg", bgRef.current], {
        opacity: 1,
        duration: 0.2,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "80% 50%",
          end: "95% 50%",
          scrub: 1,
        },
      });
    },
    {
      scope: triggerRef,
      dependencies: [inView],
      revertOnUpdate: true,
    }
  );

  useEffect(() => {
    if (inViewBg) setHeaderState("black");
  }, [inViewBg]);

  return (
    <>
      <div
        className={cn(
          "to-new-bg relative z-10 mt-20",
          "h-[250vh] flex justify-center overflow-clip"
        )}
        ref={refs<HTMLDivElement>(triggerRef, ref)}
      >
        <div
          className={cn(
            "magnifier rounded-bg fixed size-[3000px] scale-0 rounded-full bg-white",
            "top-1/2 -translate-y-1/2 aspect-square hidden",
            { block: inView }
          )}
        />

        <div className="white-black-bg fixed bg-white z-10 pointer-events-none opacity-0 size-full top-0 bottom-0">
          <Particles
            particleCount={170}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            className="size-full"
            particleColors={["#000"]}
          />
        </div>
      </div>

      <div
        ref={refs<HTMLDivElement>(bgRef, inViewBgRef)}
        className="z-20 relative w-full text-black"
      >
        {children}
      </div>
    </>
  );
}

export default AnotherBg;
