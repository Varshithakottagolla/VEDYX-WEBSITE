import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import fs from "fs";
import path from "path";

const ARTICLES_PATH = path.join(process.cwd(), "lib", "articles.js");

// ... local helpers ...

// GET /api/admin/articles
export async function GET() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json(data);
    }
  }
  return NextResponse.json([]);
}

// POST /api/admin/articles
export async function POST(request) {
  const body = await request.json();

  if (isSupabaseConfigured) {
    // Normalize keys for Supabase
    const normalizedBody = {
      title: body.title,
      slug: body.slug,
      date: body.date || new Date().toLocaleDateString(),
      author: body.author || "Admin",
      read_time: body.read_time || body.readTime || "5 min read",
      image: body.image || "/images/placeholder.jpg",
      content: body.content || []
    };

    const { data, error } = await supabase
      .from('articles')
      .insert([normalizedBody])
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, article: data[0] });
  }

  return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
}

// PUT /api/admin/articles
export async function PUT(request) {
  const body = await request.json();
  const { slug, ...updates } = body;

  if (isSupabaseConfigured) {
    // Normalize updates for Supabase
    const normalizedUpdates = { ...updates };
    if (updates.readTime) {
      normalizedUpdates.read_time = updates.readTime;
      delete normalizedUpdates.readTime;
    }

    const { error } = await supabase
      .from('articles')
      .update(normalizedUpdates)
      .eq('slug', slug);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
}

// DELETE /api/admin/articles?slug=xxx
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('slug', slug);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
}
