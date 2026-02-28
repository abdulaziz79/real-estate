"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Listings', href: '/listings' },
    { name: 'Agents', href: '/agents' },
    { name: 'Blog', href: '/blog' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 glass-morphism border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2" onClick={handleLinkClick}>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                  Elite Realty
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    <img src={user.image} className="w-8 h-8 rounded-full object-cover" alt={user.name} />
                    <span className="text-sm font-bold text-slate-700 px-1">{user.name.split(' ')[0]}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2">
                      <div className="px-4 py-2 border-b border-slate-50 mb-1">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{user.role}</p>
                      </div>
                      {user.role === 'admin' && (
                        <Link href="/admin" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium" onClick={handleLinkClick}>Dashboard</Link>
                      )}
                      {user.role === 'agent' && (
                        <Link href="/agent/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium" onClick={handleLinkClick}>My Dashboard</Link>
                      )}
                      <Link href="/messages" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium" onClick={handleLinkClick}>Messages</Link>
                      <button onClick={() => { signOut(); handleLinkClick(); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Sign Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => signIn('user')} className="text-slate-600 font-bold px-4 py-2 hover:text-blue-600">User</button>
                  <button onClick={() => signIn('agent')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md">Agent Log</button>
                </div>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                Elite Realty
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <nav className="space-y-2 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {user ? (
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-slate-50 rounded-lg">
                  <img src={user.image} className="w-12 h-12 rounded-full object-cover" alt={user.name} />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{user.role}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  {user.role === 'admin' && (
                    <Link href="/admin" onClick={handleLinkClick} className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                      Dashboard
                    </Link>
                  )}
                  {user.role === 'agent' && (
                    <Link href="/agent/dashboard" onClick={handleLinkClick} className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                      My Dashboard
                    </Link>
                  )}
                  <Link href="/messages" onClick={handleLinkClick} className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                    Messages
                  </Link>
                  <button
                    onClick={() => { signOut(); handleLinkClick(); }}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-t border-slate-200 pt-6 space-y-3">
                <button
                  onClick={() => { signIn('user'); handleLinkClick(); }}
                  className="w-full px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg font-medium transition-colors text-left"
                >
                  Sign In as User
                </button>
                <button
                  onClick={() => { signIn('agent'); handleLinkClick(); }}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Agent Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
