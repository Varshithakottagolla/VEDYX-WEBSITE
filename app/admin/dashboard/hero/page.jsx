"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Sparkles, Plus, Trash2 } from "lucide-react";

export default function HeroAdmin() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data?section=hero")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/data?section=hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addSubItem = () => setData((d) => ({ ...d, subItems: [...d.subItems, "New Item"] }));
  const removeSubItem = (i) =>
    setData((d) => ({ ...d, subItems: d.subItems.filter((_, idx) => idx !== i) }));
  const updateSubItem = (i, val) =>
    setData((d) => ({
      ...d,
      subItems: d.subItems.map((item, idx) => (idx === i ? val : item)),
    }));

  if (!data) return <LoadingState />;

  return (
    <div className="max-w-3xl">
      <PageHeader
        icon={Sparkles}
        title="Hero Section"
        desc="Edit the homepage hero headline, CTA and background video."
      />

      <div className="space-y-5 mt-8">
        <Field label="Main Heading" hint="Use \\n for line breaks">
          <textarea
            rows={3}
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
            className={inputClass}
          />
        </Field>

        <Field label="Brand / Highlighted Text">
          <input
            value={data.brandText}
            onChange={(e) => setData({ ...data, brandText: e.target.value })}
            className={inputClass}
          />
        </Field>

        <Field label="Sub-items (Build / Innovate / Grow)">
          <div className="space-y-2">
            {data.subItems.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) => updateSubItem(i, e.target.value)}
                  className={inputClass + " flex-1"}
                />
                <button
                  onClick={() => removeSubItem(i)}
                  className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={addSubItem}
              className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors mt-2"
            >
              <Plus size={14} /> Add item
            </button>
          </div>
        </Field>

        <Field label="CTA Button Text">
          <input
            value={data.ctaText}
            onChange={(e) => setData({ ...data, ctaText: e.target.value })}
            className={inputClass}
          />
        </Field>

        <Field label="CTA Button Link">
          <input
            value={data.ctaLink}
            onChange={(e) => setData({ ...data, ctaLink: e.target.value })}
            className={inputClass}
          />
        </Field>

        <Field label="Background Video URL (direct .mp4 link)">
          <input
            value={data.backgroundVideo}
            onChange={(e) => setData({ ...data, backgroundVideo: e.target.value })}
            className={inputClass}
          />
          {data.backgroundVideo && (
            <video
              key={data.backgroundVideo}
              src={data.backgroundVideo}
              className="mt-3 w-full rounded-xl aspect-video object-cover opacity-60 border border-white/10"
              muted
              autoPlay
              loop
              playsInline
            />
          )}
        </Field>
      </div>

      <SaveBar saving={saving} saved={saved} onSave={save} />
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function PageHeader({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
      <label className="block text-sm font-semibold text-gray-300 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-600 mb-3">{hint}</p>}
      {children}
    </div>
  );
}

function SaveBar({ saving, saved, onSave }) {
  return (
    <div className="mt-8 flex items-center gap-4">
      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_4px_15px_rgba(168,85,247,0.3)]"
      >
        {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
        {saving ? "Saving..." : "Save Changes"}
      </button>
      {saved && (
        <span className="text-green-400 text-sm font-medium animate-pulse">
          ✓ Saved successfully!
        </span>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center gap-3 text-gray-500">
      <RefreshCw size={16} className="animate-spin" />
      <span className="text-sm">Loading...</span>
    </div>
  );
}

const inputClass =
  "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all";
