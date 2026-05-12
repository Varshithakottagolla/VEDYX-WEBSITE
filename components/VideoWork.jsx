"use client";

import { motion } from "framer-motion";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function VideoWork() {
  const [videos, setVideos] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("/api/admin/data?section=videos")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setVideos(d); })
      .catch(() => {});
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')) return { type: 'direct', url };
    if (url.includes('youtube.com/shorts/')) {
      const id = url.split('/shorts/')[1]?.split('?')[0];
      return { type: 'embed', url: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}` };
    }
    if (url.includes('youtube.com/watch?v=') || url.includes('youtu.be/')) {
      const id = url.includes('watch?v=') ? url.split('v=')[1]?.split('&')[0] : url.split('be/')[1]?.split('?')[0];
      return { type: 'embed', url: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}` };
    }
    if (url.includes('instagram.com/reel/') || url.includes('instagram.com/reels/')) {
      const id = url.split('/reel/')[1]?.split('/')[0] || url.split('/reels/')[1]?.split('/')[0];
      return { type: 'embed', url: `https://www.instagram.com/reel/${id}/embed` };
    }
    return { type: 'direct', url };
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - (clientWidth * 0.8) : scrollLeft + (clientWidth * 0.8);
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="videos" className="py-24 bg-black overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-6 mb-12 flex flex-col items-center">
        <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
          <Zap size={16} className="text-white" />
          <span className="text-white text-sm font-medium">Our Work</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center text-white">
          Our <span className="text-[#5ce1e6]">Creative</span> Work
        </h2>
      </div>

      <div className="w-full relative">
        {/* Slider Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-8 scrollbar-hide snap-x snap-mandatory pb-8 px-6 md:px-20"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((vid, idx) => {
            const media = getEmbedUrl(vid.src);
            return (
              <motion.div
                key={vid.id || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex-shrink-0 w-[85%] md:w-[calc(33.333%-22px)] aspect-[9/16] rounded-[32px] overflow-hidden border border-white/10 bg-gray-900 relative snap-center"
              >
                <div className="w-full h-full relative">
                  {media.type === 'direct' ? (
                    <video
                      src={media.url}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <iframe
                      src={media.url}
                      className="absolute inset-0 w-full h-full border-none overflow-hidden"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ height: '100%', width: '100%' }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="container mx-auto max-w-6xl flex justify-end gap-3 mt-4 pr-6">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5ce1e6]/10 border border-[#5ce1e6]/20 flex items-center justify-center text-[#5ce1e6] hover:bg-[#5ce1e6] hover:text-black transition-all duration-300"
            aria-label="Previous videos"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5ce1e6]/10 border border-[#5ce1e6]/20 flex items-center justify-center text-[#5ce1e6] hover:bg-[#5ce1e6] hover:text-black transition-all duration-300"
            aria-label="Next videos"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
