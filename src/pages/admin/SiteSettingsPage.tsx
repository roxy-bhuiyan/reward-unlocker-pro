import { useState, useEffect } from "react";
import { getSettings, saveSettings } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, X } from "lucide-react";
import { toast } from "sonner";

const SiteSettingsPage = () => {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [newNotif, setNewNotif] = useState("");

  useEffect(() => {
    const s = getSettings();
    setHeroTitle(s.heroTitle);
    setHeroSubtitle(s.heroSubtitle);
    setCtaText(s.ctaText);
    setNotifications(s.notifications);
  }, []);

  const handleSave = () => {
    const s = getSettings();
    saveSettings({ ...s, heroTitle, heroSubtitle, ctaText, notifications });
    toast.success("Site settings saved!");
  };

  const addNotification = () => {
    if (newNotif.trim()) {
      setNotifications([...notifications, newNotif.trim()]);
      setNewNotif("");
    }
  };

  const removeNotification = (i: number) => {
    setNotifications(notifications.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Site Settings</h1>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-card-foreground">Hero Title</label>
          <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-card-foreground">Hero Subtitle</label>
          <Input value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-card-foreground">CTA Button Text</label>
          <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="mt-1" />
        </div>

        <div>
          <label className="text-sm font-medium text-card-foreground">Fake Notifications</label>
          <div className="flex gap-2 mt-2">
            <Input placeholder="e.g. John from USA just unlocked..." value={newNotif} onChange={(e) => setNewNotif(e.target.value)} />
            <Button onClick={addNotification} size="icon" className="gradient-primary text-primary-foreground flex-shrink-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2 mt-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm">
                <span className="flex-1 text-foreground">{n}</span>
                <button onClick={() => removeNotification(i)} className="text-muted-foreground hover:text-destructive">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="gradient-primary text-primary-foreground">
          <Save className="w-4 h-4 mr-2" /> Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SiteSettingsPage;
