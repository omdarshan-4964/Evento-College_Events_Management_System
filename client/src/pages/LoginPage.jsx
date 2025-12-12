// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Shield, Users } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import AuthFormCard from '../components/layout/AuthFormCard';
import Spinner from '../components/common/Spinner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { setError(null) }, [setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) navigate('/dashboard');
  };

  const quickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <div className="space-y-6">
      {/* Demo Credentials Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-xl shadow-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Shield size={20} />
          Demo Credentials - Try Different Roles!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <button
            onClick={() => quickLogin('student@demo.com')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 text-left transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <User size={16} />
              Student Account
            </div>
            <div className="text-xs opacity-90">student@demo.com</div>
            <div className="text-xs opacity-75">demo123</div>
          </button>
          <button
            onClick={() => quickLogin('club@demo.com')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 text-left transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <Users size={16} />
              Club Admin
            </div>
            <div className="text-xs opacity-90">club@demo.com</div>
            <div className="text-xs opacity-75">demo123</div>
          </button>
          <button
            onClick={() => quickLogin('admin@demo.com')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 text-left transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <Shield size={16} />
              Super Admin
            </div>
            <div className="text-xs opacity-90">admin@demo.com</div>
            <div className="text-xs opacity-75">demo123</div>
          </button>
        </div>
        <p className="text-xs mt-3 opacity-75">Click any card above to auto-fill credentials and explore different dashboards!</p>
      </div>

      <AuthFormCard title="Login to your account">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center text-sm">{error}</div>}
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="text-sm">
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                Don't have an account?
            </Link>
        </div>
        <div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
            {loading ? <Spinner /> : 'Sign in'}
          </button>
        </div>
      </form>
    </AuthFormCard>
    </div>
  );
};
export default LoginPage;