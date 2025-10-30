"use client";

import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import BlurText from "@components/atoms/text/blur-text";
import { useGSAP } from "@gsap/react";
import {
  animateFloat,
  cleanupFloatAnimation,
} from "@shared/lib/helpers/animate-float";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";
// import ContactsForm from "./contacts/contacts-from";

function ContactsSection() {
  const triggerRef = useRef<HTMLDivElement>(null);

  const t = useTranslations();

  const socials = [
    {
      title: t("common.ui.phone-number"),
      links: [
        { name: "+7 (771) 713 88 72", path: "/" },
        { name: "+7 (771) 713 88 72", path: "/" },
      ],
    },
    { title: "Email", links: [{ name: "office@ken-dala.kz", path: "/" }] },
  ];

  useGSAP(() => {
    if (!triggerRef.current) return;

    const glassBlocks = triggerRef.current.querySelectorAll(".glass-panel");

    const anims = Array.from(glassBlocks).map(item =>
      animateFloat(item, { duration: [6, 10], intensity: [2, 3] })
    );

    return () => cleanupFloatAnimation(anims);
  }, []);

  useGSAP(
    () => {
      gsap.from(".go-up", {
        translateY: "100%",
        opacity: 0,
        duration: 1,
        stagger: 0.5,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "30% 60%",
        },
      });
    },
    { scope: triggerRef, revertOnUpdate: true, dependencies: [] }
  );

  return (
    <section
      ref={triggerRef}
      className="contacts-section py-64 overflow-clip"
    >
      <Container className="flex flex-col xl:flex-row gap-6">
        <div className="contacts-info shrink-0 space-y-10">
          <Headline
            size={"2xl"}
            className="w-fit"
          >
            <BlurText
              text={t("contacts.title")}
              delay={150}
              animateBy="words"
              direction="bottom"
            />
          </Headline>
          <Headline
            size={"xl"}
            as="h3"
            className="w-fit"
          >
            <BlurText
              text={t("contacts.subtitle")}
              delay={150}
              animateBy="words"
              direction="bottom"
            />
          </Headline>

          <div className="flex gap-10 flex-wrap">
            {socials.map((item, index) => (
              <div
                className="contact-wrapper go-up"
                key={index}
              >
                <div
                  className="glass-panel steady-hover flex flex-col gap-3 p-6 size-fit"
                  key={index}
                >
                  <Headline
                    as="h4"
                    className="uppercase"
                  >
                    {item.title}
                  </Headline>

                  {item.links.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      className="transition-all duration-300 text-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*
        <div className="form-wrapper go-up w-full">
          <ContactsForm />
        </div> */}
      </Container>
    </section>
  );
}

export default ContactsSection;
