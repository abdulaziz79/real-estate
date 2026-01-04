
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROPERTIES, MOCK_AGENTS } from '../constants';
import { PropertyCard } from '../components/PropertyCard';
import { Property } from '../types';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [activeImage, setActiveImage] = useState(0);
  
  // Mortgage Calculator State - Hooks MUST be at top level
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('elite_realty_listings');
    const allProps = saved ? JSON.parse(saved) : MOCK_PROPERTIES;
    const found = allProps.find((p: Property) => p.id === id);
    if (found) {
      setProperty(found);
      setLoanAmount(found.price);
      setDownPayment(found.price * 0.2);
    }
  }, [id]);

  useEffect(() => {
    if (loanAmount > 0) {
      const principal = loanAmount - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment || 0);
    }
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  if (!property) {
    return (
      <div className="pt-40 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Loading premium listing...</p>
      </div>
    );
  }

  const agent = MOCK_AGENTS.find(a => a.id === property.agentId);
  const sqm = Math.round(property.sqft * 0.092903);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_YOUR_KEY&q=${encodeURIComponent(`${property.city}, ${property.country}`)}`;
  // Fallback map URL that doesn't strictly require an API key for demo purposes
  const fallbackMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(`${property.city}, ${property.country}`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">{property.status}</span>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                property.type === 'Under Construction' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}>
                {property.type}
              </span>
              {property.isBoosted && (
                <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1 border border-amber-200">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 tracking-tight">{property.title}</h1>
            <p className="text-slate-500 text-lg flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {property.city}, {property.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Asking Price</p>
            <p className="text-5xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-9 h-[550px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group relative">
            <img src={property.images[activeImage]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={property.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
          </div>
          <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto max-h-[550px] pb-4 lg:pb-0 scrollbar-hide">
            {property.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-40 lg:w-full aspect-video rounded-3xl overflow-hidden border-4 transition-all duration-300 ${activeImage === idx ? 'border-blue-600 scale-[0.98] shadow-lg' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="Property thumbnail" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <div className={`bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm grid grid-cols-2 ${property.type === 'Under Construction' && property.apartments ? 'md:grid-cols-5' : 'md:grid-cols-4'} gap-8`}>
              <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Beds</span>
                <span className="text-3xl font-bold text-slate-900">{property.bedrooms}</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Baths</span>
                <span className="text-3xl font-bold text-slate-900">{property.bathrooms}</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Living m²</span>
                <span className="text-3xl font-bold text-slate-900">{sqm}</span>
              </div>
              {property.type === 'Under Construction' && property.apartments && (
                <div className="flex flex-col items-center p-4 rounded-3xl bg-orange-50 border border-orange-100">
                  <span className="text-orange-600 text-xs font-black uppercase tracking-widest mb-2">Apartments</span>
                  <span className="text-3xl font-bold text-orange-700">{property.apartments}</span>
                </div>
              )}
              <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Built</span>
                <span className="text-3xl font-bold text-slate-900">{property.yearBuilt}</span>
              </div>
            </div>

            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-slate-900">Property Location</h2>
              </div>
              <div className="bg-white rounded-[3.5rem] border-8 border-white shadow-2xl overflow-hidden h-[500px] group">
                <iframe 
                  title="Google Maps"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  className="grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
                  src={fallbackMapUrl}
                ></iframe>
              </div>
              <div className="mt-6 flex items-center justify-between bg-white px-8 py-4 rounded-2xl border border-slate-200">
                <p className="text-slate-600 font-medium">Located in <span className="text-slate-900 font-bold">{property.city}, {property.country}</span></p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.city}, ${property.country}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  Open in Google Maps
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-slate-900">Description</h2>
              </div>
              <p className="text-slate-600 text-xl leading-relaxed font-light">{property.description}</p>
            </section>

            {property.type === 'Under Construction' && property.monthlyInstallment ? (
              <section className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <h2 className="text-4xl font-bold mb-10 flex items-center gap-4 relative z-10">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Payment Plan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-[2rem] p-8 border border-white/20">
                    <p className="text-white/80 font-black uppercase tracking-[0.2em] text-xs mb-4 text-center">Total Price</p>
                    <p className="text-5xl font-bold text-center mb-2">${property.price.toLocaleString()}</p>
                    <div className="h-1 w-16 bg-white/30 rounded-full mx-auto"></div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-[2rem] p-8 border border-white/20">
                    <p className="text-white/80 font-black uppercase tracking-[0.2em] text-xs mb-4 text-center">Down Payment</p>
                    <p className="text-5xl font-bold text-center mb-2">${property.downPayment?.toLocaleString()}</p>
                    <p className="text-white/60 text-xs text-center mt-2">Pay upfront</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-[2rem] p-8 border border-white/20">
                    <p className="text-white/80 font-black uppercase tracking-[0.2em] text-xs mb-4 text-center">Monthly Installment</p>
                    <p className="text-5xl font-bold text-center mb-2">${property.monthlyInstallment.toLocaleString()}</p>
                    <p className="text-white/60 text-xs text-center mt-2">For {property.paymentDuration} years</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-[2rem] p-8 border border-white/20 relative z-10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Payment Schedule
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-white/20">
                      <span className="text-white/80 font-medium">Initial Payment</span>
                      <span className="text-xl font-bold">${property.downPayment?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/20">
                      <span className="text-white/80 font-medium">Monthly Installments</span>
                      <span className="text-xl font-bold">${property.monthlyInstallment.toLocaleString()}/month</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/20">
                      <span className="text-white/80 font-medium">Duration</span>
                      <span className="text-xl font-bold">{property.paymentDuration} Years</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-white font-bold text-lg">Total Installments</span>
                      <span className="text-2xl font-bold">${(property.monthlyInstallment * (property.paymentDuration || 0) * 12).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="mt-6 text-white/70 text-sm text-center leading-relaxed">
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    This property is currently under construction. Secure your unit with a down payment and pay the remaining balance in monthly installments.
                  </p>
                </div>
              </section>
            ) : (
              <section className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32"></div>
                <h2 className="text-4xl font-bold mb-10 flex items-center gap-4">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  Financial Planner
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Total Purchase ($)</label>
                      <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xl font-bold" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Down Payment ($)</label>
                      <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xl font-bold" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">APR %</label>
                        <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold" />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Term</label>
                        <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold appearance-none">
                          <option value={15} className="bg-slate-900">15 Years</option>
                          <option value={30} className="bg-slate-900">30 Years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[3rem] shadow-2xl scale-105 border-4 border-white/10">
                    <p className="text-white/80 font-black uppercase tracking-[0.2em] text-xs mb-6 text-center">Monthly Commitment</p>
                    <p className="text-7xl font-bold mb-4">${Math.round(monthlyPayment).toLocaleString()}</p>
                    <div className="h-1 w-20 bg-white/30 rounded-full"></div>
                    <p className="mt-6 text-white/60 text-xs text-center leading-relaxed">Estimations based on typical global lending rates. Contact a representative for precise quotes.</p>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="space-y-8">
            {agent && (
              <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-xl sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                   <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
                   Expert Representation
                </h3>
                <Link to={`/agents/${agent.id}`} className="flex items-center gap-6 mb-8 hover:bg-slate-50 p-4 -mx-4 rounded-[2rem] transition-all group">
                  <div className="relative">
                    <img src={agent.image} className="w-20 h-20 rounded-[1.5rem] object-cover shadow-lg border-2 border-white group-hover:scale-105 transition-transform" alt={agent.name} />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900">{agent.name}</h4>
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-wide">{agent.role}</p>
                  </div>
                </Link>
                <form className="space-y-4 mb-8">
                  <input type="text" placeholder="Your Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  <textarea placeholder="Tell us what you're looking for..." rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none resize-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
                  <button className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">Request Portfolio</button>
                </form>
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Live Virtual Tour
                  </button>
                  <p className="text-center font-black text-slate-400 text-sm mt-4 uppercase tracking-[0.2em]">{agent.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
