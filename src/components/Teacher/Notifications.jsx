import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPaperPlane, 
    faCheckCircle, 
    faHistory, 
    faFileAlt,
    faClock,
    faEye,
    faCalendarAlt,
    faUsers
} from '@fortawesome/free-solid-svg-icons';

const TeacherNotifications = ({ selectedClass }) => {
    // Form states
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [recipientType, setRecipientType] = useState('all');
    const [customEmails, setCustomEmails] = useState('');
    const [emailList, setEmailList] = useState([]);

    // Mock data
    const [templates] = useState([
        { id: 1, title: 'Homework Reminder', message: 'Please complete your homework for tomorrow\'s class.' },
        { id: 2, title: 'Test Announcement', message: 'There will be a test on {date} covering {topics}.' },
        { id: 3, title: 'Class Cancellation', message: 'The class scheduled for {date} has been cancelled.' }
    ]);

    const [students] = useState([
        { id: 1, name: 'John Doe', class: 'class-10a' },
        { id: 2, name: 'Jane Smith', class: 'class-10a' },
        { id: 3, name: 'Bob Wilson', class: 'class-10b' }
    ]);

    const [notificationHistory] = useState([
        {
            id: 1,
            title: 'Homework Reminder',
            message: 'Complete Math homework',
            sentTo: 'Class 10-A',
            sentAt: '2024-02-20 10:00 AM',
            readBy: ['John Doe', 'Jane Smith'],
            totalRecipients: 3
        },
        // Add more history items...
    ]);

    const handleTemplateSelect = (templateId) => {
        const template = templates.find(t => t.id === parseInt(templateId));
        if (template) {
            setNotificationTitle(template.title);
            setNotificationMessage(template.message);
        }
    };

    const handleEmailInput = (value) => {
        setCustomEmails(value);
        // Split emails by comma and clean up whitespace
        const emails = value.split(',').map(email => email.trim()).filter(email => email);
        setEmailList(emails);
    };

    const handleSendNotification = () => {
        if (!notificationTitle || !notificationMessage) {
            alert('Please fill in all required fields');
            return;
        }

        let recipients;
        switch (recipientType) {
            case 'all':
                recipients = 'all users';
                break;
            case 'teachers':
                recipients = 'all teachers';
                break;
            case 'students':
                recipients = selectedStudents.length > 0 ? selectedStudents : 'all students';
                break;
            case 'custom':
                recipients = emailList;
                break;
            default:
                recipients = 'all users';
        }

        const notificationData = {
            title: notificationTitle,
            message: notificationMessage,
            scheduledDate: scheduledDate || 'immediate',
            recipientType,
            recipients,
            class: selectedClass
        };

        console.log('Sending notification:', notificationData);
        // Reset form
        setNotificationTitle('');
        setNotificationMessage('');
        setScheduledDate('');
        setSelectedStudents([]);
        setSelectedTemplate('');
        setRecipientType('all');
        setCustomEmails('');
        setEmailList([]);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    Send Notifications
                </h2>
                <button 
                    onClick={() => setShowHistory(!showHistory)}
                    className="py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center"
                >
                    <FontAwesomeIcon icon={faHistory} className="mr-2" />
                    {showHistory ? 'Hide History' : 'Show History'}
                </button>
            </div>

            {!showHistory ? (
                <div className="space-y-4">
                    {/* Template Selection */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                            Select Template
                        </label>
                        <select
                            value={selectedTemplate}
                            onChange={(e) => handleTemplateSelect(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                            <option value="">Choose a template...</option>
                            {templates.map(template => (
                                <option key={template.id} value={template.id}>
                                    {template.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Notification Form */}
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
                    </div>

                    {/* Schedule and Recipients */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                Schedule (Optional)
                            </label>
                            <input
                                type="datetime-local"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">
                                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                                Select Recipients
                            </label>
                            <select
                                value={recipientType}
                                onChange={(e) => setRecipientType(e.target.value)}
                                className="border border-gray-300 rounded p-2 w-full mb-2"
                            >
                                <option value="all">All Users</option>
                                <option value="teachers">All Teachers</option>
                                <option value="students">Students</option>
                                <option value="custom">Custom Emails</option>
                            </select>

                            {recipientType === 'students' && (
                                <select
                                    multiple
                                    value={selectedStudents}
                                    onChange={(e) => setSelectedStudents(
                                        Array.from(e.target.selectedOptions, option => option.value)
                                    )}
                                    className="border border-gray-300 rounded p-2 w-full h-32"
                                >
                                    {students
                                        .filter(student => selectedClass === 'all' || student.class === selectedClass)
                                        .map(student => (
                                            <option key={student.id} value={student.id}>
                                                {student.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            )}

                            {recipientType === 'custom' && (
                                <div className="space-y-2">
                                    <textarea
                                        placeholder="Enter email addresses separated by commas..."
                                        value={customEmails}
                                        onChange={(e) => handleEmailInput(e.target.value)}
                                        className="border border-gray-300 rounded p-2 w-full h-32"
                                    />
                                    {emailList.length > 0 && (
                                        <div className="text-sm text-gray-600">
                                            <div className="font-medium">Recipients:</div>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {emailList.map((email, index) => (
                                                    <span 
                                                        key={index}
                                                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                                                    >
                                                        {email}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold mb-2">Preview</h3>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold">{notificationTitle || 'Notification Title'}</h4>
                            <p className="mt-2">{notificationMessage || 'Notification message will appear here...'}</p>
                        </div>
                    </div>

                    <button 
                        onClick={handleSendNotification}
                        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        {scheduledDate ? 'Schedule Notification' : 'Send Notification'}
                    </button>
                </div>
            ) : (
                /* Notification History */
                <div className="space-y-4">
                    {notificationHistory.map(notification => (
                        <div key={notification.id} className="border rounded-lg p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold">{notification.title}</h3>
                                    <p className="text-gray-600 mt-1">{notification.message}</p>
                                </div>
                                <span className="text-sm text-gray-500">{notification.sentAt}</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                                <span>Sent to: {notification.sentTo}</span>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                                    <span>Read by {notification.readBy.length}/{notification.totalRecipients}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeacherNotifications;