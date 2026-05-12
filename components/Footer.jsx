"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  Send,
  Twitter,
  MessageCircle,
} from "lucide-react";

// Pinterest doesn't exist in lucide-react, so we use a simple SVG inline
function PinterestIcon({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const defaultLinks = {
  instagram: "https://www.instagram.com/themahishow_/",
  linkedin: "https://www.linkedin.com/company/dummy-vedyx",
  youtube: "https://www.youtube.com/@themahishowtelugu",
  facebook: "https://www.facebook.com/dummy-vedyx",
  telegram: "https://t.me/MANASchool1",
  pinterest: "https://www.pinterest.com/dummy-vedyx",
  twitter: "https://twitter.com/dummy-vedyx",
};

const socialConfig = [
  { key: "instagram", icon: Instagram, label: "Instagram" },
  { key: "linkedin",  icon: Linkedin,  label: "LinkedIn"  },
  { key: "youtube",   icon: Youtube,   label: "YouTube"   },
  { key: "facebook",  icon: Facebook,  label: "Facebook"  },
  { key: "telegram",  icon: Send,      label: "Telegram"  },
  { key: "pinterest", icon: PinterestIcon, label: "Pinterest" },
  { key: "twitter",   icon: Twitter,   label: "Twitter"   },
  { key: "whatsapp",  icon: MessageCircle, label: "WhatsApp" },
];

export default function Footer() {
  const [links, setLinks] = useState(defaultLinks);

  useEffect(() => {
    fetch("/api/admin/data?section=social_links")
      .then((r) => r.json())
      .then((data) => { 
        if (data && !data.error && Object.keys(data).length > 0) {
          setLinks(data); 
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-[#757575] text-white pt-20 pb-8 rounded-t-[40px] mt-10">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Giant Logo */}
        <div className="w-full flex justify-center mb-16 overflow-hidden">
          <Link href="/" className="select-none">
            <img
              src="/images/logo.png"
              alt="Vedyx Logo"
              className="w-[60vw] md:w-[40vw] max-w-4xl h-auto"
            />
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-white/20 pb-12">
          {/* Left Side */}
          <div className="max-w-md">
            <p className="text-xl md:text-2xl font-medium mb-6">
              Growth-focused solutions that help your business succeed and stand out
            </p>
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3">
              {socialConfig.map(({ key, icon: Icon, label }) => (
                <a
                  key={key}
                  href={links[key] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-lg border-2 border-white flex items-center justify-center hover:bg-white hover:text-[#757575] transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Navigation */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-6">Navigation</h4>
            <ul className="space-y-4 font-medium text-lg">
              <li>
                <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:opacity-70 transition-opacity">Services</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm font-medium">
          <p>© {new Date().getFullYear()} – Vedyx</p>
        </div>
      </div>
    </footer>
  );
}
