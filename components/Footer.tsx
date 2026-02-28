"use client";

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-2xl font-bold text-white">Elite Realty</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Redefining real estate with cutting-edge technology and world-class service. Your dream home is just a click away.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/listings" className="hover:text-blue-500 transition-colors">Property Listings</Link></li>
              <li><Link href="/agents" className="hover:text-blue-500 transition-colors">Find an Agent</Link></li>
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Company</Link></li>
              <li><Link href="/services" className="hover:text-blue-500 transition-colors">Our Services</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Mortgage Calculator</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Property Valuation</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-slate-400 mb-4">Subscribe to receive the latest market updates and property news.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-slate-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button type="button" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2024 Elite Realty Pro. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span>License: #RE-12345678</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              System Status: Optimal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
