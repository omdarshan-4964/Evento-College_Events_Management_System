// src/pages/RegisterPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, Users, Mail, Lock, Sparkles, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';


const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const { register, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { setError(null) }, [setError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) navigate('/dashboard');
  };

  const fillDemoCredentials = (role) => {
    const demoData = {
      student: { name: 'Demo Student', email: 'student@demo.com', password: 'demo123', role: 'student' },
      club_admin: { name: 'Demo Club Admin', email: 'club@demo.com', password: 'demo123', role: 'club_admin' },
      super_admin: { name: 'Demo Super Admin', email: 'admin@demo.com', password: 'demo123', role: 'super_admin' },
    };
    setFormData(demoData[role]);
  };

  const demoAccounts = [
    { icon: <User size={24} />, role: 'Student Account', email: 'student@demo.com', gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20', key: 'student' },
    { icon: <Users size={24} />, role: 'Club Admin', email: 'club@demo.com', gradient: 'from-purple-500 to-pink-500', bg: 'bg-purple-50 dark:bg-purple-900/20', key: 'club_admin' },
    { icon: <Shield size={24} />, role: 'Super Admin', email: 'admin@demo.com', gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-50 dark:bg-orange-900/20', key: 'super_admin' },
  ];

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

      {/* Left Side - Demo Info */}
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
            <span>Available Demo Accounts</span>
            <Sparkles size={24} className="text-accent-500" />
          </motion.h3>
          
          <div className="space-y-4">
            {demoAccounts.map((demo, idx) => (
              <motion.button
                key={idx}
                type="button"
                onClick={() => fillDemoCredentials(demo.key)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full ${demo.bg} border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${demo.gradient} text-white shadow-lg`}>
                    {demo.icon}
                  </div>
                  <div className="font-bold text-xl text-slate-900 dark:text-white">{demo.role}</div>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-medium mb-1 text-left">{demo.email}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 text-left">Password: demo123</div>
                <div className="text-xs text-primary-600 dark:text-primary-400 font-bold mt-2 text-left">👆 Click to auto-fill</div>
              </motion.button>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm mt-6 text-slate-600 dark:text-slate-400 text-center font-medium bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-200 dark:border-slate-700"
          >
            ✨ Already have demo credentials? <Link to="/login" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">Login here</Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Right Side - Register Form */}
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
              <UserPlus size={32} className="text-white" />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Join us to manage college events
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

            {/* Full Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={20} className="text-slate-400" />
                </div>
                <motion.input 
                  whileFocus={{ scale: 1.01 }}
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email-register" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-slate-400" />
                </div>
                <motion.input 
                  whileFocus={{ scale: 1.01 }}
                  id="email-register" 
                  name="email" 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password-register" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-slate-400" />
                </div>
                <motion.input 
                  whileFocus={{ scale: 1.01 }}
                  id="password-register" 
                  name="password" 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Create Account Button */}
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Create Account</span>
                </>
              )}
            </motion.button>

            {/* Login Link */}
            <div className="text-center text-sm">
              <span className="text-slate-600 dark:text-slate-400">Already have an account? </span>
              <Link 
                to="/login" 
                className="font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
export default RegisterPage;