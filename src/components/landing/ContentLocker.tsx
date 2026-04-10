import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ContentLockerProps {
  offer: { title: string; image: string; description: string };
  onClose: () => void;
}

const ContentLocker = ({ offer, onClose }: ContentLockerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;
    injectedRef.current = true;

    // Re-inject the AdBlueMedia locker script to trigger it fresh
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.textContent = 'var jFEth_QXV_rKsLEc={"it":4398331,"key":"3ac03"};';
    document.head.appendChild(configScript);

    const loaderScript = document.createElement("script");
    loaderScript.src = "https://d3v3431sr9puku.cloudfront.net/1c5d8a7.js";
    document.head.appendChild(loaderScript);

    return () => {
      configScript.remove();
      loaderScript.remove();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-md w-full relative overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Offer preview */}
        {offer.image && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">{offer.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>

          {/* Locker content area */}
          <div
            ref={containerRef}
            className="border-2 border-dashed border-primary/30 rounded-xl p-6 bg-primary/5"
          >
            <div className="animate-pulse flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-foreground">
                🔒 Complete an offer to unlock your reward
              </p>
              <p className="text-xs text-muted-foreground">
                The content locker will appear shortly...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLocker;
