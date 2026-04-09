import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import type { LockerType } from "@/lib/store";

interface ContentLockerProps {
  lockerType: LockerType;
  lockerScript: string;
  lockerLink: string;
  onClose: () => void;
}

const ContentLocker = ({ lockerType, lockerScript, lockerLink, onClose }: ContentLockerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && lockerType === "link" && lockerLink) {
      window.open(lockerLink, "_blank");
      onClose();
    }
  }, [loading, lockerType, lockerLink, onClose]);

  useEffect(() => {
    if (!loading && lockerType === "script" && containerRef.current && lockerScript) {
      containerRef.current.innerHTML = lockerScript;
      const scripts = containerRef.current.querySelectorAll("script");
      scripts.forEach((s) => {
        const ns = document.createElement("script");
        if (s.src) ns.src = s.src;
        else ns.textContent = s.textContent;
        s.parentNode?.replaceChild(ns, s);
      });
    }
  }, [loading, lockerType, lockerScript]);

  // For link type, just show loading then redirect
  if (lockerType === "link") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 relative border border-border">
          <div className="flex flex-col items-center py-12 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Redirecting to your reward...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 relative border border-border">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        {loading ? (
          <div className="flex flex-col items-center py-12 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Preparing your reward...</p>
          </div>
        ) : lockerScript ? (
          <div ref={containerRef} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Content locker not configured yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Set it up in the admin panel.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLocker;
