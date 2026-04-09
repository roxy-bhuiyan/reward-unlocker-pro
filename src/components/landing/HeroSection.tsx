import { Button } from "@/components/ui/button";
import { Shield, Star, Zap } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

const HeroSection = ({ title, subtitle, ctaText, onCtaClick }: HeroSectionProps) => {
  return (
    <section className="gradient-hero relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Floating orbs */}
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
    </section>
  );
};

export default HeroSection;
