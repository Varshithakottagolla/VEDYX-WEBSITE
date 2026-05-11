"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [data, setData] = useState({
    heading: "We Provide\nSolutions that",
    brandText: "Scale Your BRAND",
    subItems: ["Build", "Innovate", "Grow"],
    ctaText: "Book a meeting",
    ctaLink: "/contact",
    backgroundVideo:
      "https://v1.pinimg.com/videos/mc/720p/9d/87/80/9d878016056576ec2059ecb2cbdc677b.mp4",
  });

  useEffect(() => {
    fetch("/api/admin/data?section=hero")
      .then((r) => r.json())
      .then((d) => { if (d && !d.error) setData(d); })
      .catch(() => { });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          key={data.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full opacity-50"
        >
          <source src={data.backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-[1]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-start justify-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter max-w-5xl leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {data.heading.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
          <span className="text-[#5ce1e6]">{data.brandText}</span>
        </motion.h1>

        <motion.div
          className="mt-8 text-xl md:text-2xl text-gray-300 max-w-2xl font-medium tracking-wide flex flex-col space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {data.subItems.map((item, i) => (
            <span key={i} className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-[#5ce1e6] rounded-full" />
              <span>{item}</span>
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href={data.ctaLink}
            className="border-2 border-primary/50 text-white px-8 py-4 rounded-[40px] text-lg font-bold hover:bg-primary/10 transition-all duration-300 inline-block backdrop-blur-sm"
          >
            {data.ctaText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
