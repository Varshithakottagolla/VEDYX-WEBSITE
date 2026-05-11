"use client";

import { motion } from "framer-motion";
import { Eye, Banknote, Bookmark, CheckSquare, UserPlus, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";

const iconMap = { Eye, Banknote, Bookmark, CheckSquare, UserPlus, Globe2 };
const iconKeys = ["Eye", "Banknote", "Bookmark", "CheckSquare", "UserPlus", "Globe2"];

export default function Stats() {
  const [stats, setStats] = useState([
    { id: "1", value: "50M+", label: "Total views generated" },
    { id: "2", value: "1Cr+", label: "Total Revenue" },
    { id: "3", value: "25+", label: "Total Brands" },
    { id: "4", value: "40L+", label: "Total Impressions" },
    { id: "5", value: "3+", label: "Total Creators" },
    { id: "6", value: "20+", label: "Countries Reached" },
  ]);

  useEffect(() => {
    fetch("/api/admin/data?section=stats")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setStats(d); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = iconMap[iconKeys[index % iconKeys.length]];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-[#5ce1e6] p-8 rounded-[32px] flex flex-col justify-between text-black h-[220px]"
              >
                <div className="mb-auto">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10">
                    <Icon strokeWidth={2.5} size={24} className="text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2 tracking-tight">{stat.value}</h3>
                  <p className="text-black/80 font-medium text-base">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
