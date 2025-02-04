import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faPaperPlane, faClipboardList, faSignInAlt, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2'; // Importing Bar chart component
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'; // Import from chart.js

// Import the necessary components
import Notifications from './Notifications'; // Adjust the path as necessary
import ProfileManagement from './ProfileManagement'; // Adjust the path as necessary
import RequestLeave from './RequestLeave'; // Adjust the path as necessary
import ViewAttendance from './ViewAttendance'; // Adjust the path as necessary

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = true; // Replace with actual login state
    const navItems = [
        { id: 1, label: 'Dashboard', component: 'dashboard', icon: faClipboardList },
        { id: 2, label: 'Profile', component: 'profileManagement', icon: faUser },
        { id: 3, label: 'Request Leave', component: 'requestLeave', icon: faPaperPlane },
        { id: 4, label: 'Attendance', component: 'viewAttendance', icon: faClipboardList },
        { id: 5, label: 'Notifications', component: 'notifications', icon: faBell },
 // Added Dashboard option
    ];

    // Sample attendance data for the past 6 months
    const attendanceData = [80, 75, 90, 85, 70, 95]; // Example attendance percentages for the last 6 months
    const months = ['April', 'May', 'June', 'July', 'August', 'September']; // Corresponding month labels

    // Monthly Attendance Data for Bar Graph
    const monthlyAttendanceData = {
        labels: months, // Month labels
        datasets: [
            {
                label: 'Attendance Percentage',
                data: attendanceData, // Attendance percentages for the past 6 months
                backgroundColor: attendanceData.map(percentage => {
                    if (percentage < 65) return 'rgba(255, 99, 132, 0.6)'; // Red for below 65%
                    if (percentage < 75) return 'rgba(255, 159, 64, 0.6)'; // Orange for below 75%
                    return 'rgba(75, 192, 192, 0.6)'; // Default color
                }),
                borderColor: attendanceData.map(percentage => {
                    if (percentage < 65) return 'rgba(255, 99, 132, 1)'; // Red for below 65%
                    if (percentage < 75) return 'rgba(255, 159, 64, 1)'; // Orange for below 75%
                    return 'rgba(75, 192, 192, 1)'; // Default color
                }),
                borderWidth: 1,
            },
        ],
    };

    // Sample attendance data for the current month
    const totalDaysInMonth = 30; // Example: 30 days in the month
    const daysAttended = 20; // Example: days the student has attended
    const targetAttendancePercentage = 74; // Target attendance percentage

    // Calculate attendance percentage
    const attendancePercentage = (daysAttended / totalDaysInMonth) * 100;

    // Calculate days needed to reach target attendance percentage
    const daysNeeded = Math.ceil((targetAttendancePercentage / 100) * totalDaysInMonth) - daysAttended;

    const renderContent = () => {
        switch (activeComponent) {
            case 'notifications':
                return <Notifications />;
            case 'profileManagement':
                return <ProfileManagement />;
            case 'requestLeave':
                return <RequestLeave />;
            case 'viewAttendance':
                return <ViewAttendance />;
            case 'dashboard':
                return renderDashboard(); // Render the dashboard by default
            default:
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Welcome to the Student Dashboard</h2>
                        <p>Select an option from the menu above:</p>
                    </div>
                );
        }
    };

    const renderDashboard = () => {
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
                
                {/* Attendance Progress Bar */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Attendance Progress</h3>
                    <div className="relative w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="h-4 rounded-full"
                            style={{
                                width: `${attendancePercentage}%`,
                                backgroundColor: attendancePercentage < 65 ? 'rgba(255, 99, 132, 1)' : 
                                              attendancePercentage < 75 ? 'rgba(255, 159, 64, 1)' : 
                                              'rgba(75, 192, 192, 1)',
                            }}
                        />
                    </div>
                    <p className="mt-1 text-sm">
                        Attendance: {daysAttended}/{totalDaysInMonth} days ({attendancePercentage.toFixed(2)}%)
                    </p>
                    {daysNeeded > 0 ? (
                        <p className="text-sm text-red-500">
                            You need to attend {daysNeeded} more days to reach {targetAttendancePercentage}% attendance.
                        </p>
                    ) : (
                        <p className="text-sm text-green-500">
                            You have met the attendance requirement!
                        </p>
                    )}
                </div>

                {/* Monthly Attendance Bar Graph */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Monthly Attendance (Last 6 Months)</h3>
                    <Bar data={monthlyAttendanceData} options={{ responsive: true }} />
                </div>
            </div>
        );
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
                    <FontAwesomeIcon icon={faUser} className="text-blue-500 text-2xl" />
                    <h1 className="text-2xl font-bold">Student Dashboard</h1>
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

export default StudentDashboard;