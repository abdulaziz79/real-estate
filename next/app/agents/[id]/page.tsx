"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_AGENTS, MOCK_PROPERTIES } from "@/constants";
import { PropertyCard } from "@/components/PropertyCard";
import { useAuth } from "@/context/AuthContext";
import { Agent } from "@/types";

export default function AgentDetail() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | undefined>(MOCK_AGENTS.find((a) => a.id === id));
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const agentProperties = MOCK_PROPERTIES.filter((p) => p.agentId === id);

  if (!agent) return <div className="pt-40 text-center">Agent not found.</div>;

  const handleMessage = () => {
    if (!user) {
      alert("Please sign in to message this agent.");
      return;
    }
    router.push(`/messages?targetId=${encodeURIComponent(agent.userId || agent.id)}&targetName=${encodeURIComponent(agent.name)}`);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const newReview = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      rating,
      comment: reviewText,
      date: new Date().toISOString().split("T")[0],
    };
    const updatedAgent = {
      ...agent,
      reviews: [newReview, ...agent.reviews],
      reviewCount: agent.reviewCount + 1,
      rating: Number(((agent.rating * agent.reviewCount + rating) / (agent.reviewCount + 1)).toFixed(1)),
    };
    setAgent(updatedAgent);
    setReviewText("");
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-xl sticky top-24">
              <div className="text-center mb-8">
                <img src={agent.image} className="w-48 h-48 rounded-[2.5rem] object-cover mx-auto shadow-2xl border-4 border-white mb-6" alt={agent.name} />
                <h1 className="text-3xl font-bold text-slate-900">{agent.name}</h1>
                <p className="text-blue-600 font-bold text-lg mb-4">{agent.role}</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-amber-400 text-xl">★</span>
                  <span className="font-bold text-slate-900 text-xl">{agent.rating}</span>
                  <span className="text-slate-400 text-sm">({agent.reviewCount} reviews)</span>
                </div>
                <button
                  onClick={handleMessage}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  Message {agent.name.split(" ")[0]}
                </button>
              </div>
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((spec) => (
                    <span key={spec} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-semibold">{spec}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Bio</h2>
              <p className="text-slate-600 text-lg leading-relaxed">{agent.bio}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Reviews & Feedback</h2>
              {user && user.role === "user" && (
                <form onSubmit={submitReview} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
                  <h3 className="font-bold mb-4 text-lg">Leave a Review</h3>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button key={i} type="button" onClick={() => setRating(i)} className={`text-2xl ${i <= rating ? "text-amber-400" : "text-slate-200"}`}>★</button>
                    ))}
                  </div>
                  <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 mb-4" placeholder="Share your experience..." rows={3} required />
                  <button type="submit" className="bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-all">Submit Feedback</button>
                </form>
              )}
              <div className="space-y-6">
                {agent.reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-6 rounded-3xl border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-slate-900">{rev.userName}</p>
                        <p className="text-amber-400">{"★".repeat(rev.rating)}</p>
                      </div>
                      <span className="text-slate-400 text-sm">{rev.date}</span>
                    </div>
                    <p className="text-slate-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {agentProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
