import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/landing/HeroSection";
import OfferCard from "@/components/landing/OfferCard";
import ProgressSteps from "@/components/landing/ProgressSteps";
import SocialProof from "@/components/landing/SocialProof";
import ContentLocker from "@/components/landing/ContentLocker";
import { getOffers, getSettings, type Offer } from "@/lib/store";
import { Settings } from "lucide-react";

const Index = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [settings, setSettings] = useState(getSettings());
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const offersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOffers(getOffers().filter((o) => o.enabled));
    setSettings(getSettings());
  }, []);

  const scrollToOffers = () => {
    offersRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        ctaText={settings.ctaText}
        onCtaClick={scrollToOffers}
      />

      <SocialProof notifications={settings.notifications} />

      <ProgressSteps />

      {/* Offers */}
      <section ref={offersRef} className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
            Choose Your Reward
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} onGetNow={setSelectedOffer} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} RewardHub. All rights reserved.</span>
          <Link to="/admin" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Settings className="w-4 h-4" /> Admin
          </Link>
        </div>
      </footer>

      {selectedOffer && (
        <ContentLocker
          lockerType={settings.lockerType || "script"}
          lockerScript={settings.lockerScript}
          lockerLink={settings.lockerLink || ""}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
};

export default Index;
