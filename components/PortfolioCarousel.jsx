"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function PortfolioCarousel() {
  const items = [1, 2, 3, 4, 5, 6];

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
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Explore Our <span className="text-primary">Creative Portfolio</span>
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="w-full aspect-video rounded-xl overflow-hidden relative group cursor-pointer bg-gray-900 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Replace with actual work images/videos */}
              <img 
                src="/images/placeholder.svg" 
                alt={`Portfolio item ${item}`} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Play
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
