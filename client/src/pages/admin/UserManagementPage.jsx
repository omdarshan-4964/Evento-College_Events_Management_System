import { useState, useEffect } from 'react';
import userService from '../../services/userService';
import Spinner from '../../components/common/Spinner';
import { Users } from 'lucide-react';

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
            // Update the user's role in the local state for immediate UI feedback
            setUsers(currentUsers =>
                currentUsers.map(user =>
                    user._id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (err) {
            setError('Failed to update user role.');
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;
    if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Users className="mr-3" /> User Management
            </h1>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Role</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300 capitalize">{user.role.replace('_', ' ')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        // Prevent a super admin from accidentally demoting themselves
                                        disabled={user.role === 'super_admin'}
                                    >
                                        <option value="student">Student</option>
                                        <option value="club_admin">Club Admin</option>
                                        <option value="super_admin" disabled>Super Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagementPage;
