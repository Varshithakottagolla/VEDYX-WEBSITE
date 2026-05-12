import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

// Helper to check if Supabase is configured
const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here';

const ARTICLES_PATH = path.join(process.cwd(), "lib", "articles.js");

function readArticlesLocal() {
  if (!fs.existsSync(ARTICLES_PATH)) return [];
  const content = fs.readFileSync(ARTICLES_PATH, "utf-8");
  const match = content.match(/export const articles = (\[[\s\S]*\]);/);
  if (!match) return [];
  try {
    return JSON.parse(match[1].replace(/'/g, '"').replace(/(\w+):/g, '"$1":')); // Crude conversion for eval-less parsing
  } catch {
    return [];
  }
}

// GET /api/admin/articles
export async function GET() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    // If we have data in Supabase, use it
    if (!error && data && data.length > 0) {
      return NextResponse.json(data);
    }
  }

  // Fallback to local if Supabase is empty or not configured
  const articles = readArticlesLocal();
  return NextResponse.json(articles);
}

// POST /api/admin/articles
export async function POST(request) {
  const body = await request.json();

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('articles')
      .insert([body])
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, article: data[0] });
  }

  return NextResponse.json({ error: "Supabase not configured for writes" }, { status: 500 });
}

// PUT /api/admin/articles
export async function PUT(request) {
  const body = await request.json();
  const { slug, ...updates } = body;

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('articles')
      .update(updates)
      .eq('slug', slug);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Supabase not configured for updates" }, { status: 500 });
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

  return NextResponse.json({ error: "Supabase not configured for deletes" }, { status: 500 });
}
