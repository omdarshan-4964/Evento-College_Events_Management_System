import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import bookingService from '../../services/bookingService';
import registrationService from '../../services/registrationService';
import Spinner from '../common/Spinner';
import EventCard from '../events/EventCard';

const StudentDashboard = () => {
    const [approvedBookings, setApprovedBookings] = useState([]);
    const [myRegistrationIds, setMyRegistrationIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const [bookingsRes, regsRes] = await Promise.all([
                bookingService.getApprovedBookings(),
                registrationService.getMyRegistrations()
            ]);

            const upcoming = bookingsRes.data
                .filter(booking => new Date(booking.startTime) > new Date())
                .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
            
            setApprovedBookings(upcoming);

            const registrationIdSet = new Set(regsRes.data.map(reg => reg.booking._id));
            setMyRegistrationIds(registrationIdSet);

        } catch (err) {
            setError('Could not load upcoming events.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleSuccessfulRegistration = (bookingId) => {
        setMyRegistrationIds(prevIds => new Set(prevIds).add(bookingId));
    };

    return (
        <div className="mt-8">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    <Sparkles size={32} className="text-primary-500" />
                </motion.div>
                <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
                    Upcoming Events
                </h2>
            </motion.div>
            
            {loading ? (
                <div className="flex justify-center mt-20">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Spinner />
                    </motion.div>
                </div>
            ) : error ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8 mt-10"
                >
                    <p className="text-red-600 dark:text-red-400 font-semibold text-lg">{error}</p>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {approvedBookings.length > 0 ? (
                        approvedBookings.map((booking, index) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <EventCard 
                                    booking={booking}
                                    isRegistered={myRegistrationIds.has(booking._id)}
                                    onRegisterSuccess={handleSuccessfulRegistration}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="col-span-full text-center mt-20"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-8xl mb-4"
                            >
                                📅
                            </motion.div>
                            <p className="text-slate-500 dark:text-slate-400 text-xl font-semibold">
                                No upcoming events scheduled. Check back soon!
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default StudentDashboard;
