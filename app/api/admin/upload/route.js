import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { supabase } from "@/lib/supabase";

// Helper to check if Supabase is configured
const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "uploads"; // "images/work", "images/blogs", "videos"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const filename = `${timestamp}_${originalName}`;

    // 1. USE SUPABASE STORAGE IF CONFIGURED
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.storage
        .from('media') // Make sure you create a public bucket named 'media' in Supabase
        .upload(`${folder}/${filename}`, buffer, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Supabase upload error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(`${folder}/${filename}`);

      return NextResponse.json({ success: true, url: publicUrl });
    }

    // 2. LOCAL FALLBACK (FOR DEVELOPMENT ONLY)
    const uploadDir = path.join(process.cwd(), "public", folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    const localUrl = `/${folder}/${filename}`;
    return NextResponse.json({ success: true, url: localUrl });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
