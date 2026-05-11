"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Marquee() {
  const [workImages, setWorkImages] = useState([
    { id: "1", src: "/images/work/w1.png" },
    { id: "2", src: "/images/work/w2.png" },
    { id: "3", src: "/images/work/w3.png" },
    { id: "4", src: "/images/work/w4.png" },
  ]);

  useEffect(() => {
    fetch("/api/admin/data?section=portfolio")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d) && d.length > 0) setWorkImages(d); })
      .catch(() => {});
  }, []);

  const srcs = workImages.map((img) => img.src);
  const firstRow = [...srcs, ...srcs, ...srcs];
  const secondRow = [...srcs, ...srcs, ...srcs].reverse();

  return (
    <section className="py-24 bg-black overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-6 mb-16 flex flex-col items-center">
        <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="text-white text-sm font-medium">Our Work</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-white">
          Explore Our <span className="text-[#5ce1e6]">Creative Portfolio</span>
        </h2>
      </div>

      <div className="w-[150vw] md:w-[120vw] relative left-1/2 -translate-x-1/2 flex flex-col gap-6 opacity-90">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {firstRow.map((img, idx) => (
              <div key={idx} className="w-[300px] md:w-[450px] aspect-[16/9] flex-shrink-0 rounded-3xl overflow-hidden border border-white/10">
                <img src={img} alt="Creative Work" className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {secondRow.map((img, idx) => (
              <div key={idx} className="w-[300px] md:w-[450px] aspect-[16/9] flex-shrink-0 rounded-3xl overflow-hidden border border-white/10">
                <img src={img} alt="Creative Work" className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
