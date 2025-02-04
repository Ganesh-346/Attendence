import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClipboardList, faCog, faUsers, faBars, faTimes, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AdminNotifications from './AdminNotifications';
import AttendanceReports from './AttendanceReports';
import SettingsManagement from './SettingsManagement';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('notifications');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = true; // Replace with actual login state
    const navItems = [
        
        { id: 1, label: 'Notifications', component: 'notifications', icon: faBell },
        { id: 2, label: 'Attendance Reports', component: 'attendanceReports', icon: faClipboardList },
        { id: 3, label: 'Settings', component: 'settings', icon: faCog },
        { id: 4, label: 'User Management', component: 'userManagement', icon: faUsers },
    ];

    const renderContent = () => {
        switch (activeComponent) {
            case 'notifications':
                return <AdminNotifications />;
            case 'attendanceReports':
                return <AttendanceReports />;
            case 'settings':
                return <SettingsManagement />;
            case 'userManagement':
                return <UserManagement />;
            default:
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
                        <p>Select an option from the menu above:</p>
                    </div>
                );
        }
    };

    const NavButton = ({ item }) => (
        <button
            onClick={() => {
                setActiveComponent(item.component);
                setIsMenuOpen(false); // Close mobile menu on click
            }}
            className={`py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 w-full
                ${activeComponent === item.component 
                    ? 'bg-blue-500 text-white' 
                    : 'text-blue-500 hover:bg-blue-100'}`}
        >
            <FontAwesomeIcon icon={item.icon} className="mr-2" />
            {item.label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-50 bg-white shadow-md rounded-lg mb-6 flex justify-between items-center p-4">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCog} className="text-blue-500 text-2xl" />
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-gray-600 focus:outline-none"
                >
                    {isMenuOpen ? <FontAwesomeIcon icon={faTimes} className="h-6 w-6" /> : <FontAwesomeIcon icon={faBars} className="h-6 w-6" />}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-4">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <NavButton item={item} />
                        </li>
                    ))}
                    <li>
                        {isLoggedIn ? (
                            <button
                                onClick={() => console.log('Logout')}
                                className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => console.log('Redirect to Login')}
                                className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faSignInAlt} />
                                Login
                            </button>
                        )}
                    </li>
                </ul>
            </nav>

            {/* Content Area with its own scroll */}
            <div className="p-4 md:p-6">
                <div className="bg-white rounded-lg shadow-md p-6 overflow-auto">
                    {/* Overview Statistics */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Overview Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <h4 className="font-bold">Total Users</h4>
                                <p>150</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg shadow">
                                <h4 className="font-bold">Active Users</h4>
                                <p>120</p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg shadow">
                                <h4 className="font-bold">Attendance Rate</h4>
                                <p>85%</p>
                            </div>
                            <div className="bg-red-100 p-4 rounded-lg shadow">
                                <h4 className="font-bold">Notifications Sent</h4>
                                <p>200</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Quick Actions</h3>
                        <div className="flex space-x-4">
                            <button className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Add User</button>
                            <button className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700">Generate Report</button>
                            <button className="py-2 px-4 bg-yellow-600 text-white rounded hover:bg-yellow-700">Send Notification</button>
                        </div>
                    </div>

                    {/* Recent Activity Log */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Recent Activity Log</h3>
                        <ul className="list-disc pl-5">
                            <li>User John Doe registered.</li>
                            <li>Notification sent to all users.</li>
                            <li>Attendance report generated for last week.</li>
                        </ul>
                    </div>

                    {/* Alerts and Notifications */}
                    <div>
                        <h3 className="text-lg font-semibold">Alerts and Notifications</h3>
                        <div className="bg-red-100 p-4 rounded-lg">
                            <p className="font-bold">Important Alert:</p>
                            <p>System maintenance scheduled for this weekend.</p>
                        </div>
                    </div>

                    {/* Render the active component */}
                    {renderContent()}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity md:hidden
                    ${isMenuOpen ? 'opacity-100 z-60' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Side Menu */}
            <div 
                className={`fixed left-0 top-0 w-64 bg-white shadow-lg h-full transform transition-transform md:hidden z-70
                    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Menu</h2>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-gray-600 hover:text-gray-800"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
                <ul className="flex flex-col p-4 space-y-2">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <NavButton item={item} />
                        </li>
                    ))}
                    <li>
                        {isLoggedIn ? (
                            <button
                                onClick={() => { console.log('Logout'); setIsMenuOpen(false); }}
                                className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 w-full flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => { console.log('Redirect to Login'); setIsMenuOpen(false); }}
                                className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 w-full flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faSignInAlt} />
                                Login
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;