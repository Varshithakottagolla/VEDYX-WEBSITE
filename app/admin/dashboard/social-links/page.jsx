"use client";

import { useState, useEffect } from "react";
import {
  Instagram, Linkedin, Youtube, Facebook, Send, Twitter, Save, CheckCircle, AlertCircle, Share2
} from "lucide-react";

// Pinterest SVG (not in lucide)
function PinterestIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const fields = [
  { key: "instagram",  label: "Instagram",  icon: Instagram,      placeholder: "https://www.instagram.com/yourhandle",   color: "text-pink-400" },
  { key: "linkedin",   label: "LinkedIn",   icon: Linkedin,       placeholder: "https://www.linkedin.com/company/yourco", color: "text-blue-400" },
  { key: "youtube",    label: "YouTube",    icon: Youtube,        placeholder: "https://www.youtube.com/@yourchannel",    color: "text-red-400"  },
  { key: "facebook",   label: "Facebook",   icon: Facebook,       placeholder: "https://www.facebook.com/yourpage",       color: "text-indigo-400"},
  { key: "telegram",   label: "Telegram",   icon: Send,           placeholder: "https://t.me/yourchannel",                color: "text-sky-400"  },
  { key: "pinterest",  label: "Pinterest",  icon: PinterestIcon,  placeholder: "https://www.pinterest.com/yourprofile",   color: "text-rose-400" },
  { key: "twitter",    label: "Twitter / X",icon: Twitter,        placeholder: "https://twitter.com/yourhandle",          color: "text-gray-300" },
];

const defaultLinks = {
  instagram: "https://www.instagram.com/themahishow_/",
  linkedin:  "https://www.linkedin.com/company/dummy-vedyx",
  youtube:   "https://www.youtube.com/@themahishowtelugu",
  facebook:  "https://www.facebook.com/dummy-vedyx",
  telegram:  "https://t.me/MANASchool1",
  pinterest: "https://www.pinterest.com/dummy-vedyx",
  twitter:   "https://twitter.com/dummy-vedyx",
};

export default function SocialLinksAdmin() {
  const [links, setLinks]   = useState(defaultLinks);
  const [status, setStatus] = useState(null); // "saving" | "saved" | "error"

  useEffect(() => {
    fetch("/api/admin/data?section=social_links")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setLinks(data); })
      .catch(() => {});
  }, []);

  const handleChange = (key, value) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/data?section=social_links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(links),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600/20 to-purple-600/20 border border-pink-500/20 flex items-center justify-center">
          <Share2 size={18} className="text-pink-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Social Links</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage all footer social media profile URLs</p>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {fields.map(({ key, label, icon: Icon, placeholder, color }) => (
          <div key={key} className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
              <span className={color}><Icon size={16} /></span>
              {label}
            </label>
            <input
              id={`social-${key}`}
              type="url"
              value={links[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            {links[key] && (
              <a
                href={links[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                ↗ Preview link
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-6 flex items-center gap-4">
        <button
          id="save-social-links"
          onClick={handleSave}
          disabled={status === "saving"}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
        >
          <Save size={16} />
          {status === "saving" ? "Saving…" : "Save Changes"}
        </button>

        {status === "saved" && (
          <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
            <CheckCircle size={16} /> Saved successfully
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-1.5 text-red-400 text-sm font-medium">
            <AlertCircle size={16} /> Failed to save
          </span>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-600">
        Changes are reflected on the live site footer immediately after saving.
      </p>
    </div>
  );
}
