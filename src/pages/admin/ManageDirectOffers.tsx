import { useState, useEffect } from "react";
import { getDirectOffers, saveDirectOffers, type DirectOffer } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Save } from "lucide-react";

const FLAG_URL = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

const ManageDirectOffers = () => {
  const [offers, setOffers] = useState<DirectOffer[]>([]);
  const [editing, setEditing] = useState<DirectOffer | null>(null);

  useEffect(() => { setOffers(getDirectOffers()); }, []);

  const save = (updated: DirectOffer[]) => {
    setOffers(updated);
    saveDirectOffers(updated);
  };

  const toggleEnable = (id: string) => {
    save(offers.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o)));
  };

  const deleteOffer = (id: string) => {
    save(offers.filter((o) => o.id !== id));
  };

  const addNew = () => {
    setEditing({
      id: Date.now().toString(),
      title: "",
      description: "",
      image: "",
      offerUrl: "#",
      country: "USA",
      countryCode: "US",
      enabled: true,
    });
  };

  const saveEdit = () => {
    if (!editing) return;
    const exists = offers.find((o) => o.id === editing.id);
    if (exists) {
      save(offers.map((o) => (o.id === editing.id ? editing : o)));
    } else {
      save([...offers, editing]);
    }
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Manage Direct Offers</h1>
        <Button onClick={addNew} className="gradient-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Offer
        </Button>
      </div>

      {editing && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6 animate-slide-up">
          <h2 className="font-semibold text-card-foreground mb-4">{editing.title ? "Edit Offer" : "New Offer"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <Input placeholder="Image URL" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
            <Input placeholder="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="sm:col-span-2" />
            <Input placeholder="Offer URL" value={editing.offerUrl} onChange={(e) => setEditing({ ...editing, offerUrl: e.target.value })} className="sm:col-span-2" />
            <Input placeholder="Country (e.g. USA)" value={editing.country} onChange={(e) => setEditing({ ...editing, country: e.target.value })} />
            <Input placeholder="Country Code (e.g. US)" value={editing.countryCode} onChange={(e) => setEditing({ ...editing, countryCode: e.target.value.toUpperCase() })} />
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={saveEdit} className="gradient-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" /> Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <img src={FLAG_URL(offer.countryCode)} alt={offer.country} className="w-6 h-4 rounded-sm object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-card-foreground truncate">{offer.title}</p>
              <p className="text-sm text-muted-foreground truncate">{offer.country} • {offer.description}</p>
            </div>
            <Switch checked={offer.enabled} onCheckedChange={() => toggleEnable(offer.id)} />
            <Button variant="ghost" size="icon" onClick={() => setEditing(offer)}>
              <Save className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => deleteOffer(offer.id)} className="text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDirectOffers;
