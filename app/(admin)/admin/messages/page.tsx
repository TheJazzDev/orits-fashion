"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/contact");
        if (res.ok) setMessages(await res.json());
      } catch {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  const toggleRead = async (id: string, read: boolean) => {
    try {
      const res = await fetch(`/api/contact`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: !read }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: !read } : m))
        );
      }
    } catch {
      toast.error("Failed to update message");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/contact`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        toast.success("Message deleted");
      }
    } catch {
      toast.error("Failed to delete message");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Messages</h1>
        <p className="text-stone-500 text-sm mt-1">
          Contact form submissions ({messages.filter((m) => !m.read).length}{" "}
          unread)
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-white border border-stone-200 animate-pulse"
            />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 bg-white border border-stone-200">
          <Mail size={48} className="mx-auto text-stone-300 mb-4" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">
            No messages yet
          </h3>
          <p className="text-stone-500 text-sm">
            Messages from your contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white border transition-colors ${
                !msg.read
                  ? "border-gold-200 bg-gold-50/20"
                  : "border-stone-200"
              }`}
            >
              <div
                className="p-4 cursor-pointer hover:bg-stone-50 transition-colors"
                onClick={() =>
                  setExpanded(expanded === msg.id ? null : msg.id)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {!msg.read && (
                      <div className="w-2 h-2 bg-gold-500 rounded-full shrink-0" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm ${!msg.read ? "font-semibold text-stone-900" : "text-stone-700"}`}
                        >
                          {msg.name}
                        </span>
                        {msg.subject && (
                          <span className="text-xs text-stone-400">
                            — {msg.subject}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400">{msg.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">
                      {new Date(msg.createdAt).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRead(msg.id, msg.read);
                      }}
                      className="p-1.5 text-stone-400 hover:text-stone-600 transition-colors"
                      title={msg.read ? "Mark as unread" : "Mark as read"}
                    >
                      {msg.read ? (
                        <MailOpen size={16} />
                      ) : (
                        <Mail size={16} />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(msg.id);
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {expanded === msg.id && (
                <div className="px-4 pb-4 pt-2 border-t border-stone-100">
                  {msg.phone && (
                    <p className="text-xs text-stone-500 mb-2">
                      Phone: {msg.phone}
                    </p>
                  )}
                  <p className="text-sm text-stone-700 whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
