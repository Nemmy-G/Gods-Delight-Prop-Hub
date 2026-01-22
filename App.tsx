
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminPanel from './components/AdminPanel';
import PartnerPanel from './components/PartnerPanel';
import AssetExplorer from './components/AssetExplorer';
import { User, Listing, Partner, AIAlert } from './types';
import { INITIAL_LISTINGS, INITIAL_PARTNERS } from './constants';
import { getSecurityScan } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({ role: 'VISITOR' });
  const [view, setView] = useState<'HOME' | 'ADMIN' | 'PARTNER' | 'EXPLORE' | 'ABOUT'>('HOME');
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [alerts, setAlerts] = useState<AIAlert[]>([]);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // Simulate AI Security scanning periodically
  useEffect(() => {
    const scanInterval = setInterval(async () => {
      const logs = [
        "Login attempt from unknown IP: 192.168.1.5",
        "High frequency API calls from User_772",
        "Suspicious asset update: Price drop 90%",
        "XSS attempt blocked at /api/upload"
      ];
      const newAlerts = await getSecurityScan(logs);
      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 5));
      }
    }, 15000);

    return () => clearInterval(scanInterval);
  }, []);

  const handleLogout = () => {
    setUser({ role: 'VISITOR' });
    setView('HOME');
  };

  const handlePartnerOnboard = (newPartner: Partner) => {
    setPartners([...partners, newPartner]);
  };

  const handleAddListing = (newListing: Listing) => {
    setListings([newListing, ...listings]);
  };

  const handleContactAdmin = (listing: Listing) => {
    alert(`Connecting you to the Admin for ${listing.title}. You will be connected to the owner shortly for negotiations.`);
  };

  const loginAsAdmin = () => {
    setUser({ role: 'ADMIN' });
    setView('ADMIN');
    setLoginModalOpen(false);
  };

  const loginAsPartner = (id: string) => {
    setUser({ role: 'PARTNER', partnerId: id });
    setView('PARTNER');
    setLoginModalOpen(false);
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      onNavigate={(v) => {
        if ((v === 'ADMIN' || v === 'PARTNER') && user.role === 'VISITOR') {
          setLoginModalOpen(true);
        } else {
          setView(v);
        }
      }}
      currentView={view}
    >
      {view === 'HOME' && (
        <div className="relative">
          {/* Hero Section */}
          <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1590059132669-46763b56f2b1?auto=format&fit=crop&q=80&w=2000" 
              className="absolute inset-0 w-full h-full object-cover filter brightness-50"
              alt="Nigeria Real Estate" 
            />
            <div className="relative z-10 text-center text-white px-4 max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Premium Real Estate <br/> & Hotels in <span className="text-green-500">Nigeria</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-200">
                AI-Verified Houses, Lands, and Premium Stays. 
                Search, find, and connect with owners safely.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => setView('EXPLORE')}
                  className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition shadow-xl"
                >
                  Explore Assets
                </button>
                <button 
                  onClick={() => setLoginModalOpen(true)}
                  className="bg-white hover:bg-gray-100 text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg transition shadow-xl"
                >
                  Partner With Us
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="bg-green-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-green-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">AI Verified</h3>
                <p className="text-gray-500">Our advanced Gemini model scans every listing to detect fraud and ensure authenticity.</p>
              </div>
              <div>
                <div className="bg-blue-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">GPS Integration</h3>
                <p className="text-gray-500">Easily locate any asset with our precision GPS and map systems built into the app.</p>
              </div>
              <div>
                <div className="bg-orange-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-orange-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Direct Connect</h3>
                <p className="text-gray-500">Get connected instantly to the top management for smooth negotiation and payment.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'ABOUT' && (
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About NaijaPropertyHub</h1>
              <p className="text-lg text-gray-600 mb-6">
                We are Nigeria's premier digital marketplace for real estate and premium hospitality. 
                Our mission is to simplify the process of finding, vetting, and securing properties 
                across all states in Nigeria.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Vetted Partners Only</h4>
                    <p className="text-gray-500 text-sm">We only onboard established real estate firms and luxury hotels.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">AI-Powered Security</h4>
                    <p className="text-gray-500 text-sm">Every listing is analyzed by our proprietary AI for price accuracy and risk.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Direct Connect</h4>
                    <p className="text-gray-500 text-sm">No middlemen. You talk directly to us, and we connect you to owners.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-3xl shadow-2xl" 
                alt="Modern Architecture"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-bold text-green-600">10k+</p>
                <p className="text-sm font-medium text-gray-500">Verified Listings</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'ADMIN' && (
        <AdminPanel 
          partners={partners} 
          onAddPartner={handlePartnerOnboard} 
          alerts={alerts}
        />
      )}

      {view === 'PARTNER' && (
        <PartnerPanel 
          partner={partners.find(p => p.id === user.partnerId) || partners[0]} 
          listings={listings}
          onAddListing={handleAddListing}
        />
      )}

      {view === 'EXPLORE' && (
        <AssetExplorer 
          listings={listings} 
          onContact={handleContactAdmin}
        />
      )}

      {/* Auth Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Partner Access</h2>
              <p className="text-gray-500">Only vetted partners can login to list assets.</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-green-500 cursor-pointer transition group"
                   onClick={loginAsAdmin}>
                <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition">Admin Login</h4>
                <p className="text-xs text-gray-500">System management & security monitoring</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Vetted Partners</p>
                {partners.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => loginAsPartner(p.id)}
                    className="p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-green-500 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition">{p.name}</h4>
                      <p className="text-xs text-gray-500">{p.type.replace('_', ' ')}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setLoginModalOpen(false)}
                className="w-full py-4 text-gray-500 font-bold hover:text-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
