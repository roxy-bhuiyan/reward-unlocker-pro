import { Button } from "@/components/ui/button";
import type { Offer } from "@/lib/store";

interface OfferCardProps {
  offer: Offer;
  onGetNow: (offer: Offer) => void;
}

const OfferCard = ({ offer, onGetNow }: OfferCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border">
      <div className="relative overflow-hidden h-48">
        <img
          src={offer.image}
          alt={offer.title}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-card-foreground mb-1">{offer.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
        <Button
          onClick={() => onGetNow(offer)}
          className="w-full gradient-primary text-primary-foreground font-semibold rounded-xl hover:scale-[1.02] transition-transform"
        >
          Get Now
        </Button>
      </div>
    </div>
  );
};

export default OfferCard;
