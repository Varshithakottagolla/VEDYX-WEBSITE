"use client";

import { useState, useEffect } from "react";
import { Grip, Save, RefreshCw } from "lucide-react";

export default function ProcessAdmin() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data?section=process")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/data?section=process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const updateStep = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  if (!data) return <LoadingState />;

  return (
    <div className="max-w-4xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center flex-shrink-0">
          <Grip size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Our Process</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage the 4 steps shown in the animated process section.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {data.map((step, idx) => (
          <div key={step.id} className="bg-[#111] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-6xl font-black text-white">{idx + 1}</span>
             </div>
             
             <div className="relative z-10">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Step {idx + 1} Title</label>
                <input
                  value={step.title}
                  onChange={(e) => updateStep(idx, "title", e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm mb-4 focus:ring-2 focus:ring-cyan-500/40 outline-none transition-all"
                />
                
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                <textarea
                  rows={4}
                  value={step.description}
                  onChange={(e) => updateStep(idx, "description", e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-cyan-500/40 outline-none transition-all resize-none"
                />
             </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_4px_20px_rgba(6,182,212,0.2)]"
        >
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && <span className="text-green-400 text-sm font-medium animate-in fade-in slide-in-from-left-2">✓ Saved successfully!</span>}
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
