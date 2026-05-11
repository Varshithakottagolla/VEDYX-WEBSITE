"use client";

import { useState, useEffect } from "react";
import { BarChart2, Save, RefreshCw, Plus, Trash2 } from "lucide-react";

export default function StatsAdmin() {
  const [stats, setStats] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data?section=stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/data?section=stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stats),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addStat = () =>
    setStats((s) => [...s, { id: Date.now().toString(), value: "0", label: "New Stat" }]);

  const removeStat = (id) => setStats((s) => s.filter((stat) => stat.id !== id));

  const updateStat = (id, field, val) =>
    setStats((s) => s.map((stat) => (stat.id === id ? { ...stat, [field]: val } : stat)));

  if (!stats) return <LoadingState />;

  return (
    <div className="max-w-3xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center flex-shrink-0">
          <BarChart2 size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Stats Section</h1>
          <p className="text-gray-500 text-sm mt-0.5">Edit the key metrics displayed on the homepage.</p>
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-[#111] border border-white/5 rounded-2xl p-4 flex gap-4 items-center"
          >
            <div className="w-14 h-14 rounded-xl bg-[#5ce1e6]/10 border border-[#5ce1e6]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[#5ce1e6] font-bold text-xs text-center leading-tight px-1">{stat.value}</span>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Value</label>
                <input
                  value={stat.value}
                  onChange={(e) => updateStat(stat.id, "value", e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 50M+"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Label</label>
                <input
                  value={stat.label}
                  onChange={(e) => updateStat(stat.id, "label", e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Total Views"
                />
              </div>
            </div>
            <button
              onClick={() => removeStat(stat.id)}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addStat}
        className="mt-4 flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 px-4 py-2.5 rounded-xl transition-all border border-teal-500/20"
      >
        <Plus size={14} /> Add New Stat
      </button>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-400 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && <span className="text-green-400 text-sm font-medium">✓ Saved!</span>}
      </div>
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
  "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/40 transition-all";
