import { useState, useEffect } from "react";
import { getSettings, saveSettings } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { toast } from "sonner";

const LockerSettings = () => {
  const [script, setScript] = useState("");

  useEffect(() => {
    setScript(getSettings().lockerScript);
  }, []);

  const handleSave = () => {
    const settings = getSettings();
    saveSettings({ ...settings, lockerScript: script });
    toast.success("Content locker script saved!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Content Locker Settings</h1>
      <div className="bg-card border border-border rounded-xl p-6">
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
        <Button onClick={handleSave} className="gradient-primary text-primary-foreground">
          <Save className="w-4 h-4 mr-2" /> Save Script
        </Button>
      </div>
    </div>
  );
};

export default LockerSettings;
