
import React, { useState } from 'react';
import { Partner, AIAlert } from '../types';

interface AdminPanelProps {
  partners: Partner[];
  onAddPartner: (p: Partner) => void;
  alerts: AIAlert[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ partners, onAddPartner, alerts }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPartner, setNewPartner] = useState({
    name: '',
    type: 'REAL_ESTATE' as const,
    email: '',
    contactPerson: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPartner({
      ...newPartner,
      id: Math.random().toString(36).substr(2, 9),
      isApproved: true
    });
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Console</h1>
          <p className="text-gray-500">Oversee partnerships and platform security</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
        >
          Onboard New Partner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Verified Partners</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b text-gray-400 text-sm uppercase">
                  <tr>
                    <th className="pb-4">Partner Name</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Contact</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {partners.map(p => (
                    <tr key={p.id} className="text-sm">
                      <td className="py-4 font-medium">{p.name}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.type === 'HOTEL' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                          {p.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 text-gray-500">{p.contactPerson}</td>
                      <td className="py-4">
                        <span className="flex items-center text-green-600 font-semibold">
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">AI Security Hub</h2>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
            
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No threats detected currently.</p>
                  <p className="text-xs mt-1">AI Guardian is scanning...</p>
                </div>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'HIGH' ? 'bg-red-50 border-red-500' : 
                    alert.severity === 'MEDIUM' ? 'bg-orange-50 border-orange-500' : 'bg-blue-50 border-blue-500'
                  }`}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm uppercase text-gray-700">{alert.type}</h4>
                      <span className="text-xs text-gray-400">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6">Partner Onboarding</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  value={newPartner.name}
                  onChange={e => setNewPartner({...newPartner, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    value={newPartner.type}
                    onChange={e => setNewPartner({...newPartner, type: e.target.value as any})}
                  >
                    <option value="REAL_ESTATE">Real Estate</option>
                    <option value="HOTEL">Hotel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    value={newPartner.contactPerson}
                    onChange={e => setNewPartner({...newPartner, contactPerson: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  value={newPartner.email}
                  onChange={e => setNewPartner({...newPartner, email: e.target.value})}
                />
              </div>
              <div className="pt-4 flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
                >
                  Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
