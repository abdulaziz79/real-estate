
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_AGENTS } from '../constants';

export const Agents: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Team</span>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Expert Real Estate Agents</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Our agents are elite professionals with deep market knowledge and a commitment to providing exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_AGENTS.map((agent) => (
            <div key={agent.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <img src={agent.image} className="w-24 h-24 rounded-3xl object-cover shadow-lg border-2 border-white" alt={agent.name} />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{agent.name}</h2>
                    <p className="text-blue-600 font-semibold">{agent.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-amber-400">★</span>
                      <span className="text-sm font-bold text-slate-900">{agent.rating}</span>
                      <span className="text-xs text-slate-400">({agent.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-slate-500 line-clamp-3 leading-relaxed">{agent.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map(spec => (
                      <span key={spec} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <div className="text-sm">
                    <p className="text-slate-400 font-medium">Experience</p>
                    <p className="text-slate-900 font-bold">{agent.experience}</p>
                  </div>
                  <Link 
                    to={`/agents/${agent.id}`}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
