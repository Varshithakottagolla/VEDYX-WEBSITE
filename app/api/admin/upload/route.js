import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

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

    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), "public", folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const filename = `${timestamp}_${originalName}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/${folder}/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
