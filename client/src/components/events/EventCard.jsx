import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Check, Users, AlertCircle, Sparkles } from 'lucide-react';
import registrationService from '../../services/registrationService';

const EventCard = ({ booking, isRegistered, onRegisterSuccess }) => {
    const { event, venue, startTime, registrationCount } = booking || {};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const isFull = venue ? registrationCount >= venue.capacity : true;
    const fillPercentage = venue ? (registrationCount / venue.capacity) * 100 : 0;

    const formattedDate = startTime ? new Date(startTime).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric',
    }) : 'Date not available';

    const formattedTime = startTime ? new Date(startTime).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true,
    }) : '';

    // Get category color
    const getCategoryColor = (category) => {
        const colors = {
            'Workshop': 'from-blue-500 to-cyan-500',
            'Competition': 'from-purple-500 to-pink-500',
            'Seminar': 'from-green-500 to-emerald-500',
            'Cultural': 'from-orange-500 to-red-500',
            'Other': 'from-gray-500 to-slate-500',
        };
        return colors[category] || colors['Other'];
    };

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        try {
            await registrationService.registerForEvent(booking._id);
            onRegisterSuccess?.(booking._id);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    const renderRegistrationButton = () => {
        if (isFull && !isRegistered) {
            return (
                <button disabled className="w-full px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl cursor-not-allowed opacity-75">
                    <AlertCircle size={18} />
                    <span>Event Full</span>
                </button>
            );
        }
        if (isRegistered) {
            return (
                <button disabled className="w-full px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl cursor-not-allowed shadow-lg">
                    <Check size={18} />
                    <span>✓ Registered</span>
                </button>
            );
        }
        return (
            <motion.button 
                onClick={handleRegister}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Registering...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Register Now
                        </>
                    )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
        );
    };

    if (!event || !venue) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col p-6 text-center border border-red-200 dark:border-red-800"
            >
                <AlertCircle size={32} className="mx-auto text-red-500 mb-4" />
                <h3 className="font-bold text-slate-900 dark:text-white">Event Data Missing</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">This event may have been removed.</p>
            </motion.div>
        )
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
        >
            {/* Header with gradient */}
            <div className={`h-2 bg-gradient-to-r ${getCategoryColor(event.category)}`} />
            
            {/* Category Badge */}
            <div className="p-6 pb-0">
                <div className="flex items-start justify-between mb-3">
                    <motion.span 
                        initial={{ scale: 1 }}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} text-white shadow-md`}
                    >
                        {event.category}
                    </motion.span>
                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                        {event.clubName}
                    </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                    {event.name}
                </h3>
            </div>

            <div className="p-6 pt-4 flex-grow space-y-3">
                {/* Date */}
                <motion.div 
                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3"
                    whileHover={{ x: 4 }}
                >
                    <Calendar size={18} className="text-primary-500 flex-shrink-0" />
                    <div>
                        <div className="font-semibold">{formattedDate}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{formattedTime}</div>
                    </div>
                </motion.div>

                {/* Venue */}
                <motion.div 
                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3"
                    whileHover={{ x: 4 }}
                >
                    <MapPin size={18} className="text-accent-500 flex-shrink-0" />
                    <span className="font-medium">{venue.name}</span>
                </motion.div>

                {/* Capacity Progress */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                            <Users size={18} className="text-green-500" />
                            <span>{registrationCount} / {venue.capacity}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {Math.round(fillPercentage)}% Full
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${fillPercentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                                fillPercentage >= 90 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                                fillPercentage >= 70 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                'bg-gradient-to-r from-green-500 to-emerald-500'
                            }`}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0">
                {error && (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 dark:text-red-400 text-center mb-3 bg-red-50 dark:bg-red-900/20 py-2 rounded-lg"
                    >
                        {error}
                    </motion.p>
                )}
                {renderRegistrationButton()}
            </div>
        </motion.div>
    );
};

export default EventCard;
    );
};

export default EventCard;
