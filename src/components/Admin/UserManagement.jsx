import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserPlus, 
    faUserEdit, 
    faTrash, 
    faUsers, 
    faSearch, 
    faFilter,
    faHistory,
    faCheckCircle,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const UserManagement = () => {
    // Form states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [showDetails, setShowDetails] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    // Mock user data with more details
    const [userList, setUserList] = useState([
        {
            id: 1,
            username: 'john_doe',
            email: 'john@example.com',
            role: 'student',
            attendanceRate: 85,
            lastActive: '2024-02-20',
            notifications: [
                { id: 1, message: 'Attendance below threshold', date: '2024-02-19' }
            ]
        },
        {
            id: 2,
            username: 'jane_smith',
            email: 'jane@example.com',
            role: 'teacher',
            attendanceRate: 95,
            lastActive: '2024-02-20',
            notifications: [
                { id: 1, message: 'New course assigned', date: '2024-02-18' }
            ]
        }
    ]);

    const handleAddUser = () => {
        if (username && email && password) {
            if (editIndex !== null) {
                const updatedUserList = userList.map((user, index) =>
                    index === editIndex ? {
                        ...user,
                        username,
                        email,
                        password,
                        role
                    } : user
                );
                setUserList(updatedUserList);
                setEditIndex(null);
                alert(`User ${username} updated!`);
            } else {
                const newUser = {
                    id: userList.length + 1,
                    username,
                    email,
                    password,
                    role,
                    attendanceRate: 0,
                    lastActive: new Date().toISOString().split('T')[0],
                    notifications: []
                };
                setUserList([...userList, newUser]);
                alert(`User ${username} added!`);
            }
            resetForm();
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('student');
        setEditIndex(null);
    };

    const handleBulkAction = (action) => {
        if (selectedUsers.length === 0) {
            alert('Please select users first');
            return;
        }

        if (action === 'delete') {
            if (window.confirm(`Delete ${selectedUsers.length} selected users?`)) {
                const newUserList = userList.filter(user => !selectedUsers.includes(user.id));
                setUserList(newUserList);
                setSelectedUsers([]);
                alert('Selected users deleted successfully');
            }
        } else if (action === 'changeRole') {
            const newRole = window.prompt('Enter new role (student/teacher):');
            if (newRole && ['student', 'teacher'].includes(newRole.toLowerCase())) {
                const updatedUserList = userList.map(user =>
                    selectedUsers.includes(user.id) ? { ...user, role: newRole.toLowerCase() } : user
                );
                setUserList(updatedUserList);
                setSelectedUsers([]);
                alert('Roles updated successfully');
            }
        }
    };

    const filteredUsers = userList.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-6">
            {/* Add/Edit User Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                    <FontAwesomeIcon icon={editIndex !== null ? faUserEdit : faUserPlus} className="mr-2" />
                    {editIndex !== null ? 'Edit User' : 'Add New User'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>
                <div className="mt-4 flex gap-2">
                    <button 
                        onClick={handleAddUser}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        <FontAwesomeIcon icon={editIndex !== null ? faUserEdit : faUserPlus} className="mr-2" />
                        {editIndex !== null ? 'Update User' : 'Add User'}
                    </button>
                    {editIndex !== null && (
                        <button 
                            onClick={resetForm}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border border-gray-300 rounded p-2 pl-10 w-full"
                            />
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFilter} className="text-gray-500" />
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="border border-gray-300 rounded p-2"
                        >
                            <option value="all">All Roles</option>
                            <option value="student">Students</option>
                            <option value="teacher">Teachers</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                    <span>{selectedUsers.length} users selected</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleBulkAction('changeRole')}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Change Role
                        </button>
                        <button
                            onClick={() => handleBulkAction('delete')}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Delete Selected
                        </button>
                    </div>
                </div>
            )}

            {/* User List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedUsers(filteredUsers.map(user => user.id));
                                        } else {
                                            setSelectedUsers([]);
                                        }
                                    }}
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <React.Fragment key={user.id}>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedUsers([...selectedUsers, user.id]);
                                                } else {
                                                    setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                                }
                                            }}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{user.username}</span>
                                            <span className="text-sm text-gray-500">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${user.role === 'teacher' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center ${user.attendanceRate >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                                            <FontAwesomeIcon 
                                                icon={user.attendanceRate >= 75 ? faCheckCircle : faTimesCircle} 
                                                className="mr-2"
                                            />
                                            {user.attendanceRate}% attendance
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => setShowDetails(showDetails === user.id ? null : user.id)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FontAwesomeIcon icon={faHistory} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setUsername(user.username);
                                                    setEmail(user.email);
                                                    setRole(user.role);
                                                    setEditIndex(user.id);
                                                }}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FontAwesomeIcon icon={faUserEdit} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`Delete user ${user.username}?`)) {
                                                        setUserList(userList.filter(u => u.id !== user.id));
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {showDetails === user.id && (
                                    <tr className="bg-gray-50">
                                        <td colSpan="5" className="px-6 py-4">
                                            <div className="space-y-3">
                                                <h4 className="font-semibold">User Details</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-600">Last Active:</p>
                                                        <p>{user.lastActive}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">Recent Notifications:</p>
                                                        <ul className="list-disc pl-5">
                                                            {user.notifications.map(notification => (
                                                                <li key={notification.id} className="text-sm">
                                                                    {notification.message} ({notification.date})
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;