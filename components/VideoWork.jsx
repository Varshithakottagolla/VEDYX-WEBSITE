"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function VideoWork() {
  const [videos, setVideos] = useState([
    { id: "1", src: "/videos/v1.mp4" },
    { id: "2", src: "/videos/v2.mp4" },
    { id: "3", src: "/videos/v3.mp4" },
  ]);

  useEffect(() => {
    fetch("/api/admin/data?section=videos")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setVideos(d); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-black overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-6 mb-16 flex flex-col items-center">
        <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
          <Zap size={16} className="text-white" />
          <span className="text-white text-sm font-medium">Our Work</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center text-white">
          Our <span className="text-[#5ce1e6]">Creative</span> Work
        </h2>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="w-full aspect-[9/16] rounded-[32px] overflow-hidden border border-white/10 bg-gray-900 relative"
            >
              <video
                src={vid.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
