import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Sparkles } from 'lucide-react';
import registrationService from '../services/registrationService';
import Spinner from '../components/common/Spinner';
import EventCard from '../components/events/EventCard';

const MyRegistrationsPage = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyRegistrations = async () => {
            try {
                const { data } = await registrationService.getMyRegistrations();
                // Sort registrations by the soonest event first
                data.sort((a, b) => new Date(a.booking.startTime) - new Date(b.booking.startTime));
                setRegistrations(data);
            } catch (err) {
                setError('Could not load your registered events.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyRegistrations();
    }, []);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-2xl p-6 shadow-2xl text-white mb-8"
            >
                <div className="flex items-center gap-3">
                    <Ticket size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">My Registrations</h1>
                        <p className="text-sm opacity-90 mt-1">Events you've registered for</p>
                    </div>
                </div>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center py-20"><Spinner /></div>
            ) : error ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-500 bg-red-50 dark:bg-red-900/30 p-6 rounded-xl">{error}</motion.p>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {registrations.length > 0 ? (
                        registrations.map((reg, idx) => (
                            <motion.div
                                key={reg._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <EventCard
                                    booking={reg.booking}
                                    isRegistered={true}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="col-span-full text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700"
                        >
                            <Ticket size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                            <p className="text-slate-500 dark:text-slate-400 text-lg font-semibold">
                                You haven't registered for any events yet.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default MyRegistrationsPage;
