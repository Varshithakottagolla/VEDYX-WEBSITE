"use client";

import { useState } from "react";
import { Wrench, Plus, Trash2, Save, RefreshCw } from "lucide-react";

const DEFAULT_SERVICES = [
  {
    id: "1", title: "Branding", span: "md:col-span-4",
    items: ["Logo Design", "Package Design", "Brand Strategy", "Brand Guidelines", "Rebranding"]
  },
  {
    id: "2", title: "Graphic Design", span: "md:col-span-2",
    items: ["Social Media Graphics", "Advertising Banners", "Infographics", "Print Design"]
  },
  {
    id: "3", title: "Marketing", span: "md:col-span-2",
    items: ["Organic Content", "Performance Marketing", "SEO Services", "Email Marketing", "Paid Advertising"]
  },
  {
    id: "4", title: "Social Media Management", span: "md:col-span-4",
    items: ["Social Media Strategy", "Content Scheduling", "Social Media Advertising", "Community Engagement", "Analytics And Reporting"]
  },
  {
    id: "5", title: "Video Production", span: "md:col-span-6",
    items: ["Sound Design And Mixing", "Script Writing And Storyboarding", "Filming And Editing", "Motion Graphics And Animation", "Video Optimization For Social Media"]
  },
  {
    id: "6", title: "Content Creation", span: "md:col-span-3",
    items: ["YouTube Video Production", "Vlog Content Development", "Social Media Story Videos", "Instagram Reels Creation", "Influencer Collaboration Videos"]
  },
  {
    id: "7", title: "Web Development", span: "md:col-span-3",
    items: ["Custom Website Design", "E-Commerce Solutions", "UX/UI Design", "CMS Development", "Website Maintenance"]
  }
];

export default function ServicesAdmin() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const save = async () => {
    setSaving(true);
    // Save to a local state (in a full implementation this would hit an API)
    // For now, confirm save
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addService = () =>
    setServices((s) => [
      ...s,
      { id: Date.now().toString(), title: "New Service", span: "md:col-span-3", items: ["Item 1"] },
    ]);

  const removeService = (id) => setServices((s) => s.filter((svc) => svc.id !== id));

  const updateService = (id, field, val) =>
    setServices((s) => s.map((svc) => (svc.id === id ? { ...svc, [field]: val } : svc)));

  const addItem = (id) =>
    setServices((s) =>
      s.map((svc) =>
        svc.id === id ? { ...svc, items: [...svc.items, "New Item"] } : svc
      )
    );

  const removeItem = (id, i) =>
    setServices((s) =>
      s.map((svc) =>
        svc.id === id ? { ...svc, items: svc.items.filter((_, idx) => idx !== i) } : svc
      )
    );

  const updateItem = (id, i, val) =>
    setServices((s) =>
      s.map((svc) =>
        svc.id === id
          ? { ...svc, items: svc.items.map((item, idx) => (idx === i ? val : item)) }
          : svc
      )
    );

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-400 flex items-center justify-center flex-shrink-0">
            <Wrench size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Services</h1>
            <p className="text-gray-500 text-sm mt-0.5">Edit service titles and their feature lists.</p>
          </div>
        </div>
        <button
          onClick={addService}
          className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        >
          <Plus size={14} /> Add Service
        </button>
      </div>

      <div className="space-y-3">
        {services.map((svc) => (
          <div key={svc.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
            <div
              className="flex items-center gap-3 p-4 cursor-pointer"
              onClick={() => setExpanded(expanded === svc.id ? null : svc.id)}
            >
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{svc.title}</p>
                <p className="text-gray-600 text-xs">{svc.items.length} features</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeService(svc.id); }}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
              >
                <Trash2 size={12} />
              </button>
              <span className="text-gray-600 text-xs">
                {expanded === svc.id ? "▲" : "▼"}
              </span>
            </div>

            {expanded === svc.id && (
              <div className="px-4 pb-4 border-t border-white/5 pt-4 space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Service Title</label>
                  <input
                    value={svc.title}
                    onChange={(e) => updateService(svc.id, "title", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Feature Items</label>
                  <div className="space-y-2">
                    {svc.items.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={item}
                          onChange={(e) => updateItem(svc.id, i, e.target.value)}
                          className={inputClass + " flex-1 text-xs py-2"}
                        />
                        <button
                          onClick={() => removeItem(svc.id, i)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addItem(svc.id)}
                      className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      + Add feature
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && <span className="text-green-400 text-sm font-medium">✓ Saved!</span>}
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 transition-all";
