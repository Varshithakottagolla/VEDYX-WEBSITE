import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "lib", "data");

function readJson(file) {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJson(file, data) {
  const filePath = path.join(DATA_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/admin/data?section=hero
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  const validSections = ["hero", "about", "stats", "videos", "portfolio", "contacts"];
  if (!section || !validSections.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const data = readJson(`${section}.json`);
  if (data === null) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(data);
}

// POST /api/admin/data?section=hero
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  const validSections = ["hero", "about", "stats", "videos", "portfolio", "contacts"];
  if (!section || !validSections.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const body = await request.json();
  writeJson(`${section}.json`, body);

  return NextResponse.json({ success: true });
}
