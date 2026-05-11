"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, RefreshCw, Check, ChevronDown, ChevronUp } from "lucide-react";

export default function InquiriesAdmin() {
  const [contacts, setContacts] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const fetchContacts = () =>
    fetch("/api/contact")
      .then((r) => r.json())
      .then(setContacts);

  useEffect(() => { fetchContacts(); }, []);

  const markRead = async (id) => {
    await fetch(`/api/contact?id=${id}`, { method: "PATCH" });
    fetchContacts();
  };

  const deleteContact = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
    fetchContacts();
  };

  const toggleExpand = async (id) => {
    if (expanded !== id) {
      setExpanded(id);
      const contact = contacts.find((c) => c.id === id);
      if (contact && !contact.read) markRead(id);
    } else {
      setExpanded(null);
    }
  };

  if (!contacts) return <LoadingState />;

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div className="max-w-3xl">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-pink-400 flex items-center justify-center flex-shrink-0">
          <Mail size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Contact Inquiries</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {contacts.length} total · {unread} unread
          </p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <Mail size={36} className="mx-auto mb-3 opacity-30" />
          <p>No inquiries yet.</p>
          <p className="text-xs mt-1">Submissions from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c) => (
            <div
              key={c.id}
              className={`bg-[#111] border rounded-2xl transition-all duration-200 ${
                !c.read ? "border-pink-500/20" : "border-white/5"
              }`}
            >
              <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                onClick={() => toggleExpand(c.id)}
              >
                {/* Unread dot */}
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    !c.read ? "bg-pink-400" : "bg-transparent border border-white/10"
                  }`}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className={`text-sm font-semibold ${!c.read ? "text-white" : "text-gray-400"}`}>
                      {c.name}
                    </p>
                    <span className="text-gray-700 text-xs">{c.email}</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-0.5 truncate">{c.message}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-gray-700 text-xs hidden sm:block">
                    {new Date(c.receivedAt).toLocaleDateString()}
                  </span>
                  {expanded === c.id ? (
                    <ChevronUp size={14} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={14} className="text-gray-500" />
                  )}
                </div>
              </div>

              {expanded === c.id && (
                <div className="px-4 pb-4 border-t border-white/5 pt-4">
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div>
                      <p className="text-gray-600 mb-1">Name</p>
                      <p className="text-white font-medium">{c.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Email</p>
                      <a href={`mailto:${c.email}`} className="text-pink-400 hover:underline">{c.email}</a>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600 mb-1">Received</p>
                      <p className="text-white">{new Date(c.receivedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-xl p-3 mb-4">
                    <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">Message</p>
                    <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{c.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${c.email}?subject=Re: Your Vedyx Inquiry`}
                      className="flex items-center gap-1.5 text-xs bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 px-3 py-2 rounded-lg transition-all"
                    >
                      <Mail size={12} /> Reply
                    </a>
                    {!c.read && (
                      <button
                        onClick={() => markRead(c.id)}
                        className="flex items-center gap-1.5 text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-2 rounded-lg transition-all"
                      >
                        <Check size={12} /> Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteContact(c.id)}
                      className="flex items-center gap-1.5 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg transition-all ml-auto"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center gap-3 text-gray-500">
      <RefreshCw size={16} className="animate-spin" />
      <span className="text-sm">Loading...</span>
    </div>
  );
}
