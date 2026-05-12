"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Sparkles,
  Info,
  BarChart2,
  Video,
  Image,
  FileText,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Wrench,
  Grip,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Hero Section", href: "/admin/dashboard/hero", icon: Sparkles },
  { label: "About Us", href: "/admin/dashboard/about", icon: Info },
  { label: "Stats", href: "/admin/dashboard/stats", icon: BarChart2 },
  { label: "Videos", href: "/admin/dashboard/videos", icon: Video },
  { label: "Portfolio", href: "/admin/dashboard/portfolio", icon: Image },
  { label: "Blog Posts", href: "/admin/dashboard/blogs", icon: FileText },
  { label: "Our Process", href: "/admin/dashboard/process", icon: Grip },
  { label: "Services", href: "/admin/dashboard/services", icon: Wrench },
  { label: "Inquiries", href: "/admin/dashboard/inquiries", icon: Mail },
];

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("vedyx_admin_auth");
    if (!auth) router.push("/admin");
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("vedyx_admin_auth");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0f0f0f] border-r border-white/5 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <div>
              <p className="font-bold text-white text-sm tracking-wide">Vedyx Admin</p>
              <p className="text-gray-600 text-xs">Content Manager</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${active
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-500/10 text-white border border-purple-500/20"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon
                  size={16}
                  className={active ? "text-purple-400" : "text-gray-600 group-hover:text-gray-300"}
                />
                {item.label}
                {active && (
                  <ChevronRight size={14} className="ml-auto text-purple-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center gap-4 px-4 py-3 bg-[#0f0f0f] border-b border-white/5 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={22} />
          </button>
          <p className="font-semibold text-sm text-white">Vedyx Admin</p>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
