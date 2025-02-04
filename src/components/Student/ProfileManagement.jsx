import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faCamera, faEdit, faSave, faTimes, faFileUpload, faGraduationCap, faKey, faUserShield, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const ProfileManagement = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        department: 'Computer Science', // Default department
        registerId: 'S123456', // Default register ID
        regulation: '2023', // Default regulation
        avatar: null, // For profile picture
    });
    const [tempData, setTempData] = useState(profileData);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [academicHistory, setAcademicHistory] = useState([]);
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showContactModal, setShowContactModal] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [contactData, setContactData] = useState({
        name: '',
        relationship: '',
        phone: '',
        email: ''
    });

    const fetchProfileData = () => {
        setTimeout(() => {
            setProfileData({
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '123-456-7890',
                department: 'Computer Science',
                registerId: 'S123456',
                regulation: '2023',
                avatar: null,
            });
            setTempData({
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '123-456-7890',
                department: 'Computer Science',
                registerId: 'S123456',
                regulation: '2023',
                avatar: null,
            });
        }, 1000);
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    useEffect(() => {
        setEmergencyContacts([
            {
                id: 1,
                name: 'Parent Name',
                relationship: 'Father',
                phone: '987-654-3210',
                email: 'parent@example.com'
            }
        ]);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!tempData.name || !tempData.email || !tempData.phone) {
            setError('Please fill in all fields.');
            return;
        }
        setProfileData(tempData);
        setMessage('Profile updated successfully!');
        setError('');
        setIsEditing(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                setTempData((prevData) => ({ ...prevData, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setTempData(profileData);
        setIsEditing(false);
    };

    const handleDocumentUpload = (e) => {
        const files = Array.from(e.target.files);
        setDocuments(prev => [...prev, ...files.map(file => ({
            id: Date.now(),
            name: file.name,
            type: file.type,
            file: file
        }))]);
    };

    const removeDocument = (docId) => {
        setDocuments(prev => prev.filter(doc => doc.id !== docId));
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        console.log('Password changed:', passwordData);
        setMessage('Password updated successfully!');
        setShowPasswordModal(false);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const handleEditContact = (contactId) => {
        const contact = emergencyContacts.find(c => c.id === contactId);
        if (contact) {
            setContactData(contact);
            setEditingContact(contactId);
            setShowContactModal(true);
        }
    };

    const handleAddContact = () => {
        setContactData({
            name: '',
            relationship: '',
            phone: '',
            email: ''
        });
        setEditingContact(null);
        setShowContactModal(true);
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        if (editingContact) {
            // Update existing contact
            setEmergencyContacts(prev => prev.map(contact =>
                contact.id === editingContact
                    ? { ...contactData, id: contact.id }
                    : contact
            ));
        } else {
            // Add new contact
            setEmergencyContacts(prev => [...prev, {
                ...contactData,
                id: Date.now()
            }]);
        }
        setShowContactModal(false);
        setContactData({
            name: '',
            relationship: '',
            phone: '',
            email: ''
        });
        setEditingContact(null);
    };

    return (
        <div className="p-4 border border-gray-300 rounded shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile Management
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {avatar || profileData.avatar ? (
                            <img 
                                src={avatar || profileData.avatar} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 text-4xl" />
                        )}
                    </div>
                    {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600">
                            <FontAwesomeIcon icon={faCamera} className="text-white" />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    )}
                </div>
            </div>
            {!isEditing ? (
                <div>
                    <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                        <span className="font-semibold">{profileData.name}</span>
                    </div>
                    <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                        <span className="font-semibold">{profileData.email}</span>
                    </div>
                    <div className="mb-4 flex items-center">
                        <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-500" />
                        <span className="font-semibold">{profileData.phone}</span>
                    </div>
                    <div className="mb-4 flex items-center">
                        <span className="font-semibold">Department: {profileData.department}</span>
                    </div>
                    <div className="mb-4 flex items-center">
                        <span className="font-semibold">Register ID: {profileData.registerId}</span>
                    </div>
                    <div className="mb-4 flex items-center">
                        <span className="font-semibold">Regulation: {profileData.regulation}</span>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="mb-4">
                        <label className="block mb-1 flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={tempData.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 flex items-center">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={tempData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 flex items-center">
                            <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-500" />
                            Phone:
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={tempData.phone}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                            Department:
                        </label>
                        <input
                            type="text"
                            name="department"
                            value={tempData.department}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            placeholder="Enter your department"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                            Register ID:
                        </label>
                        <input
                            type="text"
                            name="registerId"
                            value={tempData.registerId}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            placeholder="Enter your register ID"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                            Regulation:
                        </label>
                        <input
                            type="text"
                            name="regulation"
                            value={tempData.regulation}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            placeholder="Enter your regulation"
                        />
                    </div>
                    <div className="flex gap-2 mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faSave} />
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200 flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FontAwesomeIcon icon={faPhoneVolume} className="mr-2" />
                    Emergency Contacts
                </h3>
                <div className="space-y-4">
                    {emergencyContacts.map(contact => (
                        <div key={contact.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold">{contact.name}</h4>
                                    <p className="text-gray-600">{contact.relationship}</p>
                                    <p className="text-gray-600">{contact.phone}</p>
                                    <p className="text-gray-600">{contact.email}</p>
                                </div>
                                <button
                                    onClick={() => handleEditContact(contact.id)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => handleAddContact()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Add Emergency Contact
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={() => setShowPasswordModal(true)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faKey} />
                    Change Password
                </button>
            </div>

            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                            Change Password
                        </h3>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData(prev => ({
                                        ...prev,
                                        currentPassword: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData(prev => ({
                                        ...prev,
                                        newPassword: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData(prev => ({
                                        ...prev,
                                        confirmPassword: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showContactModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <FontAwesomeIcon icon={faPhoneVolume} className="mr-2" />
                            {editingContact ? 'Edit Contact' : 'Add Contact'}
                        </h3>
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    value={contactData.name}
                                    onChange={(e) => setContactData(prev => ({
                                        ...prev,
                                        name: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Relationship</label>
                                <select
                                    value={contactData.relationship}
                                    onChange={(e) => setContactData(prev => ({
                                        ...prev,
                                        relationship: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                >
                                    <option value="">Select Relationship</option>
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Guardian">Guardian</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={contactData.phone}
                                    onChange={(e) => setContactData(prev => ({
                                        ...prev,
                                        phone: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={contactData.email}
                                    onChange={(e) => setContactData(prev => ({
                                        ...prev,
                                        email: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowContactModal(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {editingContact ? 'Update' : 'Add'} Contact
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileManagement;