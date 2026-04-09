import { MousePointerClick, ClipboardCheck, Gift } from "lucide-react";

const steps = [
  { icon: MousePointerClick, label: "Click Offer", step: 1 },
  { icon: ClipboardCheck, label: "Complete Verification", step: 2 },
  { icon: Gift, label: "Unlock Reward", step: 3 },
];

const ProgressSteps = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          {steps.map((s, i) => (
            <div key={s.step} className="flex items-center">
              <div className="flex flex-col items-center text-center w-40">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-3 shadow-lg shadow-primary/20">
                  <s.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground mb-1">STEP {s.step}</span>
                <span className="font-bold text-foreground">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block w-24 h-0.5 bg-border mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressSteps;
