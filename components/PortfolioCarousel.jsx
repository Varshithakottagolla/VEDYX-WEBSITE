"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function PortfolioCarousel() {
  const [images, setImages] = useState([
    { id: "1", src: "/images/work/1.jpg" },
    { id: "2", src: "/images/work/2.jpg" },
    { id: "3", src: "/images/work/3.jpg" },
    { id: "4", src: "/images/work/4.jpg" },
  ]);

  useEffect(() => {
    fetch("/api/admin/data?section=portfolio")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) {
          setImages(d);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="work" className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 text-sm text-gray-300"
        >
          <Zap size={16} />
          <span>Our Work</span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Explore Our <span className="text-[#5ce1e6]">Creative Portfolio</span>
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={img.id || index}
              className="w-full aspect-video rounded-xl overflow-hidden relative group cursor-pointer bg-gray-900 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1, duration: 0.6 }}
            >
              <img 
                src={img.src} 
                alt="Portfolio work" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white text-xs font-semibold border border-white/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#5ce1e6] rounded-full animate-pulse"></span>
                  View Work
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
