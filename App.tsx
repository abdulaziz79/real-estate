import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Listings } from "./pages/Listings";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Agents } from "./pages/Agents";
import { AgentDetail } from "./pages/AgentDetail";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AgentDashboard } from "./pages/AgentDashboard";
import { Messages } from "./pages/Messages";

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
    <h1 className="text-4xl font-bold mb-8">{title}</h1>
    <p className="text-slate-500 mb-12">Coming soon...</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-64 bg-slate-200 animate-pulse rounded-3xl"
        ></div>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/:id" element={<AgentDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              <Route path="/messages" element={<Messages />} />
              <Route
                path="/about"
                element={<PlaceholderPage title="About Elite Realty Pro" />}
              />
              <Route
                path="/blog"
                element={<PlaceholderPage title="Real Estate Blog" />}
              />
              <Route
                path="/contact"
                element={<PlaceholderPage title="Contact Us" />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
