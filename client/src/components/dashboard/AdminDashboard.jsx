import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import bookingService from '../../services/bookingService';
import Spinner from '../common/Spinner';
import { CheckCircle, XCircle, Clock, CalendarCheck, Archive, Trash2, Sparkles } from 'lucide-react';
import BookingStatusBadge from '../bookings/BookingStatusBadge';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        try {
            const { data } = await bookingService.getAllBookings();
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBookings(data);
        } catch (err) {
            setError('Failed to fetch booking requests.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusUpdate = async (bookingId, status) => {
        const originalBookings = [...bookings];
        const updatedBookings = bookings.map(b => 
            b._id === bookingId ? { ...b, status } : b
        );
        setBookings(updatedBookings);

        try {
            await bookingService.updateBookingStatus(bookingId, status);
            const statusText = status === 'approved' ? 'approved ✅' : 'rejected ❌';
            toast.success(`Booking ${statusText}`);
        } catch (err) {
            setError(`Failed to update booking. Reverting changes.`);
            toast.error('Failed to update booking status');
            setBookings(originalBookings);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking? This will also remove all student registrations for it.')) {
            try {
                await bookingService.deleteBooking(bookingId);
                toast.success('🗑️ Booking deleted successfully');
                fetchBookings();
            } catch (err) {
                setError('Failed to cancel the booking.');
                toast.error('Failed to delete booking');
            }
        }
    };

    const pendingBookings = bookings.filter(b => b.status === 'pending');
    const approvedUpcoming = bookings.filter(b => b.status === 'approved' && new Date(b.startTime) > new Date());
    const archivedBookings = bookings.filter(b => b.status === 'rejected' || b.status === 'cancelled' || (b.status === 'approved' && new Date(b.startTime) <= new Date()));

    if (loading) return <div className="flex justify-center mt-10"><Spinner /></div>;

    // This component now safely handles potentially null events or venues
    const BookingRow = ({ booking, children }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01, y: -2 }}
            className="p-6 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
            <div className="flex-1">
                {/* FIX: Use optional chaining (?.) and provide a fallback text */}
                <p className="font-bold text-xl text-primary-600 dark:text-primary-400 mb-1">
                    {booking.event?.name || 'Deleted Event'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                    <span className="font-medium">Venue:</span> {booking.venue?.name || 'Deleted Venue'}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    📅 {new Date(booking.startTime).toLocaleString()}
                </p>
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0">
                {children}
            </div>
        </motion.div>
    );

    return (
        <div className="mt-8 space-y-8">
            {/* Page Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 rounded-2xl p-6 shadow-2xl text-white"
            >
                <div className="flex items-center gap-3">
                    <Sparkles size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
                        <p className="text-sm opacity-90 mt-1">Manage all venue booking requests</p>
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
                <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-900 dark:text-white">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Clock size={28} className="mr-3 text-yellow-500"/>
                    </motion.div>
                    Pending Requests
                    <span className="ml-3 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-bold">
                        {pendingBookings.length}
                    </span>
                </h2>
                {pendingBookings.length > 0 ? (
                    <div className="space-y-4">
                        {pendingBookings.map((booking, idx) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <BookingRow booking={booking}>
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleStatusUpdate(booking._id, 'approved')} 
                                        className="p-3 rounded-xl bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-colors shadow-md"
                                        title="Approve"
                                    >
                                        <CheckCircle size={22} className="text-green-600 dark:text-green-400"/>
                                    </motion.button>
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleStatusUpdate(booking._id, 'rejected')} 
                                        className="p-3 rounded-xl bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-colors shadow-md"
                                        title="Reject"
                                    >
                                        <XCircle size={22} className="text-red-600 dark:text-red-400"/>
                                    </motion.button>
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleCancelBooking(booking._id)} 
                                        className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-md"
                                        title="Delete"
                                    >
                                        <Trash2 size={22} className="text-slate-600 dark:text-slate-300"/>
                                    </motion.button>
                                </BookingRow>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                    >
                        ✅ No pending requests at the moment
                    </motion.p>
                )}
            </motion.section>

            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
                <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-900 dark:text-white">
                    <CalendarCheck size={28} className="mr-3 text-green-500"/>
                    Approved Upcoming Bookings
                    <span className="ml-3 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold">
                        {approvedUpcoming.length}
                    </span>
                </h2>
                {approvedUpcoming.length > 0 ? (
                     <div className="space-y-4">
                        {approvedUpcoming.map((booking, idx) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <BookingRow booking={booking}>
                                    <BookingStatusBadge status={booking.status} />
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleCancelBooking(booking._id)} 
                                        className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-md"
                                        title="Cancel"
                                    >
                                        <Trash2 size={22} className="text-slate-600 dark:text-slate-300"/>
                                    </motion.button>
                                </BookingRow>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-500 dark:text-slate-400 text-center py-8 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                    >
                        No approved upcoming bookings
                    </motion.p>
                )}
            </motion.section>

            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
                <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-900 dark:text-white">
                    <Archive size={28} className="mr-3 text-slate-500"/>
                    Archived Bookings
                    <span className="ml-3 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-bold">
                        {archivedBookings.length}
                    </span>
                </h2>
                 {archivedBookings.length > 0 ? (
                    <div className="space-y-4">
                        {archivedBookings.map((booking, idx) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <BookingRow booking={booking}>
                                    <BookingStatusBadge status={booking.status} />
                                </BookingRow>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Archive size={64} className="mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                        </motion.div>
                        <p className="text-slate-600 dark:text-slate-400 font-semibold text-lg mb-2">
                            No archived bookings yet
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-sm max-w-md mx-auto">
                            Bookings are automatically archived when:
                        </p>
                        <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                            <div className="flex items-center justify-center gap-2 bg-white/50 dark:bg-slate-800/50 py-2 px-4 rounded-lg">
                                <span className="text-red-500">❌</span>
                                <span>Booking is <strong>rejected</strong></span>
                            </div>
                            <div className="flex items-center justify-center gap-2 bg-white/50 dark:bg-slate-800/50 py-2 px-4 rounded-lg">
                                <span className="text-orange-500">🚫</span>
                                <span>Booking is <strong>cancelled</strong></span>
                            </div>
                            <div className="flex items-center justify-center gap-2 bg-white/50 dark:bg-slate-800/50 py-2 px-4 rounded-lg">
                                <span className="text-blue-500">📅</span>
                                <span>Event date has <strong>passed</strong></span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.section>
        </div>
    );
};

export default AdminDashboard;
