import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBell, 
    faTrashAlt, 
    faFilter, 
    faCog, 
    faCheckDouble,
    faExclamationCircle,
    faInfoCircle,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPriority, setSelectedPriority] = useState('all');
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: true,
        notificationSound: true,
        categories: {
            academic: true,
            attendance: true,
            leave: true,
            general: true
        },
        priorities: {
            high: true,
            medium: true,
            low: true
        }
    });

    // Categories and Priorities
    const categories = ['academic', 'attendance', 'leave', 'general'];
    const priorities = ['high', 'medium', 'low'];

    const fetchNotifications = () => {
        setTimeout(() => {
            setNotifications([
                { 
                    id: 1, 
                    message: 'Your leave request has been approved.', 
                    read: false,
                    category: 'leave',
                    priority: 'high',
                    timestamp: new Date().toISOString()
                },
                { 
                    id: 2, 
                    message: 'New assignment has been posted.', 
                    read: false,
                    category: 'academic',
                    priority: 'medium',
                    timestamp: new Date().toISOString()
                },
                { 
                    id: 3, 
                    message: 'Reminder: Parent-Teacher meeting on Friday.', 
                    read: true,
                    category: 'general',
                    priority: 'medium',
                    timestamp: new Date().toISOString()
                },
                { 
                    id: 4, 
                    message: 'Low attendance warning!', 
                    read: false,
                    category: 'attendance',
                    priority: 'high',
                    timestamp: new Date().toISOString()
                },
            ]);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Filter notifications based on category and priority
    const filteredNotifications = notifications.filter(notification => {
        const categoryMatch = selectedCategory === 'all' || notification.category === selectedCategory;
        const priorityMatch = selectedPriority === 'all' || notification.priority === selectedPriority;
        return categoryMatch && priorityMatch;
    });

    const handleMarkAsRead = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    const handleMarkMultipleAsRead = () => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                selectedNotifications.includes(notification.id)
                    ? { ...notification, read: true }
                    : notification
            )
        );
        setSelectedNotifications([]);
    };

    const handleDeleteNotification = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.filter(notification => notification.id !== id)
        );
    };

    const handleSelectNotification = (id) => {
        setSelectedNotifications(prev =>
            prev.includes(id)
                ? prev.filter(notifId => notifId !== id)
                : [...prev, id]
        );
    };

    const handlePreferencesChange = (key, value) => {
        setPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high':
                return <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" />;
            case 'medium':
                return <FontAwesomeIcon icon={faInfoCircle} className="text-yellow-500" />;
            case 'low':
                return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
            default:
                return null;
        }
    };

    if (loading) {
        return <div>Loading notifications...</div>;
    }

    if (error) {
        return <div>Error fetching notifications: {error}</div>;
    }

    return (
        <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <FontAwesomeIcon icon={faBell} className="mr-3 text-blue-600" />
                    Notifications
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowPreferences(!showPreferences)}
                        className="p-2 rounded-full hover:bg-gray-100"
                        title="Preferences"
                    >
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-wrap gap-4 mb-4">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-md px-3 py-2"
                >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="border rounded-md px-3 py-2"
                >
                    <option value="all">All Priorities</option>
                    {priorities.map(priority => (
                        <option key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </option>
                    ))}
                </select>

                {selectedNotifications.length > 0 && (
                    <button
                        onClick={handleMarkMultipleAsRead}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        <FontAwesomeIcon icon={faCheckDouble} />
                        Mark Selected as Read
                    </button>
                )}
            </div>

            {/* Preferences Modal */}
            {showPreferences && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="emailNotifications"
                                checked={preferences.emailNotifications}
                                onChange={(e) => handlePreferencesChange('emailNotifications', e.target.checked)}
                            />
                            <label htmlFor="emailNotifications">Email Notifications</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="pushNotifications"
                                checked={preferences.pushNotifications}
                                onChange={(e) => handlePreferencesChange('pushNotifications', e.target.checked)}
                            />
                            <label htmlFor="pushNotifications">Push Notifications</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="notificationSound"
                                checked={preferences.notificationSound}
                                onChange={(e) => handlePreferencesChange('notificationSound', e.target.checked)}
                            />
                            <label htmlFor="notificationSound">Notification Sound</label>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications List */}
            <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                    <p className="text-gray-500">No notifications available.</p>
                ) : (
                    filteredNotifications.map((notification) => (
                        <div 
                            key={notification.id} 
                            className={`p-4 border rounded-md flex items-center gap-4 
                                ${notification.read ? 'bg-gray-50' : 'bg-white'}`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedNotifications.includes(notification.id)}
                                onChange={() => handleSelectNotification(notification.id)}
                                className="h-4 w-4"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    {getPriorityIcon(notification.priority)}
                                    <span className={`text-sm px-2 py-1 rounded-full ${
                                        notification.category === 'academic' ? 'bg-blue-100 text-blue-800' :
                                        notification.category === 'attendance' ? 'bg-yellow-100 text-yellow-800' :
                                        notification.category === 'leave' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {notification.category}
                                    </span>
                                </div>
                                <p className={notification.read ? 'text-gray-500' : 'text-gray-800'}>
                                    {notification.message}
                                </p>
                                <span className="text-sm text-gray-500">
                                    {new Date(notification.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                {!notification.read && (
                                    <button
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                                    >
                                        <FontAwesomeIcon icon={faBell} />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteNotification(notification.id)}
                                    className="text-red-600 hover:bg-red-50 p-2 rounded"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;