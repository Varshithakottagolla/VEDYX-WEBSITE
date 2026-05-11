import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const CONTACTS_PATH = path.join(process.cwd(), "lib", "data", "contacts.json");

function readContacts() {
  if (!fs.existsSync(CONTACTS_PATH)) return [];
  return JSON.parse(fs.readFileSync(CONTACTS_PATH, "utf-8"));
}

function writeContacts(data) {
  fs.writeFileSync(CONTACTS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/contact — read all contact submissions
export async function GET() {
  return NextResponse.json(readContacts());
}

// POST /api/contact — save new submission
export async function POST(request) {
  const body = await request.json();
  const contacts = readContacts();
  const entry = {
    id: Date.now().toString(),
    ...body,
    receivedAt: new Date().toISOString(),
    read: false,
  };
  contacts.unshift(entry); // newest first
  writeContacts(contacts);
  return NextResponse.json({ success: true });
}

// DELETE /api/contact?id=xxx
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const contacts = readContacts().filter((c) => c.id !== id);
  writeContacts(contacts);
  return NextResponse.json({ success: true });
}

// PATCH /api/contact?id=xxx — mark as read
export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const contacts = readContacts().map((c) =>
    c.id === id ? { ...c, read: true } : c
  );
  writeContacts(contacts);
  return NextResponse.json({ success: true });
}
