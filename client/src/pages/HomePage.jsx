import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, CheckSquare, Users, Info, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl text-center transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
    >
        <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex p-5 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6 shadow-lg group-hover:shadow-glow"
        >
            {icon}
        </motion.div>
        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
    </motion.div>
);

const FloatingOrb = ({ className, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay }}
        className={`absolute rounded-full blur-3xl ${className}`}
        style={{
            animation: `float ${6 + delay}s ease-in-out infinite`,
        }}
    />
);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 min-h-screen relative overflow-hidden">
      {/* Animated Background Orbs */}
      <FloatingOrb className="w-96 h-96 bg-primary-400/20 -top-48 -left-48" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-accent-400/20 top-1/4 -right-40" delay={1} />
      <FloatingOrb className="w-72 h-72 bg-purple-400/20 bottom-0 left-1/4" delay={2} />
      
      {/* Demo Info Banner */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-600 dark:via-orange-600 dark:to-red-600 text-white py-4 px-4 relative overflow-hidden"
      >
        <motion.div 
          animate={{ x: ['0%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm md:text-base relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Info size={22} className="flex-shrink-0" />
          </motion.div>
          <p className="font-semibold">
            <span className="font-extrabold">🎉 Demo Mode:</span> Explore all features with pre-loaded demo accounts. Login as Student, Club Admin, or Super Admin!
          </p>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative text-center py-20 sm:py-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-full mb-6 border border-primary-200 dark:border-primary-800"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={18} className="text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-bold text-primary-700 dark:text-primary-300">New: Demo Mode Active</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Manage College Events,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 dark:from-primary-400 dark:via-accent-400 dark:to-purple-400 animate-gradient">
                Effortlessly
              </span>
              .
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Evento is the all-in-one platform for managing your college events seamlessly. 
              Book venues, create events, and never miss an opportunity.
            </motion.p>
          </motion.div>
          
          {/* Demo Info Card with Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 max-w-3xl mx-auto bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border-2 border-primary-200 dark:border-primary-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="relative z-10">
              <motion.div 
                className="flex items-center justify-center gap-2 mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={24} className="text-primary-600 dark:text-primary-400" />
                <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
                  Welcome! Try the Full Experience!
                </h3>
                <Sparkles size={24} className="text-accent-600 dark:text-accent-400" />
              </motion.div>
              
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">
                This is a <strong>fully functional demo</strong> with sample events and multiple user roles. 
                Click <strong className="text-primary-600 dark:text-primary-400">Login</strong> to see demo credentials for Student, Club Admin, and Super Admin accounts.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {[
                  { icon: <Calendar size={16} />, text: 'Pre-loaded Events', color: 'from-blue-500 to-cyan-500' },
                  { icon: <Users size={16} />, text: 'Multiple User Roles', color: 'from-purple-500 to-pink-500' },
                  { icon: <Zap size={16} />, text: 'Full Functionality', color: 'from-green-500 to-emerald-500' },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`flex items-center gap-2 bg-gradient-to-r ${item.color} text-white px-5 py-3 rounded-xl shadow-lg font-semibold`}
                  >
                    {item.icon}
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <motion.button
              onClick={() => navigate('/register')}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(14, 165, 233, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-glow transition-all duration-300 flex items-center gap-2 text-lg"
            >
              <Sparkles size={20} />
              Get Started
            </motion.button>
            <motion.button
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-2xl shadow-xl hover:shadow-2xl border-2 border-primary-200 dark:border-primary-800 transition-all duration-300 flex items-center gap-2 text-lg"
            >
              <Shield size={20} />
              Login
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4"
              whileInView={{ scale: [0.9, 1.02, 1] }}
              viewport={{ once: true }}
            >
              Why Choose{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
                Evento
              </span>
              ?
            </motion.h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Experience the future of college event management with our cutting-edge features
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Calendar size={36} className="text-white" />}
              title="Real-time Calendar"
              description="Instantly view venue availability with a shared calendar. Avoid booking conflicts before they happen with smart scheduling."
              delay={0}
            />
            <FeatureCard 
              icon={<CheckSquare size={36} className="text-white" />}
              title="Streamlined Booking"
              description="Club admins can create events and request venue bookings in just a few clicks, with a clear and efficient approval workflow."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Users size={36} className="text-white" />}
              title="Student Registration"
              description="Students can easily discover and register for upcoming events, with capacity limits automatically handled and tracked."
              delay={0.2}
            />
          </div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: <TrendingUp size={32} />, number: '100+', label: 'Events Managed', color: 'from-blue-500 to-cyan-500' },
              { icon: <Users size={32} />, number: '500+', label: 'Active Users', color: 'from-purple-500 to-pink-500' },
              { icon: <Calendar size={32} />, number: '50+', label: 'Venues Available', color: 'from-green-500 to-emerald-500' },
              { icon: <Sparkles size={32} />, number: '99%', label: 'Satisfaction Rate', color: 'from-orange-500 to-red-500' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white text-center shadow-xl`}
              >
                <motion.div 
                  className="flex justify-center mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl font-extrabold mb-1">{stat.number}</div>
                <div className="text-sm font-semibold opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-center py-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-600 dark:text-slate-400 font-medium"
        >
          &copy; {new Date().getFullYear()} Evento. All rights reserved. Made with ❤️ for college communities.
        </motion.p>
      </footer>
    </div>
  );
};

export default HomePage;