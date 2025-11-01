"use server";

import AboutSection from "@components/organisms/home/about-section";
import ExperienceSection from "@components/organisms/home/experience-section";
import HeroSection from "@components/organisms/home/hero-section";
import PortfolioSection from "@components/organisms/home/portfolio-section";
import AnotherBg from "@components/organisms/layout/another-bg";
import StandartBg from "@components/organisms/layout/standart-bg";
import Footer from "@components/templates/layout/footer";

export default async function Home() {
  const date = new Date();

  return (
    <main className="min-h-screen relative z-10 overflow-clip">
      <StandartBg />

      <HeroSection />
      <AboutSection />
      <PortfolioSection />

      <AnotherBg>
        <ExperienceSection />
        <Footer date={date} />
      </AnotherBg>
    </main>
  );
}
