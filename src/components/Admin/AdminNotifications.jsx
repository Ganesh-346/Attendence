import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPaperPlane, 
    faCheckCircle, 
    faExclamationCircle, 
    faInfoCircle, 
    faHistory,
    faFilter,
    faCalendar
} from '@fortawesome/free-solid-svg-icons';

const AdminNotifications = () => {
    // Form states
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('info');
    const [recipients, setRecipients] = useState('all'); // New: recipients selection

    // History states
    const [showHistory, setShowHistory] = useState(false);
    const [filterType, setFilterType] = useState('all');
    const [dateFilter, setDateFilter] = useState('');

    // Mock notification history
    const [notificationHistory, setNotificationHistory] = useState([
        {
            id: 1,
            title: 'System Maintenance',
            message: 'Scheduled maintenance this weekend',
            type: 'warning',
            timestamp: '2024-02-20T10:00:00',
            recipients: 'all'
        },
        {
            id: 2,
            title: 'New Feature Released',
            message: 'Check out our new attendance tracking feature',
            type: 'info',
            timestamp: '2024-02-19T15:30:00',
            recipients: 'teachers'
        }
    ]);

    const handleSendNotification = () => {
        if (!notificationTitle || !notificationMessage) {
            alert('Please fill in all required fields');
            return;
        }

        // Add to history
        const newNotification = {
            id: notificationHistory.length + 1,
            title: notificationTitle,
            message: notificationMessage,
            type: notificationType,
            timestamp: new Date().toISOString(),
            recipients: recipients
        };

        setNotificationHistory([newNotification, ...notificationHistory]);

        // Reset form
        setNotificationTitle('');
        setNotificationMessage('');
        setNotificationType('info');
        setRecipients('all');

        alert('Notification sent successfully!');
    };

    const filteredHistory = notificationHistory
        .filter(notification => filterType === 'all' || notification.type === filterType)
        .filter(notification => !dateFilter || notification.timestamp.includes(dateFilter));

    return (
        <div className="space-y-6">
            {/* Send Notification Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Send New Notification
                </h2>
                
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Notification Title"
                        value={notificationTitle}
                        onChange={(e) => setNotificationTitle(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />

                    <textarea
                        placeholder="Notification Message"
                        value={notificationMessage}
                        onChange={(e) => setNotificationMessage(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        rows="4"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Notification Type:</label>
                            <select
                                value={notificationType}
                                onChange={(e) => setNotificationType(e.target.value)}
                                className="border border-gray-300 rounded p-2 w-full"
                            >
                                <option value="info">Info</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">Recipients:</label>
                            <select
                                value={recipients}
                                onChange={(e) => setRecipients(e.target.value)}
                                className="border border-gray-300 rounded p-2 w-full"
                            >
                                <option value="all">All Users</option>
                                <option value="students">Students Only</option>
                                <option value="teachers">Teachers Only</option>
                            </select>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Preview:</h3>
                        <div className={`border rounded p-4 ${
                            notificationType === 'success' ? 'bg-green-100' : 
                            notificationType === 'warning' ? 'bg-yellow-100' : 
                            notificationType === 'error' ? 'bg-red-100' : 
                            'bg-blue-100'
                        }`}>
                            <h4 className="font-bold flex items-center">
                                {notificationType === 'success' && <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-600" />}
                                {notificationType === 'warning' && <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 text-yellow-600" />}
                                {notificationType === 'error' && <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 text-red-600" />}
                                {notificationType === 'info' && <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-600" />}
                                {notificationTitle || 'Notification Title'}
                            </h4>
                            <p className="mt-2">{notificationMessage || 'Notification message will appear here...'}</p>
                        </div>
                    </div>

                    <button 
                        onClick={handleSendNotification}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Send Notification
                    </button>
                </div>
            </div>

            {/* Notification History Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        <FontAwesomeIcon icon={faHistory} className="mr-2" />
                        Notification History
                    </h2>
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        {showHistory ? 'Hide History' : 'Show History'}
                    </button>
                </div>

                {showHistory && (
                    <>
                        {/* Filters */}
                        <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faFilter} className="mr-2" />
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="border border-gray-300 rounded p-2"
                                >
                                    <option value="all">All Types</option>
                                    <option value="info">Info</option>
                                    <option value="success">Success</option>
                                    <option value="warning">Warning</option>
                                    <option value="error">Error</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="border border-gray-300 rounded p-2"
                                />
                            </div>
                        </div>

                        {/* History List */}
                        <div className="space-y-4">
                            {filteredHistory.map((notification) => (
                                <div 
                                    key={notification.id}
                                    className={`border rounded p-4 ${
                                        notification.type === 'success' ? 'bg-green-50' :
                                        notification.type === 'warning' ? 'bg-yellow-50' :
                                        notification.type === 'error' ? 'bg-red-50' :
                                        'bg-blue-50'
                                    }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold">{notification.title}</h4>
                                        <span className="text-sm text-gray-500">
                                            {new Date(notification.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="mt-2">{notification.message}</p>
                                    <div className="mt-2 text-sm text-gray-600">
                                        Sent to: {notification.recipients}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminNotifications;