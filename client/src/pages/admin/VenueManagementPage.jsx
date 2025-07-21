import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import venueService from '../../services/venueService';
import Spinner from '../../components/common/Spinner';

const VenueManagementPage = () => {
    const [venues, setVenues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ name: '', location: '', capacity: '' });

    const fetchVenues = async () => {
        try {
            const { data } = await venueService.getVenues();
            setVenues(data);
        } catch (err) {
            setError('Failed to fetch venues.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await venueService.createVenue({ ...formData, capacity: Number(formData.capacity) });
            setFormData({ name: '', location: '', capacity: '' }); // Reset form
            fetchVenues(); // Refresh the list
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create venue.');
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Venue Management</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Venue Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <PlusCircle className="mr-2" /> Create New Venue
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center text-sm">{error}</div>}
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Venue Name</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="location" className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                                <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="capacity" className="text-sm font-medium text-slate-700 dark:text-slate-300">Capacity</label>
                                <input type="number" name="capacity" id="capacity" value={formData.capacity} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Add Venue
                            </button>
                        </form>
                    </div>
                </div>

                {/* Venues List */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Existing Venues</h2>
                        {isLoading ? <Spinner /> : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                    <thead className="bg-slate-50 dark:bg-slate-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Location</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Capacity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                        {venues.length > 0 ? venues.map(venue => (
                                            <tr key={venue._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{venue.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{venue.location}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{venue.capacity}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400">No venues found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VenueManagementPage;
