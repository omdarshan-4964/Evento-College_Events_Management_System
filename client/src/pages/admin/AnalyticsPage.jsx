import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import analyticsService from '../../services/analyticsService';
import Spinner from '../../components/common/Spinner';
import { Building, CalendarDays, Ticket, Users, TrendingUp, Sparkles } from 'lucide-react';

const StatCard = ({ title, value, icon, color, delay }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        whileHover={{ scale: 1.05, y: -5 }}
        className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-xl text-white relative overflow-hidden`}
    >
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
            <div className="text-8xl">{icon}</div>
        </div>
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    {icon}
                </div>
            </div>
            <p className="text-sm opacity-90 font-medium">{title}</p>
            <p className="text-4xl font-extrabold mt-2">{value}</p>
        </div>
    </motion.div>
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
    if (error) return <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-500 mt-20 bg-red-50 dark:bg-red-900/30 p-4 rounded-xl">{error}</motion.p>;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl text-white mb-8"
            >
                <div className="flex items-center gap-3">
                    <TrendingUp size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">Analytics Dashboard</h1>
                        <p className="text-sm opacity-90 mt-1">View system statistics and insights</p>
                    </div>
                </div>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard delay={0.1} title="Total Venues" value={summary.totalVenues} icon={<Building size={28} />} color="from-blue-500 to-cyan-500" />
                <StatCard delay={0.15} title="Total Events" value={summary.totalEvents} icon={<CalendarDays size={28} />} color="from-green-500 to-emerald-500" />
                <StatCard delay={0.2} title="Total Bookings" value={summary.totalBookings} icon={<Ticket size={28} />} color="from-orange-500 to-amber-500" />
                <StatCard delay={0.25} title="Total Registrations" value={summary.totalRegistrations} icon={<Users size={28} />} color="from-purple-500 to-pink-500" />
            </div>

            {/* Venue Utilization Chart */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                        <TrendingUp size={24} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Venue Utilization</h2>
                </div>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={utilization} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.7}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                            <XAxis 
                                dataKey="name" 
                                stroke="#94a3b8"
                                style={{ fontSize: '12px', fontWeight: '500' }}
                            />
                            <YAxis 
                                allowDecimals={false} 
                                stroke="#94a3b8"
                                style={{ fontSize: '12px', fontWeight: '500' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                                    borderColor: 'rgba(148, 163, 184, 0.3)',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                                }}
                                labelStyle={{ color: '#f1f5f9', fontWeight: 'bold', marginBottom: '4px' }}
                                itemStyle={{ color: '#cbd5e1' }}
                            />
                            <Legend 
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="circle"
                            />
                            <Bar 
                                dataKey="count" 
                                fill="url(#colorBar)" 
                                name="Number of Bookings" 
                                radius={[8, 8, 0, 0]}
                                animationDuration={1000}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsPage;
