import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "lib", "data");
const ARTICLES_PATH = path.join(process.cwd(), "lib", "articles.js");

function readArticles() {
  // Read the articles.js file and extract the array
  const content = fs.readFileSync(ARTICLES_PATH, "utf-8");
  // Extract just the JSON part (the array)
  const match = content.match(/export const articles = (\[[\s\S]*\]);/);
  if (!match) return [];
  try {
    return eval(match[1]); // Safe in server context since we control the file
  } catch {
    return [];
  }
}

function writeArticles(articles) {
  const content = `export const articles = ${JSON.stringify(articles, null, 2)};\n`;
  fs.writeFileSync(ARTICLES_PATH, content, "utf-8");
}

// GET /api/admin/articles
export async function GET() {
  const articles = readArticles();
  return NextResponse.json(articles);
}

// POST /api/admin/articles — create new article
export async function POST(request) {
  const body = await request.json();
  const articles = readArticles();

  const newArticle = {
    ...body,
    id: Date.now().toString(),
  };
  articles.push(newArticle);
  writeArticles(articles);

  return NextResponse.json({ success: true, article: newArticle });
}

// PUT /api/admin/articles — update article by slug
export async function PUT(request) {
  const body = await request.json();
  const { slug, ...updates } = body;

  const articles = readArticles();
  const index = articles.findIndex((a) => a.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  articles[index] = { ...articles[index], ...updates };
  writeArticles(articles);

  return NextResponse.json({ success: true });
}

// DELETE /api/admin/articles?slug=xxx
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const articles = readArticles();
  const filtered = articles.filter((a) => a.slug !== slug);
  writeArticles(filtered);

  return NextResponse.json({ success: true });
}
