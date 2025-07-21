import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
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
        return <div className="text-center py-10 text-red-500">{error}</div>
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Booking Calendar</h1>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg h-[calc(100vh-12rem)]">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    views={['month', 'week', 'day']}
                    eventPropGetter={(event) => {
                        // You can add custom styling for events here
                        const style = {
                            backgroundColor: '#312e81', // indigo-900
                            borderRadius: '5px',
                            opacity: 0.8,
                            color: 'white',
                            border: '0px',
                            display: 'block'
                        };
                        return { style };
                    }}
                />
            </div>
        </div>
    );
};

export default CalendarPage;
