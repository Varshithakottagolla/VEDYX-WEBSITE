"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { articles as staticArticles } from "@/lib/articles";

export default function BlogPage() {
  const [articles, setArticles] = useState(staticArticles);

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          // Merge dynamic articles with static ones, avoiding duplicates by slug
          const dynamicSlugs = new Set(d.map(a => a.slug));
          const filteredStatic = staticArticles.filter(a => !dynamicSlugs.has(a.slug));
          setArticles([...d, ...filteredStatic]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-black min-h-screen pt-32 pb-24 text-white">
      <div className="container mx-auto px-6 max-w-4xl flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-20 text-center"
        >
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-8 border border-white/10">
            <BookOpen className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Blogs</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Creative <span className="text-[#5ce1e6]">Insights</span> That <span className="text-[#5ce1e6]">Convert</span>
          </h1>
        </motion.div>

        {/* Blog List Section */}
        <div className="w-full flex flex-col space-y-12">
          {articles.map((article, index) => (
            <Link href={`/blog/${article.slug}`} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="group flex flex-col md:flex-row items-center md:items-start gap-8 cursor-pointer"
              >
                {/* Image */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="aspect-[16/9] md:aspect-[3/2] rounded-[24px] overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-2/3 flex flex-col justify-center py-2 md:py-4">
                  <h2 className="text-xl md:text-2xl font-bold leading-tight mb-4 group-hover:text-gray-300 transition-colors">
                    {article.title}
                  </h2>
                  <div className="text-gray-400 text-base md:text-lg flex flex-col space-y-1">
                    <span>{article.date}</span>
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
