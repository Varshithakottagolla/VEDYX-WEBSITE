import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { MessageCircle } from "lucide-react";

export const metadata = {
  title: "Vedyx | Growth-Focused Strategy",
  description: "Vedyx is a full-service digital marketing agency that helps businesses grow with data-driven strategies, viral content, and performance-first campaigns.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/917013050719"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        >
          <MessageCircle size={32} />
        </a>
      </body>
    </html>
  );
}
