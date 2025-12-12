import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import bookingService from '../../services/bookingService';
import eventService from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../common/Spinner';
import BookingStatusBadge from '../bookings/BookingStatusBadge';
import { Edit, Trash2, CalendarPlus, Sparkles, Calendar, MapPin } from 'lucide-react';

const ClubDashboard = () => {
    const [myBookings, setMyBookings] = useState([]);
    const [unbookedEvents, setUnbookedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [bookingsRes, eventsRes] = await Promise.all([
                bookingService.getMyBookings(),
                eventService.getAllEvents()
            ]);

            setMyBookings(bookingsRes.data);

            const bookedEventIds = new Set(bookingsRes.data.map(b => b.event?._id));
            
            // FIX: Use optional chaining (?.) to prevent crashes if an event has no organizer
            const myCreatedEvents = eventsRes.data.filter(event => event.organizer?._id === user._id);
            
            const notYetBooked = myCreatedEvents.filter(event => !bookedEventIds.has(event._id));
            
            setUnbookedEvents(notYetBooked);

        } catch (err) {
            // This catch block is triggered by the silent crash
            console.error("Error processing dashboard data:", err);
            setError("Failed to process your dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user._id]);

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking request?')) {
            try {
                await bookingService.deleteBooking(bookingId);
                toast.success('🗑️ Booking cancelled successfully!');
                fetchData();
            } catch (err) {
                toast.error('Failed to cancel booking');
                setError('Failed to cancel booking.');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center mt-10"><Spinner /></div>;
    }

    return (
        <div className="mt-8 space-y-8">
            {/* Page Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-accent-600 rounded-2xl p-6 shadow-2xl text-white"
            >
                <div className="flex items-center gap-3">
                    <Sparkles size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">Club Dashboard</h1>
                        <p className="text-sm opacity-90 mt-1">Manage your events and venue bookings</p>
                    </div>
                </div>
            </motion.div>

            {error && (
                <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-4 rounded-xl border-l-4 border-red-500 font-medium"
                >
                    {error}
                </motion.p>
            )}

            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center">
                    <Calendar size={28} className="mr-3 text-accent-500"/>
                    Events Awaiting Booking
                    <span className="ml-3 px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded-full text-sm font-bold">
                        {unbookedEvents.length}
                    </span>
                </h2>
                {unbookedEvents.length > 0 ? (
                    <div className="space-y-4">
                        {unbookedEvents.map((event, idx) => (
                            <motion.div 
                                key={event._id} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.01, y: -2 }}
                                className="p-6 bg-gradient-to-r from-white to-accent-50/30 dark:from-slate-800 dark:to-slate-800/80 border-2 border-slate-200 dark:border-slate-700 hover:border-accent-300 dark:hover:border-accent-700 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                            >
                                <div className="flex-1">
                                    <p className="font-bold text-xl text-slate-900 dark:text-white mb-1">{event.name}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        <span className="font-medium">Club:</span> {event.clubName}
                                    </p>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/bookings/new', { state: { eventId: event._id, eventName: event.name } })}
                                    className="flex items-center gap-2 px-6 py-3 text-sm rounded-xl font-bold text-white bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                                >
                                    <CalendarPlus size={18} />
                                    <span>Book Venue</span>
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                    >
                        ✅ All your created events have booking requests
                    </motion.p>
                )}
            </motion.section>

            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center">
                    <MapPin size={28} className="mr-3 text-primary-500"/>
                    My Booking Requests
                    <span className="ml-3 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-bold">
                        {myBookings.length}
                    </span>
                </h2>
                {myBookings.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-700/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Event</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Venue</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                {myBookings.map((booking, idx) => (
                                    <motion.tr 
                                        key={booking._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.05)' }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">{booking.event?.name || 'Deleted Event'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{booking.venue?.name || 'Deleted Venue'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{new Date(booking.startTime).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm"><BookingStatusBadge status={booking.status} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => navigate(`/bookings/${booking._id}/edit`)} 
                                                className="p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} className="text-primary-600 dark:text-primary-400" />
                                            </motion.button>
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleCancelBooking(booking._id)} 
                                                className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                    >
                        You haven't made any booking requests yet
                    </motion.p>
                )}
            </motion.section>
        </div>
    );
};

export default ClubDashboard;
