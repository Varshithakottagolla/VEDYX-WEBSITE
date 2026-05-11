"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const [data, setData] = useState({
    text: "Achieve 24x Brand Growth through Strategic Content Marketing and High-Impact Visuals. Leverage Smart Distribution to build a loyal audience, boost conversion rates, and establish a dominant digital presence.",
  });

  useEffect(() => {
    fetch("/api/admin/data?section=about")
      .then((r) => r.json())
      .then((d) => { if (d && !d.error) setData(d); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-black text-white flex flex-col items-center overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-10 border border-white/10"
        >
          <User size={16} className="text-white" />
          <span className="text-white text-sm font-medium">About Us</span>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.4] max-w-5xl text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {data.text}
        </motion.h2>
      </div>
    </section>
  );
}
