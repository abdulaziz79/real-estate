
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Listings', href: '/listings' },
    { name: 'Agents', href: '/agents' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="fixed w-full z-50 glass-morphism border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                Elite Realty
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
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
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{user.role}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">Dashboard</Link>
                    )}
                    {user.role === 'agent' && (
                      <Link to="/agent/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">My Dashboard</Link>
                    )}
                    <Link to="/messages" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">Messages</Link>
                    <button onClick={signOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Sign Out</button>
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
        </div>
      </div>
    </nav>
  );
};
