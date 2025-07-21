// import { useState, useEffect } from 'react';
// import bookingService from '../../services/bookingService';
// import Spinner from '../common/Spinner';
// import EventCard from '../events/EventCard';

// const StudentDashboard = () => {
//     const [approvedBookings, setApprovedBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const { data } = await bookingService.getApprovedBookings();
//                 // Filter for events in the future
//                 const upcoming = data.filter(booking => new Date(booking.startTime) > new Date());
//                 // Sort by the soonest event first
//                 upcoming.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
//                 setApprovedBookings(upcoming);
//             } catch (err) {
//                 setError('Could not load upcoming events.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     return (
//         <div className="mt-8">
//             <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Upcoming Events</h2>
//             {loading ? (
//                 <div className="flex justify-center mt-10">
//                     <Spinner />
//                 </div>
//             ) : error ? (
//                 <p className="text-center text-red-500">{error}</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {approvedBookings.length > 0 ? (
//                         approvedBookings.map(booking => (
//                             <EventCard key={booking._id} booking={booking} />
//                         ))
//                     ) : (
//                         <p className="col-span-full text-center text-slate-500 dark:text-slate-400 mt-10">
//                             No upcoming events scheduled at the moment. Check back soon!
//                         </p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StudentDashboard;




import { useState, useEffect } from 'react';
import bookingService from '../../services/bookingService';
import registrationService from '../../services/registrationService';
import Spinner from '../common/Spinner';
import EventCard from '../events/EventCard';

const StudentDashboard = () => {
    const [approvedBookings, setApprovedBookings] = useState([]);
    const [myRegistrationIds, setMyRegistrationIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            // Fetch all necessary data in parallel for better performance
            const [bookingsRes, regsRes] = await Promise.all([
                bookingService.getApprovedBookings(),
                registrationService.getMyRegistrations()
            ]);

            const upcoming = bookingsRes.data
                .filter(booking => new Date(booking.startTime) > new Date())
                .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
            
            setApprovedBookings(upcoming);

            const registrationIdSet = new Set(regsRes.data.map(reg => reg.booking._id));
            setMyRegistrationIds(registrationIdSet);

        } catch (err) {
            setError('Could not load upcoming events.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    // This function will be passed to the EventCard to update the UI after registration
    const handleSuccessfulRegistration = (bookingId) => {
        setMyRegistrationIds(prevIds => new Set(prevIds).add(bookingId));
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Upcoming Events</h2>
            {loading ? (
                <div className="flex justify-center mt-10"><Spinner /></div>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {approvedBookings.length > 0 ? (
                        approvedBookings.map(booking => (
                            <EventCard 
                                key={booking._id} 
                                booking={booking}
                                isRegistered={myRegistrationIds.has(booking._id)}
                                onRegisterSuccess={handleSuccessfulRegistration}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-slate-500 dark:text-slate-400 mt-10">
                            No upcoming events scheduled. Check back soon!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
