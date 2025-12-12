import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Edit, Calendar, Clock, Sparkles } from 'lucide-react';
import bookingService from '../../services/bookingService';
import Spinner from '../../components/common/Spinner';

// Helper to format date for input fields
const formatDateForInput = (isoDate) => {
    if (!isoDate) return { date: '', time: '' };
    const d = new Date(isoDate);
    const timezoneOffset = d.getTimezoneOffset() * 60000;
    const localDate = new Date(d.getTime() - timezoneOffset);
    const date = localDate.toISOString().split('T')[0];
    const time = localDate.toTimeString().split(' ')[0].substring(0, 5);
    return { date, time };
};

const EditBookingPage = () => {
    const { id: bookingId } = useParams();
    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [formData, setFormData] = useState({ date: '', startTime: '', endTime: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data: currentBooking } = await bookingService.getBookingById(bookingId);
                
                if (currentBooking) {
                    setEventName(currentBooking.event.name);
                    const { date: startDate, time: startTime } = formatDateForInput(currentBooking.startTime);
                    const { time: endTime } = formatDateForInput(currentBooking.endTime);
                    setFormData({ date: startDate, startTime, endTime });
                } else {
                    setError('Booking not found.');
                }
            } catch (err) {
                setError('Failed to fetch booking details.');
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [bookingId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { date, startTime, endTime } = formData;
        const startDateTime = new Date(`${date}T${startTime}`);
        const endDateTime = new Date(`${date}T${endTime}`);

        try {
            await bookingService.updateBooking(bookingId, {
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
            });
            toast.success('✅ Booking updated successfully!');
            navigate('/dashboard');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to update booking.';
            setError(errorMsg);
            toast.error(errorMsg);
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    if (error) return <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-500 mt-20 bg-red-50 dark:bg-red-900/30 p-4 rounded-xl mx-4">{error}</motion.p>;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl p-6 shadow-2xl text-white mb-8 max-w-2xl mx-auto"
            >
                <div className="flex items-center gap-3">
                    <Edit size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">Edit Booking</h1>
                        <p className="text-sm opacity-90 mt-1">For: <span className="font-bold">{eventName}</span></p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-2xl mx-auto"
            >
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-300 mb-6 text-center bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border-l-4 border-amber-500">
                        ⚠️ Modifying the date/time will reset approval status to 'Pending'
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                <Calendar size={16} /> Date
                            </label>
                            <motion.input whileFocus={{ scale: 1.01 }} type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="startTime" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    <Clock size={16} /> Start Time
                                </label>
                                <motion.input whileFocus={{ scale: 1.01 }} type="time" name="startTime" id="startTime" value={formData.startTime} onChange={handleChange} required className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                            </div>
                            <div>
                                <label htmlFor="endTime" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    <Clock size={16} /> End Time
                                </label>
                                <motion.input whileFocus={{ scale: 1.01 }} type="time" name="endTime" id="endTime" value={formData.endTime} onChange={handleChange} required className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                            </div>
                        </div>
                        <div className="pt-2">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                {loading ? <Spinner /> : <><Sparkles size={18} /> Update & Resubmit</>}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default EditBookingPage;
