import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import eventService from '../../services/eventService'; 
import { useAuth } from '../../context/AuthContext';
import Spinner from '../common/Spinner';
import BookingStatusBadge from '../bookings/BookingStatusBadge';
import { Edit, Trash2, CalendarPlus } from 'lucide-react';

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
            // Fetch both bookings and all events in parallel
            const [bookingsRes, eventsRes] = await Promise.all([
                bookingService.getMyBookings(),
                eventService.getAllEvents()
            ]);

            setMyBookings(bookingsRes.data);

            // Logic to find which events have NOT been booked yet
            const bookedEventIds = new Set(bookingsRes.data.map(b => b.event._id));
            const myCreatedEvents = eventsRes.data.filter(event => event.organizer._id === user._id);
            const notYetBooked = myCreatedEvents.filter(event => !bookedEventIds.has(event._id));
            
            setUnbookedEvents(notYetBooked);

        } catch (err) {
            setError("Failed to fetch your dashboard data.");
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
                fetchData(); // Re-fetch all data to ensure UI is consistent
            } catch (err) {
                setError('Failed to cancel booking.');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center mt-10"><Spinner /></div>;
    }

    return (
        <div className="mt-8 space-y-8">
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Section for Unbooked Events */}
            <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Events Awaiting Booking</h2>
                {unbookedEvents.length > 0 ? (
                    <div className="space-y-4">
                        {unbookedEvents.map(event => (
                            <div key={event._id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg">{event.name}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{event.clubName}</p>
                                </div>
                                <button 
                                    onClick={() => navigate('/bookings/new', { state: { eventId: event._id, eventName: event.name } })}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <CalendarPlus size={16} />
                                    <span>Book Venue</span>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                        All your created events have booking requests.
                    </p>
                )}
            </section>

            {/* Section for Existing Booking Requests */}
            <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">My Booking Requests</h2>
                {myBookings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-slate-50 dark:bg-slate-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Event</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Venue</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Date & Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                {myBookings.map(booking => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{booking.event.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{booking.venue.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{new Date(booking.startTime).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm"><BookingStatusBadge status={booking.status} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                                            <button onClick={() => navigate(`/bookings/${booking._id}/edit`)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><Edit size={16} /></button>
                                            <button onClick={() => handleCancelBooking(booking._id)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                        You haven't made any booking requests yet.
                    </p>
                )}
            </section>
        </div>
    );
};

export default ClubDashboard;
