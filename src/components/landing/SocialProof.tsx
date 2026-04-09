import { useEffect, useState } from "react";
import { Users } from "lucide-react";

interface SocialProofProps {
  notifications: string[];
}

const SocialProof = ({ notifications }: SocialProofProps) => {
  const [current, setCurrent] = useState<string | null>(null);
  const [counter, setCounter] = useState(1245);

  useEffect(() => {
    if (!notifications.length) return;
    let idx = 0;
    const show = () => {
      setCurrent(notifications[idx % notifications.length]);
      idx++;
      setTimeout(() => setCurrent(null), 4500);
    };
    show();
    const interval = setInterval(show, 7000);
    return () => clearInterval(interval);
  }, [notifications]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating notification */}
      {current && (
        <div className="fixed bottom-6 left-6 z-50 animate-notification">
          <div className="bg-card border border-border rounded-xl px-5 py-3 shadow-xl flex items-center gap-3 max-w-xs">
            <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-accent-foreground" />
            </div>
            <p className="text-sm text-card-foreground">{current}</p>
          </div>
        </div>
      )}

      {/* Counter bar */}
      <div className="bg-card border-y border-border py-4">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            <span className="font-bold text-foreground">{counter.toLocaleString()}</span> users claimed rewards today
          </span>
        </div>
      </div>
    </>
  );
};

export default SocialProof;
