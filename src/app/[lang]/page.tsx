import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VisionFirstSection from "@/components/VisionFirstSection";
import SectionDivider from "@/components/SectionDivider";
import MarketplaceSection from "@/components/MarketplaceSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CtaSection from "@/components/CtaSection";
import CustomFooter from "@/components/CustomFooter";

// La page reçoit les params, y compris `lang`
export default function LandingPage({ params }: { params: { lang: string } }) {
  // Le paramètre `lang` est disponible via params.lang et sera utilisé par les composants enfants via useParams()
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SectionDivider type="wave" fillClassName="fill-white dark:fill-gray-900" />
        <VisionFirstSection />
        <SectionDivider type="tilt" fillClassName="fill-indigo-50 dark:fill-indigo-950" />
        <MarketplaceSection />
        <SectionDivider type="curve" fillClassName="fill-white dark:fill-gray-900" />
        <HowItWorksSection />
        <SectionDivider type="tilt" fillClassName="fill-indigo-50 dark:fill-indigo-900/20" />
        <CtaSection />
      </main>
      <CustomFooter />
    </>
  );
} 