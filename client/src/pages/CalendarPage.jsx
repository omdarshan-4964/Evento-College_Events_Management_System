import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import bookingService from '../services/bookingService';
import Spinner from '../components/common/Spinner';

// Setup the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApprovedBookings = async () => {
            try {
                const { data } = await bookingService.getApprovedBookings();
                // Format the data for react-big-calendar
                const formattedEvents = data.map(booking => ({
                    title: `${booking.event.name} (${booking.venue.name})`,
                    start: new Date(booking.startTime),
                    end: new Date(booking.endTime),
                    resource: booking, // a copy of the original booking data
                }));
                setEvents(formattedEvents);
            } catch (err) {
                setError('Failed to load calendar events. Please ensure you are logged in.');
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedBookings();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
                <Spinner />
            </div>
        );
    }
    
    if (error) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-red-500 bg-red-50 dark:bg-red-900/30 mx-4 rounded-xl p-6"
            >
                {error}
            </motion.div>
        )
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl p-6 shadow-2xl text-white mb-8"
            >
                <div className="flex items-center gap-3">
                    <CalendarIcon size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">Booking Calendar</h1>
                        <p className="text-sm opacity-90 mt-1">View all approved event bookings</p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 h-[calc(100vh-16rem)]"
            >
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    views={['month', 'week', 'day']}
                    eventPropGetter={(event) => {
                        // Custom styling for events
                        const style = {
                            backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '8px',
                            opacity: 0.9,
                            color: 'white',
                            border: '0px',
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            padding: '4px 8px',
                            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)'
                        };
                        return { style };
                    }}
                />
            </motion.div>
        </div>
    );
};

export default CalendarPage;
