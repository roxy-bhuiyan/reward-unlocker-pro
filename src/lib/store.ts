import xboxImg from "@/assets/xbox-card.jpg";
import playstationImg from "@/assets/playstation-card.jpg";
import netflixImg from "@/assets/netflix-card.jpg";
import amazonImg from "@/assets/amazon-card.jpg";
import cashappImg from "@/assets/cashapp-card.jpg";
import googleplayImg from "@/assets/googleplay-card.jpg";
import iphoneImg from "@/assets/iphone-card.jpg";

export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  redirectUrl: string;
  enabled: boolean;
}

export type LockerType = "script" | "link";

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  lockerType: LockerType;
  lockerScript: string;
  lockerLink: string;
  notifications: string[];
}

const DEFAULT_OFFERS: Offer[] = [
  { id: "1", title: "Xbox Gift Card", description: "Get a $50 Xbox Gift Card for free!", image: xboxImg, redirectUrl: "#", enabled: true },
  { id: "2", title: "PlayStation Gift Card", description: "Unlock a $50 PlayStation Store credit!", image: playstationImg, redirectUrl: "#", enabled: true },
  { id: "3", title: "Netflix Subscription", description: "Enjoy 3 months of Netflix Premium free!", image: netflixImg, redirectUrl: "#", enabled: true },
  { id: "4", title: "Amazon Gift Card", description: "Claim your $100 Amazon Gift Card now!", image: amazonImg, redirectUrl: "#", enabled: true },
  { id: "5", title: "Cash App Money", description: "Receive $75 directly to your Cash App!", image: cashappImg, redirectUrl: "#", enabled: true },
  { id: "6", title: "Google Play Balance", description: "Get $25 Google Play credit instantly!", image: googleplayImg, redirectUrl: "#", enabled: true },
  { id: "7", title: "iPhone Giveaway", description: "Win the latest iPhone — enter now!", image: iphoneImg, redirectUrl: "#", enabled: true },
];

const DEFAULT_SETTINGS: SiteSettings = {
  heroTitle: "Unlock Premium Rewards Instantly",
  heroSubtitle: "Complete a quick step to access your reward",
  ctaText: "Unlock Now",
  lockerType: "link",
  lockerScript: "",
  lockerLink: "https://unlockrewards.site/8d03b3c",
  notifications: [
    "John from USA just unlocked Xbox reward",
    "Sarah from UK claimed Netflix subscription",
    "Mike from Canada got Amazon Gift Card",
    "Emma from Australia unlocked PlayStation reward",
    "Alex from Germany claimed Cash App money",
  ],
};

export const DEFAULT_LOCKER_ORIGIN = new URL(DEFAULT_SETTINGS.lockerLink).origin;

export function normalizeLockerUrl(url: string): string {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) return "";
  if (/^https?:\/\//i.test(trimmedUrl)) return trimmedUrl;
  if (trimmedUrl.startsWith("//")) return `https:${trimmedUrl}`;
  if (trimmedUrl.startsWith("/")) return `${DEFAULT_LOCKER_ORIGIN}${trimmedUrl}`;
  if (!trimmedUrl.includes(".")) return `${DEFAULT_LOCKER_ORIGIN}/${trimmedUrl.replace(/^\/+/, "")}`;

  return `https://${trimmedUrl}`;
}

export function resolveLockerUrl(url: string, currentOrigin?: string): string {
  const normalizedUrl = normalizeLockerUrl(url);

  if (!normalizedUrl) return "";

  const parsedUrl = new URL(normalizedUrl);
  if (currentOrigin && parsedUrl.origin === currentOrigin) {
    return `${DEFAULT_LOCKER_ORIGIN}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  }

  return parsedUrl.toString();
}

export function getOffers(): Offer[] {
  const stored = localStorage.getItem("cpa_offers");
  return stored ? JSON.parse(stored) : DEFAULT_OFFERS;
}

export function saveOffers(offers: Offer[]) {
  localStorage.setItem("cpa_offers", JSON.stringify(offers));
}

export function getSettings(): SiteSettings {
  const stored = localStorage.getItem("cpa_settings");
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem("cpa_settings", JSON.stringify(settings));
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem("admin_auth") === "true";
}

export function adminLogin(password: string): boolean {
  if (password === "admin123") {
    sessionStorage.setItem("admin_auth", "true");
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem("admin_auth");
}

// --- Click Analytics ---

export interface ClickEvent {
  offerId: string;
  offerTitle: string;
  timestamp: number;
}

export function trackClick(offerId: string, offerTitle: string) {
  const clicks = getClicks();
  clicks.push({ offerId, offerTitle, timestamp: Date.now() });
  localStorage.setItem("cpa_clicks", JSON.stringify(clicks));
}

export function getClicks(): ClickEvent[] {
  const stored = localStorage.getItem("cpa_clicks");
  return stored ? JSON.parse(stored) : [];
}

export function clearClicks() {
  localStorage.removeItem("cpa_clicks");
}

// --- Direct CPA Offers ---

export interface DirectOffer {
  id: string;
  title: string;
  description: string;
  image: string;
  offerUrl: string;
  country: string;
  countryCode: string;
  enabled: boolean;
}

const DEFAULT_DIRECT_OFFERS: DirectOffer[] = [
  { id: "d1", title: "DailySurge - $1,000 Coke vs Pepsi", description: "Choose your side and win $1,000!", image: "", offerUrl: "#", country: "USA", countryCode: "US", enabled: true },
  { id: "d2", title: "GnG - 1k Amazon", description: "Win a $1,000 Amazon Gift Card!", image: "", offerUrl: "#", country: "USA", countryCode: "US", enabled: true },
  { id: "d3", title: "PrizeZappy - Chance to Win $50K", description: "Enter for a chance to win $50,000!", image: "", offerUrl: "#", country: "USA", countryCode: "US", enabled: true },
  { id: "d4", title: "CTConnect - PayPal $100", description: "Claim your $100 PayPal reward!", image: "", offerUrl: "#", country: "USA", countryCode: "US", enabled: true },
  { id: "d5", title: "BlueReen - Win a Tattoo", description: "Gewinne ein gratis Tattoo!", image: "", offerUrl: "#", country: "Germany", countryCode: "DE", enabled: true },
  { id: "d6", title: "BlueReen - Win a Specialized eBike", description: "Gewinne ein Specialized eBike!", image: "", offerUrl: "#", country: "Germany", countryCode: "DE", enabled: true },
  { id: "d7", title: "BlueReen - Win iPhone 17 Pro", description: "Gewinne das neue iPhone 17 Pro!", image: "", offerUrl: "#", country: "Germany", countryCode: "DE", enabled: true },
  { id: "d8", title: "RewardsFlow - Halloween SHEIN", description: "Win a SHEIN Halloween shopping spree!", image: "", offerUrl: "#", country: "Canada", countryCode: "CA", enabled: true },
];

export function getDirectOffers(): DirectOffer[] {
  const stored = localStorage.getItem("cpa_direct_offers");
  return stored ? JSON.parse(stored) : DEFAULT_DIRECT_OFFERS;
}

export function saveDirectOffers(offers: DirectOffer[]) {
  localStorage.setItem("cpa_direct_offers", JSON.stringify(offers));
}
