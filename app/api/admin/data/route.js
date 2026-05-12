import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { supabase } from "@/lib/supabase";

const DATA_DIR = path.join(process.cwd(), "lib", "data");

// Helper to check if Supabase is configured
const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here';

function readJsonLocal(file) {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJsonLocal(file, data) {
  const filePath = path.join(DATA_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/admin/data?section=hero
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  const validSections = ["hero", "about", "stats", "videos", "portfolio", "contacts", "process", "social_links"];
  if (!section || !validSections.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  // Use Supabase if configured
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('section', section)
      .single();

    if (!error && data) return NextResponse.json(data.data);
    
    // If not in Supabase yet, fallback to local JSON but warn
    const localData = readJsonLocal(`${section}.json`);
    return NextResponse.json(localData || { error: "Not found" }, { status: localData ? 200 : 404 });
  }

  // Local fallback
  const data = readJsonLocal(`${section}.json`);
  if (data === null) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(data);
}

// POST /api/admin/data?section=hero
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  const validSections = ["hero", "about", "stats", "videos", "portfolio", "contacts", "process", "social_links"];
  if (!section || !validSections.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const body = await request.json();

  // Use Supabase if configured
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('site_content')
      .upsert({ section, data: body });

    if (error) {
      console.error('Supabase save error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, provider: 'supabase' });
  }

  // Local fallback
  writeJsonLocal(`${section}.json`, body);
  return NextResponse.json({ success: true, provider: 'local' });
}
