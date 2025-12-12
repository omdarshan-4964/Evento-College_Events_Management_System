import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import userService from '../../services/userService';
import Spinner from '../../components/common/Spinner';
import { Users, Sparkles, Shield, UserCog } from 'lucide-react';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const { data } = await userService.getAllUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await userService.updateUserRole(userId, newRole);
            toast.success('✅ User Role Updated Successfully!');
            // Update the user's role in the local state for immediate UI feedback
            setUsers(currentUsers =>
                currentUsers.map(user =>
                    user._id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (err) {
            toast.error('Failed to update user role');
            setError('Failed to update user role.');
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;
    if (error) return <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-500 mt-20 bg-red-50 dark:bg-red-900/30 p-4 rounded-xl">{error}</motion.p>;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 shadow-2xl text-white mb-8"
            >
                <div className="flex items-center gap-3">
                    <UserCog size={32} />
                    <div>
                        <h1 className="text-3xl font-extrabold">User Management</h1>
                        <p className="text-sm opacity-90 mt-1">Manage user roles and permissions</p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-x-auto"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Users size={24} className="text-primary-500" />
                        All Users
                        <span className="ml-3 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-bold">
                            {users.length}
                        </span>
                    </h2>
                </div>
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {users.map((user, idx) => (
                            <motion.tr 
                                key={user._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.05)' }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-xs ${
                                        user.role === 'super_admin' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
                                        user.role === 'club_admin' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                                        'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                    }`}>
                                        {user.role === 'super_admin' && <Shield size={14} />}
                                        {user.role.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <motion.select
                                        whileFocus={{ scale: 1.02 }}
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-medium transition-all"
                                        // Prevent a super admin from accidentally demoting themselves
                                        disabled={user.role === 'super_admin'}
                                    >
                                        <option value="student">Student</option>
                                        <option value="club_admin">Club Admin</option>
                                        <option value="super_admin" disabled>Super Admin</option>
                                    </motion.select>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default UserManagementPage;
