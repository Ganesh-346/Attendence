import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserCog, 
    faClipboardCheck, 
    faCheckCircle, 
    faBell, 
    faFileAlt, 
    faBars, 
    faTimes, 
    faSignInAlt, 
    faSignOutAlt,
    faChalkboardTeacher,
    faChartLine,
    faHistory,
    faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';

// Import components
import ManageStudentProfiles from './ManageStudentProfiles';
import LeaveApproval from './LeaveApproval';
import MarkAttendance from './MarkAttendance';
import TeacherNotifications from './Notifications';
import ViewClassReports from './ViewClassReports';

const TeacherDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState('all');
    const isLoggedIn = true;

    // Mock data for classes
    const [classes] = useState([
        { id: 'class-10a', name: 'Class 10-A', totalStudents: 30, attendanceRate: 92 },
        { id: 'class-10b', name: 'Class 10-B', totalStudents: 28, attendanceRate: 88 },
        { id: 'class-11a', name: 'Class 11-A', totalStudents: 32, attendanceRate: 90 }
    ]);

    // Mock data for recent activities
    const [recentActivities] = useState([
        { id: 1, type: 'attendance', message: 'Marked attendance for Class 10-A', timestamp: '2024-02-21 09:00 AM' },
        { id: 2, type: 'leave', message: 'Approved leave request for John Doe', timestamp: '2024-02-21 08:45 AM' },
        { id: 3, type: 'notification', message: 'Sent homework reminder to Class 11-A', timestamp: '2024-02-20 03:30 PM' }
    ]);

    const navItems = [
        { id: 1, label: 'Dashboard', component: 'dashboard', icon: faTachometerAlt },
        { id: 2, label: 'Manage Profiles', component: 'manageProfiles', icon: faUserCog },
        { id: 3, label: 'Leave Approval', component: 'leaveApproval', icon: faClipboardCheck },
        { id: 4, label: 'Mark Attendance', component: 'markAttendance', icon: faCheckCircle },
        { id: 5, label: 'Send Notifications', component: 'notifications', icon: faBell },
        { id: 6, label: 'View Reports', component: 'viewReports', icon: faFileAlt },
    ];

    // Quick stats calculation
    const getClassStats = () => {
        if (selectedClass === 'all') {
            return {
                totalStudents: classes.reduce((sum, cls) => sum + cls.totalStudents, 0),
                averageAttendance: Math.round(
                    classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) / classes.length
                )
            };
        }
        const selectedClassData = classes.find(cls => cls.id === selectedClass);
        return {
            totalStudents: selectedClassData?.totalStudents || 0,
            averageAttendance: selectedClassData?.attendanceRate || 0
        };
    };

    const renderDashboardContent = () => {
        const stats = getClassStats();

        return (
            <div className="space-y-6">
                {/* Class Selection */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
                        Class Selection
                    </h2>
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="all">All Classes</option>
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                        ))}
                    </select>
                </div>

                {/* Quick Stats Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                        Quick Stats
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-700">Total Students</h3>
                            <p className="text-3xl font-bold text-blue-900">{stats.totalStudents}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-green-700">Average Attendance</h3>
                            <p className="text-3xl font-bold text-green-900">{stats.averageAttendance}%</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-purple-700">Active Classes</h3>
                            <p className="text-3xl font-bold text-purple-900">{classes.length}</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Log */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faHistory} className="mr-2" />
                        Recent Activities
                    </h2>
                    <div className="space-y-4">
                        {recentActivities.map(activity => (
                            <div 
                                key={activity.id} 
                                className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-start">
                                    <FontAwesomeIcon 
                                        icon={
                                            activity.type === 'attendance' ? faCheckCircle :
                                            activity.type === 'leave' ? faClipboardCheck :
                                            faBell
                                        }
                                        className={`mr-3 mt-1 ${
                                            activity.type === 'attendance' ? 'text-green-500' :
                                            activity.type === 'leave' ? 'text-blue-500' :
                                            'text-yellow-500'
                                        }`}
                                    />
                                    <div>
                                        <p className="font-medium">{activity.message}</p>
                                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'dashboard':
                return renderDashboardContent();
            case 'manageProfiles':
                return <ManageStudentProfiles selectedClass={selectedClass} />;
            case 'leaveApproval':
                return <LeaveApproval selectedClass={selectedClass} />;
            case 'markAttendance':
                return <MarkAttendance selectedClass={selectedClass} />;
            case 'notifications':
                return <TeacherNotifications selectedClass={selectedClass} />;
            case 'viewReports':
                return <ViewClassReports selectedClass={selectedClass} />;
            default:
                return renderDashboardContent();
        }
    };

    const NavButton = ({ item }) => (
        <button
            onClick={() => {
                setActiveComponent(item.component);
                setIsMenuOpen(false);
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
                    <FontAwesomeIcon icon={faUserCog} className="text-blue-500 text-2xl" />
                    <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
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

            {/* Content Area */}
            <div className="p-4 md:p-6">
                <div className="bg-white rounded-lg shadow-md p-6 overflow-auto">
                    {renderContent()}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity md:hidden
                    ${isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Side Menu */}
            <div 
                className={`fixed left-0 top-0 w-64 bg-white shadow-lg h-full transform transition-transform md:hidden z-50
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

export default TeacherDashboard;