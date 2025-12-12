// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, Users, Mail, Lock, Sparkles, LogIn } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleLogin, loading, error, setError } = useAuth();
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

  const handleGoogleSuccess = async (credentialResponse) => {
    const success = await googleLogin(credentialResponse.credential);
    if (success) navigate('/dashboard');
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 relative overflow-hidden">
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

      {/* Left Side - Demo Credentials */}
      <div className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-lg"
        >
          <motion.h3 
            className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-slate-900 dark:text-white"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield size={32} className="text-primary-500" />
            <span>Demo Credentials</span>
            <Sparkles size={24} className="text-accent-500" />
          </motion.h3>
          
          <div className="space-y-4">
            {[
              { icon: <User size={24} />, role: 'Student Account', email: 'student@demo.com', gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: <Users size={24} />, role: 'Club Admin', email: 'club@demo.com', gradient: 'from-purple-500 to-pink-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
              { icon: <Shield size={24} />, role: 'Super Admin', email: 'admin@demo.com', gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
            ].map((demo, idx) => (
              <motion.button
                key={idx}
                onClick={() => quickLogin(demo.email)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, x: 10 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full ${demo.bg} border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 rounded-2xl p-6 text-left transition-all shadow-lg hover:shadow-2xl group`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${demo.gradient} text-white shadow-lg`}>
                    {demo.icon}
                  </div>
                  <div className="font-bold text-xl text-slate-900 dark:text-white">{demo.role}</div>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-medium mb-1">{demo.email}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Password: demo123</div>
                <div className="mt-3 text-xs font-bold text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Click to auto-fill <span className="text-base">→</span>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm mt-6 text-slate-600 dark:text-slate-400 text-center font-medium bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-200 dark:border-slate-700"
          >
            ✨ Click any card above to auto-fill credentials and explore different dashboards!
          </motion.p>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8"
        >
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
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  width="100%"
                />
            </div>

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
        </motion.div>
      </div>
    </div>
  );
};
export default LoginPage;
