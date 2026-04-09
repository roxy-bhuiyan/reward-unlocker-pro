import { useState, useEffect } from "react";
import { getSettings, saveSettings, type LockerType } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Save, Code, Link } from "lucide-react";
import { toast } from "sonner";

const LockerSettings = () => {
  const [lockerType, setLockerType] = useState<LockerType>("script");
  const [script, setScript] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const s = getSettings();
    setLockerType(s.lockerType || "script");
    setScript(s.lockerScript);
    setLink(s.lockerLink || "");
  }, []);

  const handleSave = () => {
    const settings = getSettings();
    saveSettings({ ...settings, lockerType, lockerScript: script, lockerLink: link });
    toast.success("Content locker settings saved!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Content Locker Settings</h1>
      <div className="bg-card border border-border rounded-xl p-6">
        {/* Type Tabs */}
        <div className="flex border border-border rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => setLockerType("script")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              lockerType === "script"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code className="w-4 h-4" /> Javascript
          </button>
          <button
            onClick={() => setLockerType("link")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              lockerType === "link"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Link className="w-4 h-4" /> URL (Link)
          </button>
        </div>

        {lockerType === "script" ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Paste your AdBlueMedia content locker script below. It will be shown when users click "Get Now".
            </p>
            <Textarea
              rows={10}
              placeholder='<script src="https://adbluemedia.com/..."></script>'
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="font-mono text-sm mb-4"
            />
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Paste your AdBlueMedia direct locker URL. Users will be redirected to this link which instantly locks with the selected content locker.
            </p>
            <Input
              placeholder="https://your-deployment-url.com/8d03b3c"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="font-mono text-sm mb-4"
            />
          </>
        )}

        <Button onClick={handleSave} className="gradient-primary text-primary-foreground">
          <Save className="w-4 h-4 mr-2" /> Save Settings
        </Button>
      </div>
    </div>
  );
};

export default LockerSettings;
