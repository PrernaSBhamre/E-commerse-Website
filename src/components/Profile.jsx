import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        address: user.address || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.put('/auth/profile', {
        name: formData.name,
        email: formData.email,
        address: formData.address
      });

      if (response.status === 200) {
        setSuccess('Profile updated successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.put('/auth/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      if (response.status === 200) {
        setSuccess('Password changed successfully!');
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Manage Your Profile</h1>
            <p className="text-sm text-gray-600">Update your account settings and change your password</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {(error || success) && (
              <div className={`p-4 rounded-md border text-sm ${error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
                {error || success}
              </div>
            )}

            {/* Profile Info Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Personal Information</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm transition-all bg-gray-50"
                      disabled
                    />
                    <p className="text-[10px] text-gray-500">Email cannot be changed.</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Shipping Address</label>
                  <textarea
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm transition-all resize-none"
                  />
                </div>
                <div className="flex justify-end">
                    <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                    Save Changes
                    </button>
                </div>
              </form>
            </div>

            {/* Password Change Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Security Settings</h2>
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Current Password</label>
                  <input
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">New Password</label>
                    <input
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Confirm New Password</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                    <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                    Update Password
                    </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-72 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{user?.name}</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.role || 'Customer'}</p>
                    </div>
                </div>
                
                <nav className="space-y-1">
                    <button className="w-full text-left px-3 py-2 text-sm font-semibold bg-red-50 text-red-600 rounded-md transition-all">
                        Account Overview
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-all">
                        Order History
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-all">
                        Wishlist Items
                    </button>
                </nav>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 text-white shadow-sm">
              <h4 className="font-bold text-sm mb-2">Shopping with us?</h4>
              <p className="text-xs text-gray-400 mb-4">You have {user?.role === 'admin' ? 'unlimited' : 'standard'} access to all features.</p>
              <div className="h-1 bg-gray-800 w-full rounded-full overflow-hidden">
                <div className="bg-red-500 h-full w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
