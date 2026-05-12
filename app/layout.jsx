"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/916364926959");

  useEffect(() => {
    if (isAdminPage) return;
    fetch("/api/admin/data?section=social_links")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.whatsapp) {
          setWhatsappLink(data.whatsapp);
        }
      })
      .catch(() => {});
  }, [isAdminPage]);

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white">
        {!isAdminPage && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!isAdminPage && <Footer />}

        {/* Floating WhatsApp Button */}
        {!isAdminPage && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform duration-300 flex items-center justify-center"
          >
            <MessageCircle size={32} />
          </a>
        )}
      </body>
    </html>
  );
}
