import { useState, useEffect } from 'react';
import bookingService from '../../services/bookingService';
import Spinner from '../common/Spinner';
import { CheckCircle, XCircle, Clock, CalendarCheck, Archive, Trash2 } from 'lucide-react';
import BookingStatusBadge from '../bookings/BookingStatusBadge';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        // No need to set loading here again if called from handlers
        try {
            const { data } = await bookingService.getAllBookings();
            // Sort by most recently created
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
        } catch (err) {
            setError(`Failed to update booking. Reverting changes.`);
            setBookings(originalBookings);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking? This will also remove all student registrations for it.')) {
            try {
                await bookingService.deleteBooking(bookingId);
                fetchBookings(); // Refresh the list from the server
            } catch (err) {
                setError('Failed to cancel the booking.');
            }
        }
    };

    const pendingBookings = bookings.filter(b => b.status === 'pending');
    const approvedUpcoming = bookings.filter(b => b.status === 'approved' && new Date(b.startTime) > new Date());
    const archivedBookings = bookings.filter(b => b.status === 'rejected' || b.status === 'cancelled' || (b.status === 'approved' && new Date(b.startTime) <= new Date()));

    if (loading) return <div className="flex justify-center mt-10"><Spinner /></div>;

    const BookingRow = ({ booking, children }) => (
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <p className="font-bold text-lg text-indigo-600 dark:text-indigo-400">{booking.event.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Venue: {booking.venue.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(booking.startTime).toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0">
                {children}
            </div>
        </div>
    );

    return (
        <div className="mt-8 space-y-8">
            {error && <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">{error}</p>}
            
            <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center"><Clock size={22} className="mr-3 text-yellow-500"/>Pending Requests</h2>
                {pendingBookings.length > 0 ? (
                    <div className="space-y-4">
                        {pendingBookings.map(booking => (
                            <BookingRow key={booking._id} booking={booking}>
                                <button onClick={() => handleStatusUpdate(booking._id, 'approved')} className="p-2 rounded-full bg-green-100 hover:bg-green-200"><CheckCircle size={20} className="text-green-600"/></button>
                                <button onClick={() => handleStatusUpdate(booking._id, 'rejected')} className="p-2 rounded-full bg-red-100 hover:bg-red-200"><XCircle size={20} className="text-red-600"/></button>
                                <button onClick={() => handleCancelBooking(booking._id)} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"><Trash2 size={20} className="text-slate-600"/></button>
                            </BookingRow>
                        ))}
                    </div>
                ) : <p className="text-slate-500 dark:text-slate-400">No pending requests.</p>}
            </section>

            <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center"><CalendarCheck size={22} className="mr-3 text-green-500"/>Approved Upcoming Bookings</h2>
                {approvedUpcoming.length > 0 ? (
                     <div className="space-y-4">
                        {approvedUpcoming.map(booking => (
                            <BookingRow key={booking._id} booking={booking}>
                                <BookingStatusBadge status={booking.status} />
                                <button onClick={() => handleCancelBooking(booking._id)} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"><Trash2 size={20} className="text-slate-600"/></button>
                            </BookingRow>
                        ))}
                    </div>
                ) : <p className="text-slate-500 dark:text-slate-400">No approved upcoming bookings.</p>}
            </section>

            <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center"><Archive size={22} className="mr-3 text-slate-500"/>Archived Bookings</h2>
                 {archivedBookings.length > 0 ? (
                    <div className="space-y-4">
                        {archivedBookings.map(booking => (
                           <BookingRow key={booking._id} booking={booking}>
                                <BookingStatusBadge status={booking.status} />
                           </BookingRow>
                        ))}
                    </div>
                ) : <p className="text-slate-500 dark:text-slate-400">No archived bookings.</p>}
            </section>
        </div>
    );
};

export default AdminDashboard;
