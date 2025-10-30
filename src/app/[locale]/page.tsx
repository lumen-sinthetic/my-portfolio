import ContactsSection from "@components/organisms/contacts-section";
import AboutSection from "@components/organisms/home/about-section";
import AdvantagesSection from "@components/organisms/home/advantages-section";
import BuildingsSection from "@components/organisms/home/buildings-section";
import CtaLocationSection from "@components/organisms/home/cta-location-section";
import HeroSection from "@components/organisms/home/hero-section";
import AnotherBg from "@components/organisms/layout/another-bg";
import StandartBg from "@components/organisms/layout/standart-bg";

export default function Home() {
  return (
    <main className="min-h-screen relative z-10 overflow-clip">
      <StandartBg />

      <HeroSection />
      <AboutSection />
      <BuildingsSection />
      <AdvantagesSection />

      <AnotherBg>
        <CtaLocationSection />
        <ContactsSection />
      </AnotherBg>
    </main>
  );
}
