import { X } from "lucide-react";

interface ContentLockerProps {
  offer: { title: string; image: string; description: string };
  onClose: () => void;
}

const ContentLocker = ({ offer, onClose }: ContentLockerProps) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-lg w-full relative overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Offer preview header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          {offer.image && (
            <img
              src={offer.image}
              alt={offer.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div className="text-left">
            <h3 className="font-bold text-foreground text-sm">{offer.title}</h3>
            <p className="text-xs text-muted-foreground">{offer.description}</p>
          </div>
        </div>

        {/* Locker iframe */}
        <iframe
          src="/locker.html"
          className="w-full border-0"
          style={{ height: "500px" }}
          title="Content Locker"
          allow="scripts"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
        />
      </div>
    </div>
  );
};

export default ContentLocker;
