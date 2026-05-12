import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import path from "path";
import fs from "fs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${Date.now()}_${originalName}`;

    // 1. USE SUPABASE STORAGE IF CONFIGURED
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.storage
        .from('media') 
        .upload(`${folder}/${filename}`, buffer, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Supabase upload error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(`${folder}/${filename}`);

      return NextResponse.json({ success: true, url: publicUrl });
    }

    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
