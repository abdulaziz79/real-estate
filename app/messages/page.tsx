"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Message } from "@/types";

function MessagesContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [activeChat, setActiveChat] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const targetId = searchParams.get("targetId");
    const targetName = searchParams.get("targetName");
    if (targetId && targetName) {
      setActiveChat({ id: targetId, name: decodeURIComponent(targetName) });
    }
  }, [searchParams]);

  if (!user) return <div className="pt-40 text-center font-bold text-2xl">Access Denied. Please log in.</div>;

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeChat) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      receiverId: activeChat.id,
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="pt-20 h-screen bg-slate-50 flex">
      <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto hidden md:block">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold">Inbox</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {activeChat ? (
            <div className="p-6 bg-blue-50 border-l-4 border-blue-600 flex gap-4 cursor-pointer">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-600">{activeChat.name.charAt(0)}</div>
              <div>
                <p className="font-bold text-slate-900">{activeChat.name}</p>
                <p className="text-sm text-blue-600 truncate">Online</p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 italic text-sm">No recent chats. Start a conversation from an agent&apos;s profile.</div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full">
        {activeChat ? (
          <>
            <div className="bg-white p-6 border-b border-slate-200 flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 md:hidden">{activeChat.name.charAt(0)}</div>
              <h3 className="font-bold text-lg">{activeChat.name}</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-slate-400 py-10">
                  <p className="bg-slate-100 w-fit mx-auto px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 tracking-tighter">This is the start of your history</p>
                  <p>Your communication with {activeChat.name} is private and secure.</p>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === user.id ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] p-4 rounded-3xl ${msg.senderId === user.id ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border border-slate-200 rounded-tl-none shadow-sm"}`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-[10px] mt-1 ${msg.senderId === user.id ? "text-white/60" : "text-slate-400"}`}>{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="p-6 bg-white border-t border-slate-200">
              <div className="max-w-4xl mx-auto flex gap-4">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 bg-slate-100 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <p className="text-lg font-bold">Direct Messaging</p>
            <p className="max-w-xs text-center mt-2">Select an agent or user to start chatting. Only authenticated users can access the comms center.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>}>
      <MessagesContent />
    </Suspense>
  );
}
