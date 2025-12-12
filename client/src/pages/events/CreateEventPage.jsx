import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { PlusCircle, Sparkles } from 'lucide-react';
import eventService from '../../services/eventService';
import Spinner from '../../components/common/Spinner';

const CreateEventPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        clubName: '',
        category: 'Seminar', // Default category
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await eventService.createEvent(formData);
            toast.success('🎉 Event created successfully! Pending approval.');
            // On success, navigate to the main dashboard
            navigate('/dashboard');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to create event. Please try again.';
            setError(errorMsg);
            toast.error(errorMsg);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl text-white mb-8 max-w-2xl mx-auto"
            >
                <div className="flex items-center gap-3">
                    <PlusCircle size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">Create a New Event</h1>
                        <p className="text-sm opacity-90 mt-1">Submit your event for approval</p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-2xl mx-auto"
            >
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center text-sm">{error}</motion.div>}
                        
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Event Name</label>
                            <motion.input whileFocus={{ scale: 1.01 }} type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" placeholder="e.g., E-Summit 2025" />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                            <motion.textarea whileFocus={{ scale: 1.01 }} name="description" id="description" rows="4" value={formData.description} onChange={handleChange} required className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" placeholder="Describe what the event is about..."></motion.textarea>
                        </div>

                        <div>
                            <label htmlFor="clubName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Organizing Club</label>
                            <motion.input whileFocus={{ scale: 1.01 }} type="text" name="clubName" id="clubName" value={formData.clubName} onChange={handleChange} required className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" placeholder="e.g., E-Cell" />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                            <motion.select whileFocus={{ scale: 1.01 }} name="category" id="category" value={formData.category} onChange={handleChange} className="block w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all">
                                <option>Workshop</option>
                                <option>Competition</option>
                                <option>Seminar</option>
                                <option>Cultural</option>
                                <option>Other</option>
                            </motion.select>
                        </div>
                        
                        <div className="pt-2">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                {loading ? <Spinner /> : <><Sparkles size={18} /> Submit for Approval</>}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateEventPage;
