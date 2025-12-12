import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { PlusCircle, MapPin, Building2, Sparkles } from 'lucide-react';
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
            toast.success('✅ Venue Created Successfully!');
            setFormData({ name: '', location: '', capacity: '' }); // Reset form
            fetchVenues(); // Refresh the list
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to create venue.';
            toast.error(errorMsg);
            setError(errorMsg);
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-6 shadow-2xl text-white mb-8"
            >
                <div className="flex items-center gap-3">
                    <Building2 size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">Venue Management</h1>
                        <p className="text-sm opacity-90 mt-1">Create and manage event venues</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Venue Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 sticky top-8">
                        <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-900 dark:text-white">
                            <PlusCircle className="mr-2 text-green-500" size={28} /> Create New Venue
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Venue Name</label>
                                <motion.input 
                                    whileFocus={{ scale: 1.01 }}
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="e.g., Main Auditorium"
                                />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Location</label>
                                <motion.input 
                                    whileFocus={{ scale: 1.01 }}
                                    type="text" 
                                    name="location" 
                                    id="location" 
                                    value={formData.location} 
                                    onChange={handleChange} 
                                    required 
                                    className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="e.g., Building A, Ground Floor"
                                />
                            </div>
                            <div>
                                <label htmlFor="capacity" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Capacity</label>
                                <motion.input 
                                    whileFocus={{ scale: 1.01 }}
                                    type="number" 
                                    name="capacity" 
                                    id="capacity" 
                                    value={formData.capacity} 
                                    onChange={handleChange} 
                                    required 
                                    className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="e.g., 500"
                                />
                            </div>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit" 
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                            >
                                <PlusCircle size={20} />
                                Add Venue
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                {/* Venues List */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Building2 size={24} className="text-primary-500" />
                                Existing Venues
                                <span className="ml-3 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-bold">
                                    {venues.length}
                                </span>
                            </h2>
                        </div>
                        {isLoading ? (
                            <div className="flex justify-center py-12"><Spinner /></div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-700/80">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Name</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Location</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Capacity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                        {venues.length > 0 ? venues.map((venue, idx) => (
                                            <motion.tr 
                                                key={venue._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.05)' }}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">{venue.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                                    <MapPin size={16} className="text-primary-500" />
                                                    {venue.location}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                                        {venue.capacity} people
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50">
                                                    No venues found. Create your first venue!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
export default VenueManagementPage;
