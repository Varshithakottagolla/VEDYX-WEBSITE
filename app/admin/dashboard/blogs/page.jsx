"use client";

import { useState, useEffect, useRef } from "react";
import {
  FileText, Plus, Trash2, Save, RefreshCw,
  Edit3, X, Upload, ChevronDown, ChevronUp,
} from "lucide-react";

export default function BlogsAdmin() {
  const [articles, setArticles] = useState(null);
  const [editing, setEditing] = useState(null); // article being edited
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const fetchArticles = () =>
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then(setArticles);

  useEffect(() => { fetchArticles(); }, []);

  const openNew = () => {
    setIsNew(true);
    setEditing({
      title: "",
      slug: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
      author: "Manoj Pradeep",
      readTime: "5 min read",
      image: "",
      content: [{ type: "p", text: "" }],
    });
  };

  const openEdit = (article) => {
    setIsNew(false);
    setEditing({ ...article });
  };

  const closeEditor = () => { setEditing(null); setIsNew(false); };

  const saveArticle = async () => {
    setSaving(true);
    if (isNew) {
      await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    } else {
      await fetch("/api/admin/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: editing.slug, ...editing }),
      });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); closeEditor(); fetchArticles(); }, 1200);
  };

  const deleteArticle = async (slug) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    await fetch(`/api/admin/articles?slug=${slug}`, { method: "DELETE" });
    fetchArticles();
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "images/blogs");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setEditing((ed) => ({ ...ed, image: data.url }));
    setUploading(false);
  };

  const updateContent = (i, field, val) =>
    setEditing((ed) => ({
      ...ed,
      content: ed.content.map((block, idx) => (idx === i ? { ...block, [field]: val } : block)),
    }));

  const addBlock = (type) =>
    setEditing((ed) => ({
      ...ed,
      content: [...ed.content, type === "ul" ? { type, items: [""] } : { type, text: "" }],
    }));

  const removeBlock = (i) =>
    setEditing((ed) => ({ ...ed, content: ed.content.filter((_, idx) => idx !== i) }));

  const addListItem = (blockIdx) =>
    setEditing((ed) => ({
      ...ed,
      content: ed.content.map((block, idx) =>
        idx === blockIdx ? { ...block, items: [...block.items, ""] } : block
      ),
    }));

  const updateListItem = (blockIdx, itemIdx, val) =>
    setEditing((ed) => ({
      ...ed,
      content: ed.content.map((block, idx) =>
        idx === blockIdx
          ? { ...block, items: block.items.map((item, ii) => (ii === itemIdx ? val : item)) }
          : block
      ),
    }));

  const removeListItem = (blockIdx, itemIdx) =>
    setEditing((ed) => ({
      ...ed,
      content: ed.content.map((block, idx) =>
        idx === blockIdx
          ? { ...block, items: block.items.filter((_, ii) => ii !== itemIdx) }
          : block
      ),
    }));

  if (!articles) return <LoadingState />;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center flex-shrink-0">
            <FileText size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Blog Posts</h1>
            <p className="text-gray-500 text-sm mt-0.5">{articles.length} article(s) published</p>
          </div>
        </div>
        {!editing && (
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-400 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
          >
            <Plus size={14} /> New Post
          </button>
        )}
      </div>

      {/* Article list */}
      {!editing && (
        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article.slug}
              className="bg-[#111] border border-white/5 rounded-2xl p-4 flex items-center gap-4"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt=""
                  className="w-16 h-12 rounded-xl object-cover flex-shrink-0 border border-white/10"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{article.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{article.date} · {article.readTime}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(article)}
                  className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition-all"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => deleteArticle(article.slug)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {articles.length === 0 && (
            <p className="text-center text-gray-600 py-12">No articles yet. Click "New Post" to create one.</p>
          )}
        </div>
      )}

      {/* Editor */}
      {editing && (
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="font-bold text-white">{isNew ? "New Article" : "Edit Article"}</p>
            <button onClick={closeEditor} className="text-gray-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className={labelClass}>Title</label>
              <input
                value={editing.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = isNew
                    ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                    : editing.slug;
                  setEditing((ed) => ({ ...ed, title, slug }));
                }}
                className={inputClass}
                placeholder="Article title"
              />
            </div>

            {/* Slug */}
            <div>
              <label className={labelClass}>Slug (URL)</label>
              <input
                value={editing.slug}
                onChange={(e) => setEditing((ed) => ({ ...ed, slug: e.target.value }))}
                className={inputClass}
                placeholder="article-url-slug"
              />
            </div>

            {/* Meta row */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Date</label>
                <input
                  value={editing.date}
                  onChange={(e) => setEditing((ed) => ({ ...ed, date: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Author</label>
                <input
                  value={editing.author}
                  onChange={(e) => setEditing((ed) => ({ ...ed, author: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Read Time</label>
                <input
                  value={editing.readTime}
                  onChange={(e) => setEditing((ed) => ({ ...ed, readTime: e.target.value }))}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Cover image */}
            <div>
              <label className={labelClass}>Cover Image</label>
              <div className="flex gap-2 mb-2">
                <input
                  value={editing.image}
                  onChange={(e) => setEditing((ed) => ({ ...ed, image: e.target.value }))}
                  className={inputClass + " flex-1"}
                  placeholder="/images/blogs/image.jpg"
                />
                <input ref={fileRef} type="file" accept="image/*" onChange={uploadImage} className="hidden" />
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-semibold transition-all border border-white/10 whitespace-nowrap disabled:opacity-50"
                >
                  <Upload size={12} />
                  {uploading ? "..." : "Upload"}
                </button>
              </div>
              {editing.image && (
                <img
                  src={editing.image}
                  alt=""
                  className="w-full h-32 object-cover rounded-xl border border-white/10"
                />
              )}
            </div>

            {/* Content blocks */}
            <div>
              <label className={labelClass}>Content Blocks</label>
              <div className="space-y-3 mb-3">
                {editing.content.map((block, i) => (
                  <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <select
                        value={block.type}
                        onChange={(e) => updateContent(i, "type", e.target.value)}
                        className="bg-[#222] border border-white/10 text-gray-300 text-xs rounded-lg px-2 py-1 focus:outline-none"
                      >
                        <option value="p">Paragraph</option>
                        <option value="h2">Heading 2</option>
                        <option value="ul">Bullet List</option>
                      </select>
                      <button
                        onClick={() => removeBlock(i)}
                        className="ml-auto text-red-500 hover:text-red-400 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>

                    {block.type !== "ul" ? (
                      <textarea
                        rows={block.type === "h2" ? 1 : 3}
                        value={block.text || ""}
                        onChange={(e) => updateContent(i, "text", e.target.value)}
                        className="w-full bg-transparent text-white text-xs resize-none focus:outline-none placeholder-gray-700"
                        placeholder={block.type === "h2" ? "Heading text..." : "Paragraph text..."}
                      />
                    ) : (
                      <div className="space-y-1.5">
                        {(block.items || []).map((item, ii) => (
                          <div key={ii} className="flex gap-2">
                            <span className="text-gray-600 text-xs mt-1">•</span>
                            <input
                              value={item}
                              onChange={(e) => updateListItem(i, ii, e.target.value)}
                              className="flex-1 bg-transparent text-white text-xs focus:outline-none border-b border-white/10 pb-1"
                              placeholder="List item..."
                            />
                            <button
                              onClick={() => removeListItem(i, ii)}
                              className="text-red-500 hover:text-red-400 transition-colors"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addListItem(i)}
                          className="text-xs text-green-400 hover:text-green-300 transition-colors mt-1"
                        >
                          + Add item
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {["p", "h2", "ul"].map((type) => (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    className="text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
                  >
                    + {type === "p" ? "Paragraph" : type === "h2" ? "Heading" : "List"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
            <button
              onClick={saveArticle}
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? "Saving..." : isNew ? "Publish Article" : "Save Changes"}
            </button>
            {saved && <span className="text-green-400 text-sm font-medium">✓ Saved!</span>}
            <button
              onClick={closeEditor}
              className="text-gray-500 hover:text-white text-sm transition-colors ml-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center gap-3 text-gray-500">
      <RefreshCw size={16} className="animate-spin" />
      <span className="text-sm">Loading...</span>
    </div>
  );
}

const inputClass =
  "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-all";
const labelClass = "block text-xs font-semibold text-gray-400 mb-1.5";
