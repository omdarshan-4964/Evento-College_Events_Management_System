import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import venueService from '../../services/venueService';
import bookingService from '../../services/bookingService';
import Spinner from '../../components/common/Spinner';

const NewBookingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventId, eventName } = location.state || {};

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        venue: '',
        date: '',
        startTime: '',
        endTime: '',
    });

    useEffect(() => {
        if (!eventId) {
            // If no event is passed, redirect back to dashboard
            navigate('/dashboard');
            return;
        }

        const fetchVenues = async () => {
            try {
                const { data } = await venueService.getVenues();
                setVenues(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, venue: data[0]._id }));
                }
            } catch (err) {
                setError('Could not load venues.');
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, [eventId, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { venue, date, startTime, endTime } = formData;
        const startDateTime = new Date(`${date}T${startTime}`);
        const endDateTime = new Date(`${date}T${endTime}`);

        try {
            await bookingService.createBooking({
                event: eventId,
                venue: venue,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
            });
            toast.success('✅ Booking request submitted successfully!');
            navigate('/dashboard');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to create booking.';
            setError(errorMsg);
            toast.error(errorMsg);
            setLoading(false);
        }
    };

    if (!eventId) return null;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-6 shadow-2xl text-white mb-8 max-w-2xl mx-auto"
            >
                <div className="flex items-center gap-3">
                    <MapPin size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">Book a Venue</h1>
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
                    {loading && !venues.length ? <div className="flex justify-center py-8"><Spinner /></div> : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center text-sm">{error}</motion.div>}
                            
                            <div>
                                <label htmlFor="venue" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    <MapPin size={16} /> Venue
                                </label>
                                <motion.select whileFocus={{ scale: 1.01 }} name="venue" id="venue" value={formData.venue} onChange={handleChange} className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all">
                                    {venues.map(v => <option key={v._id} value={v._id}>{v.name} (Capacity: {v.capacity})</option>)}
                                </motion.select>
                            </div>

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
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                    {loading ? <Spinner /> : <><Sparkles size={18} /> Request Booking</>}
                                </motion.button>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default NewBookingPage;
