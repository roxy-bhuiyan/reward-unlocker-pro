import { useState, useMemo } from "react";
import { getClicks, clearClicks, type ClickEvent } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Trash2, MousePointerClick, TrendingUp, Clock } from "lucide-react";

const ClickAnalytics = () => {
  const [clicks, setClicks] = useState<ClickEvent[]>(getClicks());

  const handleClear = () => {
    clearClicks();
    setClicks([]);
  };

  const offerStats = useMemo(() => {
    const map = new Map<string, { title: string; count: number; lastClick: number }>();
    clicks.forEach((c) => {
      const existing = map.get(c.offerId);
      if (existing) {
        existing.count++;
        existing.lastClick = Math.max(existing.lastClick, c.timestamp);
      } else {
        map.set(c.offerId, { title: c.offerTitle, count: c.count || 1, lastClick: c.timestamp });
      }
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [clicks]);

  const todayClicks = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return clicks.filter((c) => c.timestamp >= start.getTime()).length;
  }, [clicks]);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Click Analytics</h1>
        <Button variant="outline" onClick={handleClear} className="text-destructive border-destructive/30 hover:bg-destructive/10">
          <Trash2 className="w-4 h-4 mr-2" /> Clear Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl p-5 border border-border">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center mb-2">
            <MousePointerClick className="w-4 h-4 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Total Clicks</p>
          <p className="text-2xl font-bold text-card-foreground">{clicks.length}</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center mb-2">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Today's Clicks</p>
          <p className="text-2xl font-bold text-card-foreground">{todayClicks}</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center mb-2">
            <Clock className="w-4 h-4 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Unique Offers Clicked</p>
          <p className="text-2xl font-bold text-card-foreground">{offerStats.length}</p>
        </div>
      </div>

      {/* Per-Offer Breakdown */}
      <h2 className="text-lg font-semibold text-foreground mb-3">Clicks by Offer</h2>
      {offerStats.length === 0 ? (
        <p className="text-muted-foreground text-sm">No clicks recorded yet.</p>
      ) : (
        <div className="space-y-3">
          {offerStats.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-card-foreground truncate">{s.title}</p>
                <p className="text-xs text-muted-foreground">Last click: {formatTime(s.lastClick)}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">{s.count}</p>
                <p className="text-xs text-muted-foreground">clicks</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Clicks */}
      {clicks.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-foreground mb-3 mt-8">Recent Clicks</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {[...clicks].reverse().slice(0, 20).map((c, i) => (
              <div key={i} className="bg-card border border-border rounded-lg px-4 py-2 flex items-center justify-between text-sm">
                <span className="text-card-foreground font-medium">{c.offerTitle}</span>
                <span className="text-muted-foreground text-xs">{formatTime(c.timestamp)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ClickAnalytics;
