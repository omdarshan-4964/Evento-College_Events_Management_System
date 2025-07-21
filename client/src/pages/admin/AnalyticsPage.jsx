import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import analyticsService from '../../services/analyticsService';
import Spinner from '../../components/common/Spinner';
import { Building, CalendarDays, Ticket, Users } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const AnalyticsPage = () => {
    const [summary, setSummary] = useState(null);
    const [utilization, setUtilization] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [summaryRes, utilizationRes] = await Promise.all([
                    analyticsService.getSummary(),
                    analyticsService.getVenueUtilization(),
                ]);
                setSummary(summaryRes.data);
                setUtilization(utilizationRes.data);
            } catch (err) {
                setError('Failed to load analytics data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;
    if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Analytics Dashboard</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Venues" value={summary.totalVenues} icon={<Building size={24} className="text-white"/>} color="bg-blue-500" />
                <StatCard title="Total Events" value={summary.totalEvents} icon={<CalendarDays size={24} className="text-white"/>} color="bg-green-500" />
                <StatCard title="Total Bookings" value={summary.totalBookings} icon={<Ticket size={24} className="text-white"/>} color="bg-yellow-500" />
                <StatCard title="Total Registrations" value={summary.totalRegistrations} icon={<Users size={24} className="text-white"/>} color="bg-purple-500" />
            </div>

            {/* Venue Utilization Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Venue Utilization</h2>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={utilization} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                    borderColor: 'rgba(128, 128, 128, 0.5)'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="count" fill="#4f46e5" name="Number of Bookings" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
