"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { articles } from "@/lib/articles";

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-black text-white flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            <span className="text-white text-sm font-medium">Blogs</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            Latest From Vedyx
          </h2>
        </div>

        {/* 2-column Grid for Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 w-full">
          {articles.slice(0, 4).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <Link href={`/blog/${article.slug}`}>
                {/* Image Placeholder */}
                <div className="w-full aspect-[3/2] rounded-[24px] mb-4 overflow-hidden relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold mb-2 leading-snug group-hover:text-gray-300 transition-colors">
                    {article.title}
                  </h3>
                  
                  <div className="text-sm text-gray-400 flex flex-col">
                    <span className="mb-1">{article.date}</span>
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Link
            href="/blog"
            className="border border-white/20 hover:border-white text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            View More
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
