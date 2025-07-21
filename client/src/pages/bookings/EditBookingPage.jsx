import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
                // Use the new, correct service function to get a single booking
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
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update booking.');
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;
    if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

    return (
        <div className="container mx-auto p-8">
            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold mb-2">Edit Booking for: <span className="text-indigo-500">{eventName}</span></h1>
                <p className="text-slate-600 dark:text-slate-300 mb-6">Modify the date and time. This will reset the approval status to 'Pending'.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            {loading ? <Spinner /> : 'Update & Resubmit for Approval'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookingPage;
