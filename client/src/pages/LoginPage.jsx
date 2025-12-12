// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, Users, Mail, Lock, Sparkles, LogIn } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

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

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google OAuth will be implemented here');
    alert('Google OAuth integration coming soon! For now, use demo credentials above.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-accent-400/20 to-purple-400/20 rounded-full blur-3xl"
      />

      <div className="max-w-5xl w-full space-y-8 relative z-10">
        {/* Demo Credentials Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 dark:from-primary-700 dark:via-accent-700 dark:to-purple-700 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden"
        >
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <div className="relative z-10">
            <motion.h3 
              className="text-xl font-extrabold mb-4 flex items-center gap-3"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield size={24} />
              <span>🎉 Demo Credentials - Try Different Roles!</span>
              <Sparkles size={20} />
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <User size={20} />, role: 'Student Account', email: 'student@demo.com', gradient: 'from-blue-500 to-cyan-500' },
                { icon: <Users size={20} />, role: 'Club Admin', email: 'club@demo.com', gradient: 'from-purple-500 to-pink-500' },
                { icon: <Shield size={20} />, role: 'Super Admin', email: 'admin@demo.com', gradient: 'from-orange-500 to-red-500' },
              ].map((demo, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => quickLogin(demo.email)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-xl p-4 text-left transition-all shadow-lg hover:shadow-2xl border border-white/30 group`}
                >
                  <div className={`flex items-center gap-2 mb-2 font-bold text-lg`}>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${demo.gradient}`}>
                      {demo.icon}
                    </div>
                    {demo.role}
                  </div>
                  <div className="text-sm opacity-90 font-medium">{demo.email}</div>
                  <div className="text-xs opacity-75 mt-1">Password: demo123</div>
                  <div className="mt-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to auto-fill →
                  </div>
                </motion.button>
              ))}
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm mt-4 opacity-90 text-center font-medium"
            >
              ✨ Click any card above to auto-fill credentials and explore different dashboards!
            </motion.p>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mb-4 shadow-lg"
              >
                <LogIn size={32} className="text-white" />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-slate-400" />
                  </div>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-slate-400" />
                  </div>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    id="password" 
                    name="password" 
                    type="password" 
                    autoComplete="current-password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Sign In Button */}
              <motion.button 
                type="submit" 
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Spinner />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google OAuth Button */}
              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center gap-3 py-4 px-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
              >
                <FcGoogle size={24} />
                <span>Sign in with Google</span>
              </motion.button>

              {/* Register Link */}
              <div className="text-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">Don't have an account? </span>
                <Link 
                  to="/register" 
                  className="font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  Sign up now
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default LoginPage;
export default LoginPage;