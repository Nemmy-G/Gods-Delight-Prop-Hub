
import React from 'react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  onNavigate: (view: 'HOME' | 'ADMIN' | 'PARTNER' | 'EXPLORE' | 'ABOUT') => void;
  currentView: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onNavigate, currentView }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('HOME')}>
              <div className="bg-green-600 text-white p-2 rounded-lg mr-2 font-bold text-xl">N</div>
              <span className="font-bold text-xl text-green-900 hidden sm:block">NaijaPropertyHub</span>
            </div>

            <div className="hidden md:flex space-x-6 items-center">
              <button 
                onClick={() => onNavigate('HOME')}
                className={`text-sm font-medium px-2 py-1 rounded-md transition ${currentView === 'HOME' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Home
              </button>
              
              <button 
                onClick={() => onNavigate('EXPLORE')}
                className={`text-sm font-medium px-2 py-1 rounded-md transition ${currentView === 'EXPLORE' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Browse Assets
              </button>

              <button 
                onClick={() => onNavigate('ABOUT')}
                className={`text-sm font-medium px-2 py-1 rounded-md transition ${currentView === 'ABOUT' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                About Us
              </button>
              
              {user.role === 'ADMIN' && (
                <button 
                  onClick={() => onNavigate('ADMIN')}
                  className={`text-sm font-medium px-2 py-1 rounded-md transition ${currentView === 'ADMIN' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  Admin Console
                </button>
              )}

              {user.role === 'PARTNER' && (
                <button 
                  onClick={() => onNavigate('PARTNER')}
                  className={`text-sm font-medium px-2 py-1 rounded-md transition ${currentView === 'PARTNER' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  Partner Dashboard
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {user.role === 'VISITOR' ? (
                <button 
                  onClick={() => onNavigate('PARTNER')} // Simple way to trigger login view
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition shadow-sm"
                >
                  Partner Login
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase">
                    {user.role}
                  </span>
                  <button 
                    onClick={onLogout}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-green-600 text-white p-1.5 rounded-md mr-2 font-bold text-lg">N</div>
              <h3 className="text-lg font-bold">NaijaPropertyHub</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Nigeria's #1 trusted platform for real estate and premium hospitality. 
              Connecting people to their dreams since 2024.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-green-400">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('HOME')} className="hover:text-white transition">Home</button></li>
              <li><button onClick={() => onNavigate('ABOUT')} className="hover:text-white transition">About Us</button></li>
              <li><button onClick={() => onNavigate('EXPLORE')} className="hover:text-white transition">Find a House</button></li>
              <li><button onClick={() => onNavigate('EXPLORE')} className="hover:text-white transition">Buy Land</button></li>
              <li><button onClick={() => onNavigate('EXPLORE')} className="hover:text-white transition">Book Hotel</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-green-400">Partnership</h4>
            <p className="text-sm text-gray-400">
              Only authorized partners can list assets. Contact us today to secure your partnership and begin listing properties.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-green-400">Security</h4>
            <p className="text-sm text-gray-400">
              Our AI Guardian monitors every listing 24/7. We utilize Gemini-powered fraud detection to keep our marketplace safe.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © 2024 NaijaPropertyHub. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
