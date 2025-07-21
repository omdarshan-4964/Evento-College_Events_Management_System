import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
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
            // On success, navigate to the main dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create event. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                        <PlusCircle className="mr-3 text-indigo-500" />
                        Create a New Event
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center text-sm">{error}</div>}
                        
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Event Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., E-Summit 2025" />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                            <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Describe what the event is about..."></textarea>
                        </div>

                        <div>
                            <label htmlFor="clubName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Organizing Club</label>
                            <input type="text" name="clubName" id="clubName" value={formData.clubName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., E-Cell" />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                            <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option>Workshop</option>
                                <option>Competition</option>
                                <option>Seminar</option>
                                <option>Cultural</option>
                                <option>Other</option>
                            </select>
                        </div>
                        
                        <div className="pt-2">
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed">
                                {loading ? <Spinner /> : 'Submit for Approval'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEventPage;
