"use client";
import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import LogoFigure from "@components/atoms/icons/logo-figure";
import { useUIContext } from "@core/context/ui-provider";
import { useGSAP } from "@gsap/react";
import { useBuildingsData } from "@shared/data/buildings";
import { useNavigationLinks } from "@shared/data/navigation";
import { refs } from "@shared/lib/refs";
import { cn } from "@shared/lib/utils";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Aurora = dynamic(() =>
  import("@components/molecules/backgrounds/aurora").then(mod => mod.default)
);

const socials = ["+7 (771) 713 88 72", "office@ken-dala.kz", "facebook"];

function Footer({ currentDate }: { currentDate: Date }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const { setHeaderState } = useUIContext();
  const { mainNavigation } = useNavigationLinks();
  const { data } = useBuildingsData();

  const tContacts = useTranslations("contacts");
  const tCommon = useTranslations("common.ui");

  const { ref: fullInViewRef, inView: fullInView } = useInView({
    threshold: 0.9,
  });

  const { ref: inViewRef, inView } = useInView({});

  useGSAP(
    () => {
      if (!inView) return;

      gsap.from(footerRef.current, {
        height: 0,
        ease: "none",
        duration: 0.1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "max bottom",
          scrub: true,
        },
      });
    },
    {
      dependencies: [inView],
      revertOnUpdate: true,
      scope: triggerRef,
    }
  );

  useEffect(() => {
    if (fullInView) setHeaderState("white");
  }, [fullInView]);

  return (
    <div
      ref={refs<HTMLDivElement>(triggerRef, inViewRef, fullInViewRef)}
      className="h-screen w-full relative z-20 flex items-end"
    >
      <footer
        ref={footerRef}
        className="h-screen w-full overflow-hidden relative origin-bottom"
      >
        <div className="content inner h-screen absolute bottom-0 left-0 w-full bg-black z-10 flex flex-col justify-between">
          <div className="absolute inset-0 size-full -z-10">
            <Aurora
              colorStops={["#fff", "#C0C0C0", "#86a6b9"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>

          <Container className="pt-28 pb-10 flex justify-between">
            <div className="hidden md:flex flex-col gap-10">
              <LogoFigure className={cn("logo-figure w-72 xl:w-[25rem]")} />
            </div>

            <div className="grid grid-cols-3 md:grid-cols-2 h-fit gap-10">
              <div className="flex flex-col gap-6 h-fit">
                {mainNavigation.map((item, index) => (
                  <Link
                    key={index}
                    className="text-xl sm:text-2xl 2xl:text-4xl font-medium"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-6 h-fit">
                {data.map((item, index) => (
                  <Link
                    key={index}
                    className="text-xl sm:text-2xl 2xl:text-4xl font-medium"
                    href={"/"}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-6 h-fit">
                {socials.map((item, index) => (
                  <Link
                    key={index}
                    className="text-xl sm:text-2xl 2xl:text-4xl font-medium"
                    href={"/"}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </Container>

          <div className="w-full border-t">
            <Container className="py-10 flex flex-col gap-8 md:flex-row justify-between">
              <div className="flex flex-col gap-2">
                <Headline
                  size={"semi-sm"}
                  as="h5"
                >
                  {tCommon("copyright(year)", {
                    year: currentDate.getFullYear(),
                  })}
                </Headline>

                <Headline
                  size={"sm"}
                  as="h5"
                >
                  {tContacts("send-codition")}{" "}
                  <Link
                    href={"/"}
                    className="font-semibold"
                  >
                    {tContacts("personal-data")}
                  </Link>{" "}
                </Headline>
              </div>

              <Link
                href="https://init.kz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-5 justify-end flex-row-reverse md:flex-row leading-normal"
              >
                <Headline
                  size={"sm"}
                  asChild
                >
                  <span className="md:text-end">
                    {tCommon("dev.site-development")} <br />{" "}
                    {tCommon("dev.web-studio")}
                  </span>
                </Headline>
                <svg
                  className="w-16"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 5813.82 4168.45"
                  fill="white"
                >
                  <g>
                    <path d="M156.71 0l5657.11 0 0 4168.45 -5813.82 0 0 -4168.45 156.71 0zm5343.7 313.41l-5186.99 0 0 3541.62 5186.99 0 0 -3541.62z"></path>
                    <path d="M1524.51 1185.97l0 300.25 -355.29 0 0 -300.25 355.29 0zm0 490.41l0 1291.08 -355.29 0 0 -1291.08 355.29 0zm1496.25 1291.08l-360.3 0 0 -753.13c0,-91.74 -15.01,-161.38 -45.04,-208.92 -30.02,-47.54 -88.41,-71.31 -175.14,-71.31 -186.82,0 -280.24,113.43 -280.24,340.29l0 693.08 -352.79 0 0 -1291.08 337.78 0 0 180.14c106.75,-143.45 249.37,-215.17 427.85,-215.17 138.46,0 247.71,40.03 327.78,120.1 80.06,80.07 120.1,194.33 120.1,342.78l0 863.23zm633.03 -1781.49l0 300.25 -355.29 0 0 -300.25 355.29 0zm0 490.41l0 1291.08 -355.29 0 0 -1291.08 355.29 0zm990.83 0l0 240.2 -262.72 0 0 608c0,38.37 0.84,66.31 2.51,83.82 1.66,17.52 7.51,35.45 17.51,53.79 10.01,18.35 25.44,30.44 46.3,36.28 20.85,5.84 50.45,8.76 88.82,8.76 43.37,0 79.23,-1.67 107.59,-5.01l0 270.23c-86.74,6.67 -158.47,10.01 -215.18,10.01 -155.13,0 -260.62,-27.11 -316.51,-81.33 -55.88,-54.2 -83.81,-158.87 -83.81,-314.01l0 -670.56 -215.18 0 0 -240.2 215.18 0 0 -390.33 352.79 0 0 390.33 262.72 0z"></path>
                  </g>
                </svg>
              </Link>
            </Container>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
