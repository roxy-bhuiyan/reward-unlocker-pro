import { getOffers, getSettings, getClicks } from "@/lib/store";
import { Gift, Eye, Bell, Settings, MousePointerClick } from "lucide-react";

const DashboardOverview = () => {
  const offers = getOffers();
  const settings = getSettings();
  const active = offers.filter((o) => o.enabled).length;

  const clicks = getClicks();

  const stats = [
    { label: "Total Offers", value: offers.length, icon: Gift, color: "gradient-primary" },
    { label: "Active Offers", value: active, icon: Eye, color: "gradient-accent" },
    { label: "Total Clicks", value: clicks.length, icon: MousePointerClick, color: "gradient-primary" },
    { label: "Notifications", value: settings.notifications.length, icon: Bell, color: "gradient-accent" },
    { label: "Locker Status", value: settings.lockerScript ? "Active" : "Not Set", icon: Settings, color: "gradient-primary" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
