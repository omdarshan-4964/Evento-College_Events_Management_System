import { useState, useEffect } from 'react';
import registrationService from '../services/registrationService';
import Spinner from '../components/common/Spinner';
import EventCard from '../components/events/EventCard';

const MyRegistrationsPage = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyRegistrations = async () => {
            try {
                const { data } = await registrationService.getMyRegistrations();
                // Sort registrations by the soonest event first
                data.sort((a, b) => new Date(a.booking.startTime) - new Date(b.booking.startTime));
                setRegistrations(data);
            } catch (err) {
                setError('Could not load your registered events.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyRegistrations();
    }, []);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">My Registrations</h1>
            {loading ? (
                <div className="flex justify-center mt-10"><Spinner /></div>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {registrations.length > 0 ? (
                        registrations.map(reg => (
                            <EventCard
                                key={reg._id}
                                booking={reg.booking}
                                isRegistered={true} // Since this is the registrations page, it's always true
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-slate-500 dark:text-slate-400 mt-10">
                            You haven't registered for any events yet.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyRegistrationsPage;
