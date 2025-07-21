import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create booking.');
            setLoading(false);
        }
    };

    if (!eventId) return null;

    return (
        <div className="container mx-auto p-8">
            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold mb-2">Book a Venue for: <span className="text-indigo-500">{eventName}</span></h1>
                <p className="text-slate-600 dark:text-slate-300 mb-6">Select a venue and time slot for your event.</p>
                
                {loading && !venues.length ? <Spinner /> : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center text-sm">{error}</div>}
                        
                        <div>
                            <label htmlFor="venue" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Venue</label>
                            <select name="venue" id="venue" value={formData.venue} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                {venues.map(v => <option key={v._id} value={v._id}>{v.name} (Capacity: {v.capacity})</option>)}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                            <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Start Time</label>
                                <input type="time" name="startTime" id="startTime" value={formData.startTime} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="endTime" className="block text-sm font-medium text-slate-700 dark:text-slate-300">End Time</label>
                                <input type="time" name="endTime" id="endTime" value={formData.endTime} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                {loading ? <Spinner /> : 'Request Booking'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default NewBookingPage;
