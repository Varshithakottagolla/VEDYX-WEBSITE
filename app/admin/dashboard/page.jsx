"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles, Info, BarChart2, Video, Image,
  FileText, Mail, Wrench, TrendingUp, ArrowRight,
  RefreshCw, Cloud, AlertCircle
} from "lucide-react";

const sections = [
  { label: "Hero Section", desc: "Edit headline, CTA and background", href: "/admin/dashboard/hero", icon: Sparkles, color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/20" },
  { label: "About Us", desc: "Update the about paragraph", href: "/admin/dashboard/about", icon: Info, color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/20" },
  { label: "Stats", desc: "Edit key metrics & numbers", href: "/admin/dashboard/stats", icon: BarChart2, color: "from-teal-500/20 to-teal-500/5", border: "border-teal-500/20" },
  { label: "Videos", desc: "Manage work showcase videos", href: "/admin/dashboard/videos", icon: Video, color: "from-red-500/20 to-red-500/5", border: "border-red-500/20" },
  { label: "Portfolio", desc: "Add/remove portfolio images", href: "/admin/dashboard/portfolio", icon: Image, color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/20" },
  { label: "Blog Posts", desc: "Create, edit or delete articles", href: "/admin/dashboard/blogs", icon: FileText, color: "from-green-500/20 to-green-500/5", border: "border-green-500/20" },
  { label: "Services", desc: "Edit service offerings", href: "/admin/dashboard/services", icon: Wrench, color: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/20" },
  { label: "Social Links", desc: "Manage footer social URLs", href: "/admin/dashboard/social-links", icon: TrendingUp, color: "from-pink-500/20 to-pink-500/5", border: "border-pink-500/20" },
  { label: "Inquiries", desc: "View contact form submissions", href: "/admin/dashboard/inquiries", icon: Mail, color: "from-indigo-500/20 to-indigo-500/5", border: "border-indigo-500/20" },
];

export default function DashboardOverview() {
  const [counts, setCounts] = useState({ blogs: 0, inquiries: 0, videos: 0 });
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = () => {
    Promise.all([
      fetch("/api/admin/articles").then((r) => r.json()).catch(() => []),
      fetch("/api/admin/data?section=videos").then((r) => r.json()).catch(() => []),
      fetch("/api/contact").then((r) => r.json()).catch(() => []),
    ]).then(([blogs, videos, contacts]) => {
      setCounts({
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        videos: Array.isArray(videos) ? videos.length : 0,
        inquiries: Array.isArray(contacts) ? contacts.filter((c) => !c.read).length : 0,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSync = async () => {
    if (!confirm("This will migrate your local articles and social links to the cloud (Supabase). Continue?")) return;
    
    setSyncing(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
      const data = await res.json();
      
      if (res.ok) {
        setSyncStatus("success");
        fetchData();
      } else {
        setSyncStatus("error");
        setErrorMessage(data.error || "Unknown error occurred during sync");
      }
    } catch (err) {
      setSyncStatus("error");
      setErrorMessage(err.message || "Network error occurred");
    }
    setSyncing(false);
    setTimeout(() => { if (syncStatus === 'success') setSyncStatus(null); }, 5000);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage all Vedyx website content from here.
          </p>
        </div>
        
        {/* Sync Button */}
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all group"
          >
            <RefreshCw size={16} className={`text-blue-400 ${syncing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            {syncing ? 'Syncing to Cloud...' : 'Sync to Cloud'}
            {syncStatus === 'success' && <span className="text-green-400 ml-2">✓ Success</span>}
          </button>
          
          {syncStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg animate-pulse">
              <AlertCircle size={14} />
              {errorMessage}
            </div>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Blog Posts", value: counts.blogs, icon: FileText, color: "text-green-400" },
          { label: "Work Videos", value: counts.videos, icon: Video, color: "text-red-400" },
          { label: "New Inquiries", value: counts.inquiries, icon: Mail, color: "text-pink-400" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Icon size={18} className={s.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-gray-600 text-xs">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section cards */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
        Manage Content
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`group bg-gradient-to-b ${s.color} border ${s.border} rounded-2xl p-5 hover:scale-[1.02] transition-all duration-200`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon size={20} className="text-white/80" />
                <ArrowRight
                  size={14}
                  className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </div>
              <p className="font-semibold text-white text-sm mb-1">{s.label}</p>
              <p className="text-gray-500 text-xs">{s.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="mt-10 bg-[#111] border border-white/5 rounded-2xl p-5">
        <p className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
          <Cloud size={14} className="text-blue-400" />
          Quick Links
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="/" target="_blank" rel="noreferrer" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg transition-colors">
            View Live Site →
          </a>
          <a href="/blog" target="_blank" rel="noreferrer" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg transition-colors">
            View Blog →
          </a>
          <a href="/services" target="_blank" rel="noreferrer" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg transition-colors">
            View Services →
          </a>
        </div>
      </div>
    </div>
  );
}
