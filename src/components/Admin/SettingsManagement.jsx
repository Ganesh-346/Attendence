import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCog, 
    faSave, 
    faUserShield, 
    faBell, 
    faGlobe, 
    faDownload, 
    faUpload,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

const SettingsManagement = () => {
    // Attendance Policy Settings
    const [attendanceThreshold, setAttendanceThreshold] = useState(75);
    const [lateThreshold, setLateThreshold] = useState(15);
    const [autoNotify, setAutoNotify] = useState(true);

    // User Role Settings
    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin', permissions: ['all'] },
        { id: 2, name: 'Teacher', permissions: ['view', 'edit'] },
        { id: 3, name: 'Student', permissions: ['view'] }
    ]);
    const [selectedRole, setSelectedRole] = useState('');
    const [newPermission, setNewPermission] = useState('');

    // System Settings
    const [timeZone, setTimeZone] = useState('UTC');
    const [notificationPreferences, setNotificationPreferences] = useState({
        email: true,
        push: true,
        sms: false
    });
    const [language, setLanguage] = useState('en');

    // Loading States
    const [loading, setLoading] = useState(false);
    const [backupLoading, setBackupLoading] = useState(false);

    const handleSaveSettings = () => {
        setLoading(true);
        // Simulate saving settings
        setTimeout(() => {
            setLoading(false);
            alert('Settings saved successfully!');
        }, 2000);
    };

    const handleBackup = () => {
        setBackupLoading(true);
        // Simulate backup process
        setTimeout(() => {
            setBackupLoading(false);
            const date = new Date().toISOString().split('T')[0];
            alert(`Backup created successfully: settings_backup_${date}.json`);
        }, 2000);
    };

    const handleRestore = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Simulate restore process
            setTimeout(() => {
                alert('Settings restored successfully!');
            }, 1000);
        }
    };

    return (
        <div className="space-y-6">
            {/* Attendance Policies */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                    Attendance Policies
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2">Minimum Attendance Threshold (%):</label>
                        <input
                            type="number"
                            value={attendanceThreshold}
                            onChange={(e) => setAttendanceThreshold(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                            min="0"
                            max="100"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Late Arrival Threshold (minutes):</label>
                        <input
                            type="number"
                            value={lateThreshold}
                            onChange={(e) => setLateThreshold(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                            min="0"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={autoNotify}
                            onChange={(e) => setAutoNotify(e.target.checked)}
                            className="mr-2"
                        />
                        <label>Automatically notify on attendance issues</label>
                    </div>
                </div>
            </div>

            {/* User Role Management */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                    User Role Management
                </h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Select Role:</label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="border border-gray-300 rounded p-2 w-full"
                            >
                                <option value="">Select a role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Add Permission:</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newPermission}
                                    onChange={(e) => setNewPermission(e.target.value)}
                                    className="border border-gray-300 rounded p-2 flex-1"
                                    placeholder="Enter permission"
                                />
                                <button 
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    onClick={() => {/* Handle adding permission */}}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                    System Settings
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2">Time Zone:</label>
                        <select
                            value={timeZone}
                            onChange={(e) => setTimeZone(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                            <option value="UTC">UTC</option>
                            <option value="EST">EST</option>
                            <option value="PST">PST</option>
                            {/* Add more time zones */}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Language:</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            {/* Add more languages */}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Notification Preferences:</label>
                        <div className="space-y-2">
                            {Object.entries(notificationPreferences).map(([key, value]) => (
                                <div key={key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={(e) => setNotificationPreferences({
                                            ...notificationPreferences,
                                            [key]: e.target.checked
                                        })}
                                        className="mr-2"
                                    />
                                    <label className="capitalize">{key} Notifications</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Backup and Restore */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Backup and Restore</h2>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handleBackup}
                        disabled={backupLoading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
                    >
                        <FontAwesomeIcon icon={backupLoading ? faSpinner : faDownload} className={`mr-2 ${backupLoading ? 'fa-spin' : ''}`} />
                        {backupLoading ? 'Creating Backup...' : 'Create Backup'}
                    </button>
                    <div>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleRestore}
                            className="hidden"
                            id="restore-file"
                        />
                        <label
                            htmlFor="restore-file"
                            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 cursor-pointer flex items-center"
                        >
                            <FontAwesomeIcon icon={faUpload} className="mr-2" />
                            Restore Settings
                        </label>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button 
                    onClick={handleSaveSettings}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center"
                >
                    {loading ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faSave} className="mr-2" />
                            Save All Settings
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default SettingsManagement;