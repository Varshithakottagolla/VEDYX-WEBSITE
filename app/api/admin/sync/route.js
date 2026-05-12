import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { articles } from "@/lib/articles";
import fs from "fs";
import path from "path";

export async function POST() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    // 1. Sync Articles
    // We use upsert by 'slug' to avoid duplicates
    const { error: articlesError } = await supabase
      .from("articles")
      .upsert(
        articles.map(a => ({
          ...a,
          content: a.content // This is already a JSON array
        })),
        { onConflict: 'slug' }
      );

    if (articlesError) throw articlesError;

    // 2. Sync Social Links
    const socialPath = path.join(process.cwd(), "lib", "data", "social_links.json");
    if (fs.existsSync(socialPath)) {
      const socialData = JSON.parse(fs.readFileSync(socialPath, "utf-8"));
      const { error: socialError } = await supabase
        .from("site_content")
        .upsert({
          section: "social_links",
          data: socialData
        }, { onConflict: 'section' });
      
      if (socialError) throw socialError;
    }

    // 3. Sync other default data if they exist
    const sections = ["hero", "about", "stats", "videos", "portfolio", "services", "process"];
    for (const section of sections) {
      const sectionPath = path.join(process.cwd(), "lib", "data", `${section}.json`);
      if (fs.existsSync(sectionPath)) {
        const data = JSON.parse(fs.readFileSync(sectionPath, "utf-8"));
        await supabase
          .from("site_content")
          .upsert({ section, data }, { onConflict: 'section' });
      }
    }

    return NextResponse.json({ message: "Sync successful" });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
