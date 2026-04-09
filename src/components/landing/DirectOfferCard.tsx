import { trackClick, type DirectOffer } from "@/lib/store";

const FLAG_URL = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

interface DirectOfferCardProps {
  offer: DirectOffer;
}

const DirectOfferCard = ({ offer }: DirectOfferCardProps) => {
  return (
    <a
      href={offer.offerUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick(offer.id, offer.title)}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border block"
    >
      {offer.image && (
        <div className="relative overflow-hidden h-40">
          <img
            src={offer.image}
            alt={offer.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-bold text-card-foreground mb-1">{offer.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
        <div className="flex items-center gap-2">
          <img
            src={FLAG_URL(offer.countryCode)}
            alt={offer.country}
            className="w-6 h-4 rounded-sm object-cover"
          />
          <span className="text-xs font-medium text-muted-foreground">{offer.country}</span>
        </div>
        <div className="mt-3 w-full text-center py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm group-hover:scale-[1.02] transition-transform">
          Get Offer
        </div>
      </div>
    </a>
  );
};

export default DirectOfferCard;
