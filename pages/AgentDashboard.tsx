
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_AGENTS, MOCK_PROPERTIES, COUNTRIES } from '../constants';
import { Agent, Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { PaymentModal } from '../components/PaymentModal';

export const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // ALL HOOKS AT TOP
  const [activeTab, setActiveTab] = useState<'profile' | 'listings'>('profile');
  const [agent, setAgent] = useState<Agent | undefined>(undefined);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState<any>(null);
  
  // Listings State
  const [listings, setListings] = useState<Property[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  
  // New Property Form States
  const [formCountry, setFormCountry] = useState('');
  const [formCity, setFormCity] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string>('House');
  
  // Payment State
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; property: Property | null }>({ isOpen: false, property: null });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const agentData = MOCK_AGENTS.find(a => a.id === user?.agentId);
    if (agentData) {
      setAgent(agentData);
      setProfileFormData(agentData);
    }
    
    if (user) {
      const saved = localStorage.getItem('elite_realty_listings');
      let allProps = saved ? JSON.parse(saved) : MOCK_PROPERTIES;
      const agentListings = allProps.filter((p: Property) => p.agentId === user?.agentId);
      setListings(agentListings);
    }
  }, [user]);

  // Handle image files from device
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Fix: Explicitly type 'file' as File to resolve "unknown" assignability issue to Blob
      const readers = Array.from(files).map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      
      Promise.all(readers).then(images => {
        setUploadedImages(prev => [...prev, ...images]);
      });
    }
  };

  const handleStartEdit = (prop: Property) => {
    setEditingProperty(prop);
    setFormCountry(prop.country);
    setFormCity(prop.city);
    setUploadedImages(prop.images);
    setPropertyType(prop.type);
    setIsFormOpen(true);
    setActiveTab('listings');
  };

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    
    const country = data.get('country') as string;
    const city = data.get('city_text') as string;

    const type = data.get('type') as any;
    const isUnderConstruction = type === 'Under Construction';
    
    const propertyData: Property = {
      id: editingProperty ? editingProperty.id : Date.now().toString(),
      title: data.get('title') as string,
      price: Number(data.get('price')),
      location: `${city}, ${country}`,
      country: country,
      city: city,
      type: type,
      bedrooms: Number(data.get('beds')),
      bathrooms: Number(data.get('baths')),
      sqft: Number(data.get('sqm')) / 0.0929,
      yearBuilt: Number(data.get('year')),
      description: data.get('description') as string,
      images: uploadedImages.length > 0 ? uploadedImages : ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200'],
      features: editingProperty ? editingProperty.features : ['Global Luxury Design'],
      agentId: agent!.id,
      status: editingProperty ? editingProperty.status : 'For Sale',
      coordinates: editingProperty ? editingProperty.coordinates : { lat: 0, lng: 0 },
      amenities: editingProperty ? editingProperty.amenities : ['Verified Asset'],
      isBoosted: editingProperty ? editingProperty.isBoosted : false,
      // Under Construction specific fields
      ...(isUnderConstruction && {
        apartments: Number(data.get('apartments')) || undefined,
        downPayment: Number(data.get('downPayment')) || undefined,
        monthlyInstallment: Number(data.get('monthlyInstallment')) || undefined,
        paymentDuration: Number(data.get('paymentDuration')) as 3 | 4 | 5 | undefined
      })
    };

    const saved = localStorage.getItem('elite_realty_listings');
    let allProps = saved ? JSON.parse(saved) : MOCK_PROPERTIES;
    
    if (editingProperty) {
      allProps = allProps.map((p: Property) => p.id === editingProperty.id ? propertyData : p);
    } else {
      allProps = [propertyData, ...allProps];
    }
    
    localStorage.setItem('elite_realty_listings', JSON.stringify(allProps));
    setListings(allProps.filter((p: Property) => p.agentId === agent!.id));
    setIsFormOpen(false);
    setEditingProperty(null);
    setUploadedImages([]);
    setPropertyType('House');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setAgent(profileFormData);
    setIsEditingProfile(false);
    // In a real app, we'd save this to a database
  };

  if (!user || user.role !== 'agent') {
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
            <button onClick={() => setActiveTab('profile')} className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}>Identity</button>
            <button onClick={() => setActiveTab('listings')} className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === 'listings' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}>My Portfolio</button>
          </div>
        </div>

        {activeTab === 'profile' ? (
          <div className="animate-in fade-in duration-500">
            <form onSubmit={handleSaveProfile} className="bg-white rounded-[3.5rem] border-8 border-white shadow-2xl overflow-hidden p-8 md:p-12 space-y-12">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="shrink-0 text-center">
                  <div className="relative inline-block group">
                    <img src={agent.image} className="w-48 h-48 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white transition-transform duration-500 group-hover:scale-105" alt={agent.name} />
                    {isEditingProfile && (
                      <button type="button" className="absolute inset-0 bg-black/50 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold uppercase">Change Photo</button>
                    )}
                  </div>
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold">{agent.name}</h2>
                    <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mt-1">{agent.role}</p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">About Me</label>
                    {isEditingProfile ? (
                      <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 focus:ring-2 focus:ring-blue-500 outline-none h-32" value={profileFormData.bio} onChange={e => setProfileFormData({...profileFormData, bio: e.target.value})} />
                    ) : <p className="text-slate-600 leading-relaxed italic">"{agent.bio}"</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                    {isEditingProfile ? (
                      <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" value={profileFormData.company} onChange={e => setProfileFormData({...profileFormData, company: e.target.value})} />
                    ) : <p className="font-bold text-slate-900">{agent.company}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">HQ Location</label>
                    {isEditingProfile ? (
                      <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" value={profileFormData.location} onChange={e => setProfileFormData({...profileFormData, location: e.target.value})} />
                    ) : <p className="font-bold text-slate-900">{agent.location}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Professional Website</label>
                    {isEditingProfile ? (
                      <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" value={profileFormData.website} onChange={e => setProfileFormData({...profileFormData, website: e.target.value})} />
                    ) : <a href={agent.website} target="_blank" className="font-bold text-blue-600 hover:underline">{agent.website}</a>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Business Phone</label>
                    {isEditingProfile ? (
                      <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" value={profileFormData.phone} onChange={e => setProfileFormData({...profileFormData, phone: e.target.value})} />
                    ) : <p className="font-bold text-slate-900">{agent.phone}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-8 border-t border-slate-100">
                {isEditingProfile ? (
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setIsEditingProfile(false)} className="px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all">Save Changes</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setIsEditingProfile(true)} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all">Modify Identity</button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <h2 className="text-3xl font-bold text-slate-900">Active Portfolio</h2>
              <button 
                onClick={() => {
                  setEditingProperty(null);
                  setIsFormOpen(true);
                  setUploadedImages([]);
                  setFormCountry('');
                  setFormCity('');
                  setPropertyType('House');
                }} 
                className={`bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-3 hover:-translate-y-1 ${isFormOpen ? 'hidden' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                Post New Asset
              </button>
            </div>

            {isFormOpen && (
              <div className="bg-white p-10 md:p-16 rounded-[4rem] border-8 border-white shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-4xl font-bold tracking-tighter">{editingProperty ? 'Edit Property' : 'Draft New Post'}</h3>
                  <button onClick={() => { setIsFormOpen(false); setEditingProperty(null); }} className="bg-slate-50 text-slate-400 hover:text-slate-900 w-12 h-12 rounded-full flex items-center justify-center transition-all border border-slate-100 font-bold">✕</button>
                </div>

                <form onSubmit={handleAddListing} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Display Title</label>
                    <input name="title" defaultValue={editingProperty?.title} required placeholder="Modern Coastal Villa" className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-lg" />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Country</label>
                    <select 
                      name="country" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                    >
                      <option value="">Select Region...</option>
                      {COUNTRIES.map(country => <option key={country} value={country}>{country}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Metropolis / City</label>
                    <input 
                      name="city_text" 
                      required 
                      defaultValue={editingProperty?.city}
                      placeholder="e.g. Monte Carlo"
                      className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Media Assets (From Device)</label>
                    <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[3rem] p-10 text-center cursor-pointer hover:bg-slate-100 transition-all group" onClick={() => fileInputRef.current?.click()}>
                      <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 8l-4-4m0 0L8 8m4-4v12" /></svg>
                      </div>
                      <p className="font-bold text-slate-900">Choose Photos from Your Computer</p>
                      <p className="text-slate-400 text-sm mt-1">PNG, JPG, HEIC up to 10MB each</p>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="flex flex-wrap gap-4 mt-8">
                        {uploadedImages.map((img, idx) => (
                          <div key={idx} className="relative group w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                            <img src={img} className="w-full h-full object-cover" alt="Upload" />
                            <button type="button" onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-10 md:col-span-2">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">List Price (USD)</label>
                      <input name="price" defaultValue={editingProperty?.price} required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 outline-none font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Property Type</label>
                      <select 
                        name="type" 
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 outline-none font-bold"
                      >
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Villa</option>
                        <option>Condo</option>
                        <option>Under Construction</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 md:col-span-1">
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Beds</label>
                       <input name="beds" defaultValue={editingProperty?.bedrooms} required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold" />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Baths</label>
                       <input name="baths" defaultValue={editingProperty?.bathrooms} required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold" />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Size m²</label>
                       <input name="sqm" defaultValue={editingProperty ? Math.round(editingProperty.sqft * 0.0929) : ''} required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Build Year</label>
                    <input name="year" defaultValue={editingProperty?.yearBuilt} required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 font-bold" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Property Biography</label>
                    <textarea name="description" defaultValue={editingProperty?.description} rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-none" />
                  </div>

                  {/* Under Construction Specific Fields */}
                  {propertyType === 'Under Construction' && (
                    <>
                      <div className="md:col-span-2">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-[3rem] p-8">
                          <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Payment Plan Details
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Number of Apartments</label>
                              <input 
                                name="apartments" 
                                type="number" 
                                defaultValue={editingProperty?.apartments} 
                                required
                                min="1"
                                placeholder="e.g. 50"
                                className="w-full bg-white border border-slate-200 rounded-3xl p-6 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Down Payment (USD)</label>
                              <input 
                                name="downPayment" 
                                type="number" 
                                defaultValue={editingProperty?.downPayment} 
                                required
                                min="0"
                                placeholder="e.g. 50000"
                                className="w-full bg-white border border-slate-200 rounded-3xl p-6 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Monthly Installment (USD)</label>
                              <input 
                                name="monthlyInstallment" 
                                type="number" 
                                defaultValue={editingProperty?.monthlyInstallment} 
                                required
                                min="0"
                                placeholder="e.g. 2000"
                                className="w-full bg-white border border-slate-200 rounded-3xl p-6 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Payment Duration (Years)</label>
                              <select 
                                name="paymentDuration" 
                                defaultValue={editingProperty?.paymentDuration || 3}
                                required
                                className="w-full bg-white border border-slate-200 rounded-3xl p-6 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                              >
                                <option value={3}>3 Years</option>
                                <option value={4}>4 Years</option>
                                <option value={5}>5 Years</option>
                              </select>
                            </div>
                          </div>
                          <p className="mt-6 text-sm text-slate-600 font-medium">
                            <svg className="w-5 h-5 inline-block mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Buyers will pay the down payment upfront, then make monthly installments for the selected duration.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2 pt-10">
                    <button type="submit" className="w-full bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-sm py-8 rounded-[2.5rem] shadow-2xl hover:bg-blue-700 transition-all hover:-translate-y-2 active:translate-y-0">
                      {editingProperty ? 'Sync Asset Updates' : 'Publish Worldwide'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {listings.length === 0 ? (
                <div className="md:col-span-2 text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
                   <p className="text-slate-400 font-bold uppercase tracking-widest">Empty Inventory</p>
                </div>
              ) : (
                listings.map(prop => (
                  <div key={prop.id} className="relative group">
                    <PropertyCard property={prop} />
                    <div className="absolute bottom-6 right-6 flex gap-2">
                      <button 
                        onClick={() => handleStartEdit(prop)}
                        className="bg-white text-slate-900 font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl shadow-xl hover:bg-slate-100 transition-all border border-slate-200"
                      >
                        Edit Asset
                      </button>
                      {!prop.isBoosted && (
                        <button 
                          onClick={() => setPaymentModal({ isOpen: true, property: prop })}
                          className="bg-amber-400 text-slate-900 font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl shadow-xl hover:bg-amber-500 transition-all flex items-center gap-2"
                        >
                          Boost
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        <PaymentModal isOpen={paymentModal.isOpen} onClose={() => setPaymentModal({ isOpen: false, property: null })} onSuccess={() => {}} amount={49} itemTitle={paymentModal.property?.title || 'Listing Boost'} />
      </div>
    </div>
  );
};
