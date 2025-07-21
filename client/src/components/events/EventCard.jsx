import { useState } from 'react';
import { Calendar, MapPin, Check, Users, AlertCircle } from 'lucide-react';
import registrationService from '../../services/registrationService';

const EventCard = ({ booking, isRegistered, onRegisterSuccess }) => {
    const { event, venue, startTime, registrationCount } = booking;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isFull = registrationCount >= venue.capacity;

    const formattedDate = new Date(startTime).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric',
    });
    const formattedTime = new Date(startTime).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true,
    });

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        try {
            await registrationService.registerForEvent(booking._id);
            // The nullish coalescing operator (??) is used here for safety, 
            // in case onRegisterSuccess is not passed as a prop (e.g., on MyRegistrationsPage).
            onRegisterSuccess?.(booking._id);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    const renderRegistrationButton = () => {
        if (isFull && !isRegistered) {
            return (
                <button disabled className="w-full px-4 py-2 text-sm font-medium flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg cursor-not-allowed">
                    <AlertCircle size={16} />
                    <span>Event Full</span>
                </button>
            );
        }
        if (isRegistered) {
            return (
                <button disabled className="w-full px-4 py-2 text-sm font-medium flex items-center justify-center space-x-2 bg-green-600 text-white rounded-lg cursor-not-allowed">
                    <Check size={16} />
                    <span>Registered</span>
                </button>
            );
        }
        return (
            <button 
                onClick={handleRegister}
                disabled={loading}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
                {loading ? 'Registering...' : 'Register Now'}
            </button>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{event.clubName}</p>
                <h3 className="text-xl font-bold mt-1 text-slate-900 dark:text-white">{event.name}</h3>
                
                <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center">
                        <Calendar size={16} className="mr-2 flex-shrink-0" />
                        <span>{formattedDate} at {formattedTime}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin size={16} className="mr-2 flex-shrink-0" />
                        <span>{venue.name}</span>
                    </div>
                    <div className="flex items-center">
                        <Users size={16} className="mr-2 flex-shrink-0" />
                        <span>{registrationCount} / {venue.capacity} Spots Filled</span>
                    </div>
                </div>
            </div>

            <div className="p-6 pt-0 mt-auto">
                {error && <p className="text-xs text-red-500 text-center mb-2">{error}</p>}
                {renderRegistrationButton()}
            </div>
        </div>
    );
};

export default EventCard;
