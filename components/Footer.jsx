import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#757575] text-white pt-20 pb-8 rounded-t-[40px] mt-10">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Giant Logo */}
        <div className="w-full flex justify-center mb-16 overflow-hidden">
          <Link href="/" className="select-none">
            <img 
              src="/images/logo.svg" 
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
            <div className="flex gap-4">
              <a href="https://www.instagram.com/themahishow_/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-lg border-2 border-white flex items-center justify-center hover:bg-white hover:text-[#757575] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="w-12 h-12 rounded-lg border-2 border-white flex items-center justify-center hover:bg-white hover:text-[#757575] transition-colors">
                <Linkedin size={24} />
              </a>
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
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-white/20 hover:text-white/60 text-xs transition-all duration-300 group"
            title="Admin"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px]">Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
