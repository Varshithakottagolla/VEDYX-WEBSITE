import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import Link from "next/link";

export default function BlogPost({ params }) {
  const { slug } = params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen pt-32 pb-24 text-white">
      <div className="container mx-auto px-6 max-w-3xl">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center text-[#5ce1e6] hover:text-white transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-400 text-sm gap-y-4 gap-x-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {article.date}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {article.readTime}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden mb-16 border border-white/10">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Real Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-headings:text-white prose-li:text-gray-300 marker:text-[#5ce1e6]">
          {article.content.map((block, index) => {
            if (block.type === "p") {
              return <p key={index} className="leading-relaxed">{block.text}</p>;
            }
            if (block.type === "h2") {
              return <h2 key={index} className="text-2xl md:text-3xl font-bold mt-12 mb-6">{block.text}</h2>;
            }
            if (block.type === "ul") {
              return (
                <ul key={index} className="space-y-4 mb-8">
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>

      </div>
    </div>
  );
}
