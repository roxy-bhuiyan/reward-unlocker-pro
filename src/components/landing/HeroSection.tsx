import { Button } from "@/components/ui/button";
import { Shield, Star, Zap } from "lucide-react";
import { type Offer, type DirectOffer } from "@/lib/store";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
  offers?: Offer[];
  directOffers?: DirectOffer[];
}

interface MarqueeItem {
  image: string;
  title: string;
  sub: string;
  flag?: string;
}

const FLAG_URL = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

const HeroSection = ({ title, subtitle, ctaText, onCtaClick, offers = [], directOffers = [] }: HeroSectionProps) => {
  const allItems: MarqueeItem[] = [
    ...offers.map((o) => ({ image: o.image, title: o.title, sub: o.description })),
    ...directOffers.map((o) => ({ image: o.image, title: o.title, sub: o.country, flag: o.countryCode })),
  ];

  const marqueeItems = allItems.length > 0 ? [...allItems, ...allItems] : [];

  return (
    <section className="gradient-hero relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-4 relative z-10 py-20 text-center">
        <div className="animate-slide-up max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="glass-card px-4 py-1.5 rounded-full text-sm font-medium text-primary-foreground/80 flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              Limited Time Offers
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 leading-tight tracking-tight">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-xl mx-auto">
            {subtitle}
          </p>

          <Button
            onClick={onCtaClick}
            className="gradient-primary text-primary-foreground text-lg px-10 py-6 rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            {ctaText}
          </Button>

          <div className="flex items-center justify-center gap-6 mt-10 text-primary-foreground/60 text-sm">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Secure</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4" /> Trusted</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Instant</span>
          </div>
        </div>
      </div>

      {marqueeItems.length > 0 && (
        <div className="w-full relative z-10 pb-8 overflow-hidden">
          <div className="flex animate-marquee gap-4 w-max">
            {marqueeItems.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-48 glass-card rounded-xl p-3 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <p className="text-xs font-bold text-primary-foreground truncate w-full text-center">
                  {item.title}
                </p>
                <p className="text-[10px] text-primary-foreground/60 truncate w-full text-center flex items-center justify-center gap-1">
                  {item.flag && (
                    <img src={FLAG_URL(item.flag)} alt="" className="w-4 h-3 rounded-sm inline-block" />
                  )}
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
