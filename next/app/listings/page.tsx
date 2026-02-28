"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PROPERTIES, COUNTRIES } from "@/constants";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyType, Property } from "@/types";

function ListingsContent() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  type FilterType = PropertyType | "All";
  const [filters, setFilters] = useState<{
    type: FilterType;
    country: string;
    city: string;
    minPrice: number;
    maxPrice: number;
    beds: string;
    search: string;
  }>({
    type: (searchParams.get("type") as FilterType) || "All",
    country: searchParams.get("country") || "",
    city: searchParams.get("city") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 10000000,
    beds: searchParams.get("beds") || "All",
    search: searchParams.get("search") || "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("elite_realty_listings");
    setAllProperties(saved ? JSON.parse(saved) : MOCK_PROPERTIES);
  }, []);

  useEffect(() => {
    setFilters({
      type: (searchParams.get("type") as FilterType) || "All",
      country: searchParams.get("country") || "",
      city: searchParams.get("city") || "",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || 10000000,
      beds: searchParams.get("beds") || "All",
      search: searchParams.get("search") || "",
    });
  }, [searchParams]);

  const filteredProperties = useMemo(() => {
    return allProperties
      .sort((a, b) => (b.isBoosted ? 1 : 0) - (a.isBoosted ? 1 : 0))
      .filter((p) => {
        const matchType = filters.type === "All" || p.type === filters.type;
        const matchCountry = !filters.country || p.country.toLowerCase() === filters.country.toLowerCase();
        const matchCity = !filters.city || p.city.toLowerCase().includes(filters.city.toLowerCase());
        const matchPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
        const matchBeds = filters.beds === "All" || p.bedrooms >= parseInt(filters.beds, 10);
        const matchSearch =
          p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.location.toLowerCase().includes(filters.search.toLowerCase());
        return matchType && matchCountry && matchCity && matchPrice && matchBeds && matchSearch;
      });
  }, [filters, allProperties]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    const params = new URLSearchParams();
    if (updated.search) params.set("search", updated.search);
    if (updated.country) params.set("country", updated.country);
    if (updated.city) params.set("city", updated.city);
    if (updated.type !== "All") params.set("type", updated.type);
    if (updated.beds !== "All") params.set("beds", updated.beds);
    if (updated.minPrice > 0) params.set("minPrice", updated.minPrice.toString());
    if (updated.maxPrice < 10000000) params.set("maxPrice", updated.maxPrice.toString());
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-10 tracking-tighter">Worldwide Inventory</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">World Region</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-bold" value={filters.country} onChange={(e) => updateFilters({ country: e.target.value, city: "" })}>
                <option value="">Any Country</option>
                {COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Metropolis / City</label>
              <input placeholder="Search City..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={filters.city} onChange={(e) => updateFilters({ city: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Asset Type</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-bold" value={filters.type} onChange={(e) => updateFilters({ type: e.target.value as FilterType })}>
                <option value="All">All Categories</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Condo">Condo</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Bedrooms</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-bold" value={filters.beds} onChange={(e) => updateFilters({ beds: e.target.value })}>
                <option value="All">Any Size</option>
                <option value="1">1+ Beds</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Keyword Search</label>
              <input type="text" placeholder="View, Pool, Beachfront..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={filters.search} onChange={(e) => updateFilters({ search: e.target.value })} />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-10">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Found <span className="text-slate-900">{filteredProperties.length}</span> Verified Assets</p>
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200">
            <button onClick={() => setView("grid")} className={`p-2 rounded-xl transition-all ${view === "grid" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400"}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button onClick={() => setView("list")} className={`p-2 rounded-xl transition-all ${view === "list" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400"}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
        {filteredProperties.length > 0 ? (
          <div className={`grid gap-10 ${view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} view={view} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">No Matches Found</h3>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">Try expanding your search parameters or explore other regions across our global network.</p>
            <button onClick={() => updateFilters({ type: "All", country: "", city: "", minPrice: 0, maxPrice: 10000000, beds: "All", search: "" })} className="bg-slate-900 text-white px-10 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-slate-800 transition-all">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>}>
      <ListingsContent />
    </Suspense>
  );
}

