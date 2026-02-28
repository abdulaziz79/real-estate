"use client";

import React, { useState, useEffect } from "react";
import { MOCK_PROPERTIES } from "@/constants";
import { Property } from "@/types";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("elite_realty_listings");
    setProperties(saved ? JSON.parse(saved) : MOCK_PROPERTIES);
  }, []);

  const boostedCount = properties.filter((p) => p.isBoosted).length;
  const totalRevenue = 1245000 + boostedCount * 49;

  const toggleBoost = (id: string) => {
    const updated = properties.map((p) => (p.id === id ? { ...p, isBoosted: !p.isBoosted } : p));
    setProperties(updated);
    localStorage.setItem("elite_realty_listings", JSON.stringify(updated));
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">System Administrator</p>
              <h1 className="text-5xl font-bold tracking-tight">Executive Dashboard</h1>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Real-time Node Status: Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
              <p className="text-slate-400 font-bold text-xs uppercase mb-2">Platform Revenue</p>
              <p className="text-4xl font-bold">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
              <p className="text-slate-400 font-bold text-xs uppercase mb-2">Global Users</p>
              <p className="text-4xl font-bold">14,291</p>
            </div>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
              <p className="text-slate-400 font-bold text-xs uppercase mb-2">Listings Live</p>
              <p className="text-4xl font-bold">{properties.length}</p>
            </div>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
              <p className="text-slate-400 font-bold text-xs uppercase mb-2">Premium Boosts</p>
              <p className="text-4xl font-bold">{boostedCount}</p>
            </div>
          </div>
        </header>

        <section className="bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">System Inventory</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-xs font-black uppercase tracking-widest">
                    <th className="pb-6">Property Identifier</th>
                    <th className="pb-6">Location (Global)</th>
                    <th className="pb-6">Valuation</th>
                    <th className="pb-6">Visibility</th>
                    <th className="pb-6 text-right">Administrative Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {properties.map((p) => (
                    <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-6 font-bold text-slate-100">{p.title}</td>
                      <td className="py-6">
                        <div className="text-sm">{p.city}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">{p.country}</div>
                      </td>
                      <td className="py-6 font-mono text-blue-400">${p.price.toLocaleString()}</td>
                      <td className="py-6">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${p.isBoosted ? "bg-amber-400 text-slate-900" : "bg-slate-700 text-slate-400"}`}>
                          {p.isBoosted ? "Boosted" : "Standard"}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        <button
                          type="button"
                          onClick={() => toggleBoost(p.id)}
                          className={`text-[10px] font-black uppercase px-6 py-2 rounded-lg transition-all border ${p.isBoosted ? "border-red-500/50 text-red-500" : "border-blue-500/50 text-blue-500"}`}
                        >
                          {p.isBoosted ? "Revoke" : "Force Boost"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
