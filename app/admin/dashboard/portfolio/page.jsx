"use client";

import { useState, useEffect, useRef } from "react";
import { Image, Plus, Trash2, Save, RefreshCw, Upload } from "lucide-react";

export default function PortfolioAdmin() {
  const [images, setImages] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    fetch("/api/admin/data?section=portfolio")
      .then((r) => r.json())
      .then(setImages);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/data?section=portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(images),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const removeImage = (id) => setImages((imgs) => imgs.filter((img) => img.id !== id));

  const addByUrl = () => {
    if (!newUrl.trim()) return;
    setImages((imgs) => [...imgs, { id: Date.now().toString(), src: newUrl.trim() }]);
    setNewUrl("");
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "images/work");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) {
      setImages((imgs) => [...imgs, { id: Date.now().toString(), src: data.url }]);
    }
    setUploading(false);
  };

  if (!images) return <LoadingState />;

  return (
    <div className="max-w-4xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center flex-shrink-0">
          <Image size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Portfolio Images</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage images shown in the scrolling marquee portfolio.</p>
        </div>
      </div>

      {/* Add image */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-5 mb-6">
        <p className="text-sm font-semibold text-gray-300 mb-4">Add New Image</p>
        <div className="flex gap-3 flex-wrap">
          <div className="flex gap-2 flex-1 min-w-[260px]">
            <input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://example.com/image.jpg or /images/work/img.png"
              className={inputClass + " flex-1"}
            />
            <button
              onClick={addByUrl}
              className="px-4 py-2.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-xl text-sm font-semibold transition-all border border-orange-500/20 whitespace-nowrap"
            >
              Add URL
            </button>
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={uploadFile}
              className="hidden"
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm font-semibold transition-all border border-white/10 disabled:opacity-50"
            >
              <Upload size={14} />
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        </div>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative group rounded-2xl overflow-hidden border border-white/5 aspect-video bg-[#111]"
          >
            <img
              src={img.src}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => removeImage(img.id)}
                className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-xl transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
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
  "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all";
