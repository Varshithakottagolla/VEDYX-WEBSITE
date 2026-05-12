import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { supabase } from "@/lib/supabase";

const CONTACTS_PATH = path.join(process.cwd(), "lib", "data", "contacts.json");
const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here';

function readContactsLocal() {
  if (!fs.existsSync(CONTACTS_PATH)) return [];
  return JSON.parse(fs.readFileSync(CONTACTS_PATH, "utf-8"));
}

function writeContactsLocal(data) {
  fs.writeFileSync(CONTACTS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// Send email via Resend API
async function sendEmailNotification(entry) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL || "mahi.business5@gmail.com";

  if (!apiKey || apiKey === "re_your_api_key_here") return;

  const receivedTime = new Date(entry.received_at || entry.receivedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f8f8f8; padding: 32px; border-radius: 16px;">
      <h1 style="color: #111;">📬 New Contact Inquiry</h1>
      <p>Name: <strong>${entry.name}</strong></p>
      <p>Email: <strong>${entry.email}</strong></p>
      <p>Message:</p>
      <div style="background: white; padding: 16px; border-radius: 8px;">${entry.message}</div>
    </div>
  `;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Vedyx Contact Form <onboarding@resend.dev>",
        to: [notifyEmail],
        subject: `New Inquiry from ${entry.name} | Vedyx`,
        html,
      }),
    });
  } catch (err) {
    console.error("[Email] Failed to send notification:", err);
  }
}

// GET /api/contact
export async function GET() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('received_at', { ascending: false });

    if (!error) return NextResponse.json(data);
  }
  return NextResponse.json(readContactsLocal());
}

// POST /api/contact
export async function POST(request) {
  const body = await request.json();

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([body])
      .select();

    if (!error) {
      sendEmailNotification(data[0]).catch(console.error);
      return NextResponse.json({ success: true, inquiry: data[0] });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Local fallback
  const contacts = readContactsLocal();
  const entry = { ...body, id: Date.now().toString(), receivedAt: new Date().toISOString(), read: false };
  contacts.unshift(entry);
  writeContactsLocal(contacts);
  sendEmailNotification(entry).catch(console.error);
  return NextResponse.json({ success: true });
}

// DELETE /api/contact?id=xxx
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (isSupabaseConfigured) {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) return NextResponse.json({ success: true });
  }

  const contacts = readContactsLocal().filter((c) => c.id !== id);
  writeContactsLocal(contacts);
  return NextResponse.json({ success: true });
}

// PATCH /api/contact?id=xxx
export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (isSupabaseConfigured) {
    const { error } = await supabase.from('inquiries').update({ read: true }).eq('id', id);
    if (!error) return NextResponse.json({ success: true });
  }

  const contacts = readContactsLocal().map((c) => c.id === id ? { ...c, read: true } : c);
  writeContactsLocal(contacts);
  return NextResponse.json({ success: true });
}
