import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { LogOut, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(userCredential.user);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-3xl font-black italic tracking-tighter mb-2">ADMIN</h1>
        <p className="text-gray-600 text-sm font-bold tracking-widest uppercase mb-8">
          Login to manage products
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@weekend-shopping.com"
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 font-black tracking-widest uppercase hover:bg-gray-800 disabled:opacity-50 transition-colors mt-6"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          For admin access, contact the system administrator
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
