"use client";

import { Headline } from "@components/atoms/headline";
import BlurText from "@components/atoms/text/blur-text";
import TransitionButton from "@components/molecules/transition-button";
import { useGSAP } from "@gsap/react";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import { cn } from "@shared/lib/utils";
import gsap from "gsap";
import { ArrowRight, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

function CtaLocationSection() {
  const triggerRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("home.location");
  const tCommon = useTranslations("common.ui");

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
          text={t("title")}
          delay={150}
          animateBy="words"
          direction="bottom"
        />
      </Headline>

      <figure className="iframe-wrapper mt-20 relative">
        <iframe
          title="yandex-map"
          width="100%"
          height={800}
          className="pointer-events-none select-none"
          loading="lazy"
          src="https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=false&source=constructor-api&um=constructor%3A51dead9e360b3c8f3d7a63dc677f325346ef8f014da878c6e46ed09d8e696f16"
        />

        <div
          className={cn(
            "glass-panel steady-hover p-8 flex flex-col gap-4 text-2xl",
            "lg:absolute bottom-10 left-10 m-6"
          )}
        >
          <div className=" lg:w-[40rem]">{t("cta-text")}</div>

          <div className="flex gap-4 md:flex-row flex-col uppercase">
            <TransitionButton icon={<ArrowRight />}>
              {tCommon("learn-more")}
            </TransitionButton>

            <TransitionButton icon={<Download />}>
              {tCommon("tech-characteristics")}
            </TransitionButton>
          </div>
        </div>
      </figure>
    </section>
  );
}

export default CtaLocationSection;
