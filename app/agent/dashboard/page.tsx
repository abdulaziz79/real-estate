"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { MOCK_AGENTS, MOCK_PROPERTIES, COUNTRIES } from "@/constants";
import { Agent, Property } from "@/types";
import { PropertyCard } from "@/components/PropertyCard";
import { PaymentModal } from "@/components/PaymentModal";

export default function AgentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "listings">("profile");
  const [agent, setAgent] = useState<Agent | undefined>(undefined);
  const [listings, setListings] = useState<Property[]>([]);
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; property: Property | null }>({ isOpen: false, property: null });

  useEffect(() => {
    const agentData = MOCK_AGENTS.find((a) => a.id === user?.agentId);
    if (agentData) setAgent(agentData);
    if (user) {
      const saved = typeof window !== "undefined" ? localStorage.getItem("elite_realty_listings") : null;
      const allProps = saved ? JSON.parse(saved) : MOCK_PROPERTIES;
      const agentListings = allProps.filter((p: Property) => p.agentId === user?.agentId);
      setListings(agentListings);
    }
  }, [user]);

  if (!user || user.role !== "agent") {
    return <div className="pt-40 text-center text-2xl font-bold">Unauthorized. Agent access only.</div>;
  }

  if (!agent) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter">Agent Command</h1>
            <p className="text-slate-500 mt-2 font-medium">Verified Partner: <span className="text-blue-600">ID-{agent.id}</span></p>
          </div>
          <div className="flex bg-white p-2 rounded-3xl shadow-xl border border-slate-200">
            <button type="button" onClick={() => setActiveTab("profile")} className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === "profile" ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}>Identity</button>
            <button type="button" onClick={() => setActiveTab("listings")} className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === "listings" ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}>My Portfolio</button>
          </div>
        </div>

        {activeTab === "profile" ? (
          <div className="bg-white rounded-[3.5rem] border-8 border-white shadow-2xl overflow-hidden p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="shrink-0 text-center">
                <img src={agent.image} className="w-48 h-48 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white mx-auto" alt={agent.name} />
                <div className="mt-6">
                  <h2 className="text-2xl font-bold">{agent.name}</h2>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mt-1">{agent.role}</p>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">About Me</label>
                  <p className="text-slate-600 leading-relaxed italic">&quot;{agent.bio}&quot;</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                  <p className="font-bold text-slate-900">{agent.company}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">HQ Location</label>
                  <p className="font-bold text-slate-900">{agent.location}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Business Phone</label>
                  <p className="font-bold text-slate-900">{agent.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <h2 className="text-3xl font-bold text-slate-900">Active Portfolio</h2>
            {listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {listings.map((prop) => (
                  <div key={prop.id} className="relative">
                    <PropertyCard property={prop} />
                    <div className="mt-4 flex gap-2">
                      <button type="button" onClick={() => setPaymentModal({ isOpen: true, property: prop })} className="text-xs font-bold uppercase px-4 py-2 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200">Boost</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500">
                <p>No listings yet. Add properties from the Identity panel or use the API.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {paymentModal.property && (
        <PaymentModal
          isOpen={paymentModal.isOpen}
          onClose={() => setPaymentModal({ isOpen: false, property: null })}
          onSuccess={() => setPaymentModal({ isOpen: false, property: null })}
          amount={49}
          itemTitle={paymentModal.property.title}
        />
      )}
    </div>
  );
}
