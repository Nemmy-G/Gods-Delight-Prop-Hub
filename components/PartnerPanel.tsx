
import React, { useState } from 'react';
import { AssetCategory, Listing, ListingType, Partner } from '../types';
import { analyzeListingAuthenticity } from '../services/geminiService';

interface PartnerPanelProps {
  partner: Partner;
  listings: Listing[];
  onAddListing: (l: Listing) => void;
}

const PartnerPanel: React.FC<PartnerPanelProps> = ({ partner, listings, onAddListing }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: AssetCategory.HOUSE,
    type: ListingType.SALE,
    features: '',
  });

  const partnerListings = listings.filter(l => l.partnerId === partner.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // AI Authenticity Check
    const validation = await analyzeListingAuthenticity({
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      location: formData.location,
      type: formData.type
    });

    const newListing: Listing = {
      id: Math.random().toString(36).substr(2, 9),
      partnerId: partner.id,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      category: formData.category,
      price: Number(formData.price),
      location: formData.location,
      lat: 6.5244, // Default Lagos
      lng: 3.3792,
      features: formData.features.split(',').map(f => f.trim()),
      images: ['https://picsum.photos/seed/newlisting/800/600'],
      verified: validation.verified,
      flagged: validation.flagged,
      flagReason: validation.reason,
      createdAt: Date.now()
    };

    if (formData.category === AssetCategory.HOTEL_ROOM) {
      newListing.rating = 3; // Default
    }

    onAddListing(newListing);
    setLoading(false);
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      category: AssetCategory.HOUSE,
      type: ListingType.SALE,
      features: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-sm border p-8 sticky top-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload New Asset</h2>
          <p className="text-sm text-gray-500 mb-6">Our AI will scan your upload for authenticity before it goes live.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Asset Title</label>
              <input 
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="e.g. 3 Bedroom Flat, Victoria Island"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
                <select 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as any})}
                >
                  {partner.type === 'REAL_ESTATE' ? (
                    <>
                      <option value={AssetCategory.HOUSE}>House</option>
                      <option value={AssetCategory.LAND}>Land</option>
                    </>
                  ) : (
                    <option value={AssetCategory.HOTEL_ROOM}>Hotel Room</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Transaction</label>
                <select 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as any})}
                >
                  <option value={ListingType.SALE}>Sale</option>
                  <option value={ListingType.RENT}>Rent</option>
                  <option value={ListingType.LEASE}>Lease</option>
                  {partner.type === 'HOTEL' && <option value={ListingType.HOTEL}>Standard Booking</option>}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Price (₦)</label>
              <input 
                required
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="0.00"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Location (State/Area)</label>
              <input 
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="e.g. Maitama, Abuja"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
              <textarea 
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-24"
                placeholder="Describe features, utilities, etc."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-bold transition flex items-center justify-center space-x-2 ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {loading ? (
                <span>AI is scanning...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  <span>Publish Asset</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Your Active Inventory</h2>
          <p className="text-gray-500">Manage assets uploaded by {partner.name}</p>
        </div>

        <div className="space-y-4">
          {partnerListings.length === 0 && (
            <div className="bg-white p-12 text-center rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400">You haven't listed any assets yet.</p>
            </div>
          )}
          {partnerListings.map(l => (
            <div key={l.id} className="bg-white p-4 rounded-xl border flex items-center space-x-6">
              <img src={l.images[0]} alt={l.title} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{l.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${l.flagged ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {l.flagged ? 'Flagged by AI' : 'Verified'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">{l.description}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="font-bold text-green-700">₦{l.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400">{l.location}</span>
                </div>
                {l.flagged && <p className="text-[10px] text-red-500 mt-1 italic">Reason: {l.flagReason}</p>}
              </div>
              <button className="text-gray-400 hover:text-red-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerPanel;
