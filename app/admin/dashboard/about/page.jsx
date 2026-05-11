"use client";

import { useState, useEffect } from "react";
import { Info, Save, RefreshCw } from "lucide-react";

export default function AboutAdmin() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data?section=about")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/data?section=about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!data) return <LoadingState />;

  return (
    <div className="max-w-3xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center flex-shrink-0">
          <Info size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">About Us Section</h1>
          <p className="text-gray-500 text-sm mt-0.5">Update the main paragraph shown in the About section.</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
        <label className="block text-sm font-semibold text-gray-300 mb-3">About Us Text</label>
        <textarea
          rows={6}
          value={data.text}
          onChange={(e) => setData({ ...data, text: e.target.value })}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all resize-none"
        />
        <p className="text-xs text-gray-600 mt-2">{data.text.length} characters</p>
      </div>

      {/* Preview */}
      <div className="mt-5 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Preview</p>
        <p className="text-white/80 text-lg font-medium leading-relaxed">{data.text}</p>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_4px_15px_rgba(59,130,246,0.3)]"
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
