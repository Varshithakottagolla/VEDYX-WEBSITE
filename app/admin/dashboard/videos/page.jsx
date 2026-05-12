"use client";

import { useState, useEffect, useRef } from "react";
import { Video, Plus, Trash2, Save, RefreshCw, Upload, Link as LinkIcon } from "lucide-react";

export default function VideosAdmin() {
  const [videos, setVideos] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [addMode, setAddMode] = useState("url"); // "url" | "file"
  const [newUrl, setNewUrl] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    fetch("/api/admin/data?section=videos")
      .then((r) => r.json())
      .then(setVideos);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/data?section=videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videos),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const removeVideo = (id) => setVideos((v) => v.filter((vid) => vid.id !== id));

  const addByUrl = () => {
    if (!newUrl.trim()) return;
    setVideos((v) => [
      ...v,
      { id: Date.now().toString(), src: newUrl.trim(), type: "url" },
    ]);
    setNewUrl("");
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "videos");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) {
      setVideos((v) => [
        ...v,
        { id: Date.now().toString(), src: data.url, type: "local" },
      ]);
    }
    setUploading(false);
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) return { type: 'direct', url };
    if (url.includes('youtube.com/shorts/')) {
      const id = url.split('/shorts/')[1]?.split('?')[0];
      return { type: 'embed', url: `https://www.youtube.com/embed/${id}` };
    }
    if (url.includes('youtube.com/watch?v=') || url.includes('youtu.be/')) {
      const id = url.includes('watch?v=') ? url.split('v=')[1]?.split('&')[0] : url.split('be/')[1]?.split('?')[0];
      return { type: 'embed', url: `https://www.youtube.com/embed/${id}` };
    }
    if (url.includes('instagram.com/reel/') || url.includes('instagram.com/reels/')) {
      const id = url.split('/reel/')[1]?.split('/')[0] || url.split('/reels/')[1]?.split('/')[0];
      return { type: 'embed', url: `https://www.instagram.com/reel/${id}/embed` };
    }
    return { type: 'direct', url };
  };

  if (!videos) return <LoadingState />;

  return (
    <div className="max-w-4xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center flex-shrink-0">
          <Video size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Work Videos</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage the videos shown in the "Our Creative Work" section.</p>
        </div>
      </div>

      {/* Add video */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-5 mb-6">
        <p className="text-sm font-semibold text-gray-300 mb-4">Add New Video</p>
        <div className="flex gap-2 mb-4">
          {["url", "file"].map((m) => (
            <button
              key={m}
              onClick={() => setAddMode(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                addMode === m
                  ? "bg-red-500/20 text-red-400 border border-red-500/20"
                  : "bg-white/5 text-gray-500 hover:text-gray-300"
              }`}
            >
              {m === "url" ? "🔗 Add via URL" : "📁 Upload File"}
            </button>
          ))}
        </div>

        {addMode === "url" ? (
          <div className="flex gap-2">
            <input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Paste YouTube, Instagram, or direct video URL"
              className={inputClass + " flex-1"}
            />
            <button
              onClick={addByUrl}
              className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl text-sm font-semibold transition-all border border-red-500/20"
            >
              Add
            </button>
          </div>
        ) : (
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              onChange={uploadFile}
              className="hidden"
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm font-semibold transition-all border border-white/10 disabled:opacity-50"
            >
              <Upload size={14} />
              {uploading ? "Uploading..." : "Choose Video File"}
            </button>
          </div>
        )}
      </div>

      {/* Video list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {videos.map((vid, idx) => {
          const media = getEmbedUrl(vid.src);
          return (
            <div
              key={vid.id || idx}
              className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden group relative"
            >
              <div className="w-full aspect-[9/16] bg-black/50 flex items-center justify-center relative">
                {media.type === 'direct' ? (
                  <video
                    src={media.url}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <iframe
                    src={media.url}
                    className="absolute inset-0 w-full h-full border-none overflow-hidden"
                    title="Video Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    style={{ height: '100%', width: '100%' }}
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3 pointer-events-none">
                <div className="pointer-events-auto w-full">
                  <p className="text-white text-[10px] truncate mb-2 opacity-60">{vid.src}</p>
                  <button
                    onClick={() => removeVideo(vid.id)}
                    className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/20 hover:bg-red-500/30 px-3 py-1.5 rounded-lg transition-all w-full justify-center border border-red-500/20"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-400 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
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
  "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all";
