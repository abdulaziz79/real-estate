
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MOCK_PROPERTIES, COUNTRIES } from '../constants';
import { PropertyCard } from '../components/PropertyCard';
import { Property } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('elite_realty_listings');
    setAllProperties(saved ? JSON.parse(saved) : MOCK_PROPERTIES);
  }, []);

  const featuredProperties = allProperties
    .sort((a, b) => (b.isBoosted ? 1 : 0) - (a.isBoosted ? 1 : 0))
    .slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCountry) params.append('country', selectedCountry);
    if (selectedCity) params.append('city', selectedCity);
    if (propertyType !== 'All' && propertyType !== 'Property Type') params.append('type', propertyType);
    navigate(`/listings?${params.toString()}`);
  };

  const destinations = [
    { name: 'Dubai', country: 'United Arab Emirates', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600' },
    { name: 'New York', country: 'United States', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600' },
    { name: 'Paris', country: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600' },
    { name: 'London', country: 'United Kingdom', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600' },
  ];

  return (
    <div className="pt-0">
      {/* Hero Section - Restored with High-Impact Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6191dae10c?auto=format&fit=crop&w=1920" 
            className="w-full h-full object-cover animate-pulse-slow"
            alt="Elite Realty Hero"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4 pt-20">
          <span className="inline-block bg-blue-600/20 backdrop-blur-md text-blue-400 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.4em] mb-8 border border-blue-500/30">
            Global Elite Properties
          </span>
          <h1 className="text-6xl md:text-9xl font-bold text-white mb-8 leading-none tracking-tighter">
            Redefining <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-blue-300">Modern Living</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Access an exclusive portfolio of the world's most prestigious estates. <br className="hidden md:block"/>
            Powered by advanced intelligence. Tailored for your legacy.
          </p>
          
          <form onSubmit={handleSearch} className="glass-morphism p-3 rounded-[3rem] shadow-2xl max-w-5xl mx-auto border-white/20">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-[1.5]">
                <select 
                  className="w-full bg-white border-none rounded-[2rem] px-8 py-6 focus:ring-4 focus:ring-blue-500/20 shadow-sm appearance-none cursor-pointer font-bold text-slate-700 text-lg"
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setSelectedCity('');
                  }}
                >
                  <option value="">Anywhere In The World</option>
                  {COUNTRIES.map(country => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <input 
                  type="text"
                  placeholder="Specific City..."
                  className="w-full bg-white border-none rounded-[2rem] px-8 py-6 focus:ring-4 focus:ring-blue-500/20 shadow-sm font-bold text-slate-700 text-lg"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-14 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 p-12 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: 'Verified Listings', val: '24k+' },
            { label: 'Countries Active', val: '195' },
            { label: 'Premium Agents', val: '1,500' },
            { label: 'Sales Volume', val: '$14B' }
          ].map((stat, i) => (
            <div key={i} className="text-center border-r last:border-none border-slate-100 px-4">
              <p className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{stat.val}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Destination Portfolio</span>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter">Global Hotspots</h2>
            </div>
            <p className="text-slate-500 max-w-md font-medium text-xl leading-relaxed">Access curated property markets in the most influential cities across the globe.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {destinations.map((dest, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/listings?country=${dest.country}&city=${dest.name}`)}
                className="group relative h-[350px] rounded-[3.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <img src={dest.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-12 left-10">
                  <h3 className="text-4xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px]">{dest.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter mb-8">Professional Excellence</h2>
            <div className="w-32 h-2 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Portfolio Management', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3', desc: 'Bespoke strategy for high-net-worth individuals managing multi-country asset portfolios.' },
              { title: 'Market Intelligence', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9', desc: 'Real-time cross-border data analytics and legal compliance verification for global investors.' },
              { title: 'AI Matching Engine', icon: 'M13 10V3L4 14h7v7l9-11h-7z', desc: 'Proprietary Gemini algorithms that identify high-yield investment opportunities before they hit the public market.' }
            ].map((service, i) => (
              <div key={i} className="bg-white p-14 rounded-[4rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group hover:-translate-y-2">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} /></svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-lg">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">The Curator's Choice</span>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter">Verified Assets</h2>
            </div>
            <Link to="/listings" className="group bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-bold flex items-center gap-4 hover:bg-slate-800 transition-all shadow-2xl">
              View Full Portfolio
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProperties.map(prop => <PropertyCard key={prop.id} property={prop} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-600 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-bold tracking-tighter mb-6 text-white">The Standard of Excellence</h2>
            <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs italic">Trusted by the global elite.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: 'Marcus Sterling', role: 'Capital Partner', text: 'The depth of market insight provided by the Elite platform is unparalleled. I successfully acquired properties in three different continents in record time.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200' },
              { name: 'Isabella Rossi', role: 'Creative Director', text: 'Finding a home is emotional, but finding an asset is logical. Elite Realty Pro perfectly balances both with their AI and expert agents.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200' },
              { name: 'Jordan Hayes', role: 'Tech Entrepreneur', text: 'The virtual tour and direct agent communication features make overseas purchasing a breeze. Truly the future of real estate.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200' }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl p-12 rounded-[4rem] border border-white/10 hover:bg-white/10 transition-all group">
                <div className="flex items-center gap-6 mb-8">
                  <img src={t.img} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/50" alt={t.name} />
                  <div>
                    <h4 className="font-bold text-2xl text-white">{t.name}</h4>
                    <p className="text-xs text-blue-400 font-black uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium italic text-lg">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
