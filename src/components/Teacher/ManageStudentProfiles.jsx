// src/components/Teacher/ManageStudentProfiles.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faIdCard, 
    faEnvelope, 
    faSave, 
    faEdit, 
    faTrash, 
    faSearch, 
    faPlus,
    faUpload,
    faDownload,
    faPhone,
    faGraduationCap,
    faCalendarAlt,
    faFileAlt,
    faUsers
} from '@fortawesome/free-solid-svg-icons';

const ManageStudentProfiles = () => {
    // 1. First declare all states
    const [studentData, setStudentData] = useState({
        id: '',
        name: '',
        registrationId: '',
        email: '',
        photo: null,
        parentInfo: {
            name: '',
            phone: '',
            email: '',
            occupation: ''
        },
        documents: [],
        academicPerformance: {
            currentGrade: '',
            attendance: 0,
            subjects: []
        }
    });

    const [students, setStudents] = useState([
        { 
            id: 1, 
            name: 'John Doe', 
            registrationId: 'REG123',
            email: 'john@example.com',
            regulation: 'R20',
            year: '2nd Year',
            department: 'CSE',
            section: 'A',
            photo: null,
            parentInfo: {
                name: 'Parent Doe',
                phone: '1234567890',
                email: 'parent@example.com',
                occupation: 'Engineer'
            }
        },
        { 
            id: 2, 
            name: 'Jane Smith', 
            registrationId: 'REG124',
            email: 'jane@example.com',
            regulation: 'R20',
            year: '2nd Year',
            department: 'CSE',
            section: 'A',
            photo: null,
            parentInfo: {
                name: 'Parent Smith',
                phone: '9876543210',
                email: 'parent.smith@example.com',
                occupation: 'Doctor'
            }
        },
        { 
            id: 3, 
            name: 'Alice Johnson', 
            registrationId: 'REG125',
            email: 'alice@example.com',
            regulation: 'R21',
            year: '1st Year',
            department: 'ECE',
            section: 'B',
            photo: null,
            parentInfo: {
                name: 'Parent Johnson',
                phone: '5555555555',
                email: 'parent.johnson@example.com',
                occupation: 'Teacher'
            }
        },
        { 
            id: 4, 
            name: 'Bob Wilson', 
            registrationId: 'REG126',
            email: 'bob@example.com',
            regulation: 'R19',
            year: '3rd Year',
            department: 'MECH',
            section: 'C',
            photo: null,
            parentInfo: {
                name: 'Parent Wilson',
                phone: '4444444444',
                email: 'parent.wilson@example.com',
                occupation: 'Business'
            }
        },
        { 
            id: 5, 
            name: 'Charlie Brown', 
            registrationId: 'REG127',
            email: 'charlie@example.com',
            regulation: 'R20',
            year: '2nd Year',
            department: 'CSE',
            section: 'B',
            photo: null,
            parentInfo: {
                name: 'Parent Brown',
                phone: '3333333333',
                email: 'parent.brown@example.com',
                occupation: 'Lawyer'
            }
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showPerformanceModal, setShowPerformanceModal] = useState(false);
    const [showAttendanceHistory, setShowAttendanceHistory] = useState(false);
    const [selectedRegulation, setSelectedRegulation] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [showFilteredStudents, setShowFilteredStudents] = useState(false);

    // 2. Then declare all handlers
    const handleParentInfoChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({
            ...prev,
            parentInfo: {
                ...prev.parentInfo,
                [name.replace('parent', '').toLowerCase()]: value
            }
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // File upload handler
    const handlePhotoUpload = (studentId, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setStudents(students.map(student => 
                student.id === studentId 
                    ? { ...student, photo: reader.result }
                    : student
            ));
        };
        reader.readAsDataURL(file);
    };

    // Document upload handler
    const handleDocumentUpload = (studentId, file, type) => {
        setStudents(students.map(student => 
            student.id === studentId 
                ? {
                    ...student,
                    documents: [...student.documents, { type, file: file.name }]
                }
                : student
        ));
    };

    // Bulk import/export handlers
    const handleBulkImport = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                setStudents([...students, ...importedData]);
            } catch (error) {
                console.error('Error importing data:', error);
            }
        };
        reader.readAsText(file);
    };

    const handleBulkExport = () => {
        const dataStr = JSON.stringify(students, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'students_data.json';
        link.click();
    };

    const handleRemoveDocument = (index) => {
        setStudentData(prev => ({
            ...prev,
            documents: prev.documents.filter((_, i) => i !== index)
        }));
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        if (isEditing) {
            setStudents(students.map(student => 
                student.id === studentData.id ? studentData : student
            ));
        } else {
            setStudents([...students, { ...studentData, id: students.length + 1 }]);
        }
        resetForm();
    };

    const handleEdit = (student) => {
        setStudentData(student);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleRemove = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    const resetForm = () => {
        setStudentData({
            id: '',
            name: '',
            registrationId: '',
            email: '',
            photo: null,
            parentInfo: {
                name: '',
                phone: '',
                email: '',
                occupation: ''
            },
            documents: [],
            academicPerformance: {
                currentGrade: '',
                attendance: 0,
                subjects: []
            }
        });
        setIsEditing(false);
        setShowForm(false);
    };

    // 3. Then declare computed values
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             student.registrationId.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (!showFilteredStudents) return matchesSearch;

        return matchesSearch && 
               (!selectedRegulation || student.regulation === selectedRegulation) &&
               (!selectedYear || student.year === selectedYear) &&
               (!selectedDepartment || student.department === selectedDepartment) &&
               (!selectedSection || student.section === selectedSection);
    });

    // 4. Then declare component fragments
    const enhancedStudentForm = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Photo Upload Section */}
            <div className="col-span-2 flex justify-center mb-4">
                <div className="relative">
                    <img 
                        src={studentData.photo || '/default-avatar.png'} 
                        alt="Student" 
                        className="w-32 h-32 rounded-full object-cover"
                    />
                    <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
                        <FontAwesomeIcon icon={faUpload} className="text-white" />
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(studentData.id, e.target.files[0])}
                        />
                    </label>
                </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Parent/Guardian Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Parent Name"
                        className="border rounded p-2"
                        name="parentName"
                        value={studentData.parentInfo?.name || ''}
                        onChange={handleParentInfoChange}
                    />
                    <input
                        type="tel"
                        placeholder="Parent Phone"
                        className="border rounded p-2"
                        name="parentPhone"
                        value={studentData.parentInfo?.phone || ''}
                        onChange={handleParentInfoChange}
                    />
                    <input
                        type="email"
                        placeholder="Parent Email"
                        className="border rounded p-2"
                        name="parentEmail"
                        value={studentData.parentInfo?.email || ''}
                        onChange={handleParentInfoChange}
                    />
                    <input
                        type="text"
                        placeholder="Parent Occupation"
                        className="border rounded p-2"
                        name="parentOccupation"
                        value={studentData.parentInfo?.occupation || ''}
                        onChange={handleParentInfoChange}
                    />
                </div>
            </div>

            {/* Document Management */}
            <div className="col-span-2">
                <h3 className="font-semibold mb-3">Documents</h3>
                <div className="space-y-2">
                    {studentData.documents?.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span>{doc.type}: {doc.file}</span>
                            <button className="text-red-500" onClick={() => handleRemoveDocument(index)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={() => setShowDocumentModal(true)}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500"
                    >
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        Add Document
                    </button>
                </div>
            </div>
        </div>
    );

    const documentModal = (
        <div className={`fixed inset-0 bg-black bg-opacity-50 ${showDocumentModal ? 'flex' : 'hidden'} items-center justify-center`}>
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Upload Document</h3>
                {/* Document upload form */}
            </div>
        </div>
    );

    const performanceModal = (
        <div className={`fixed inset-0 bg-black bg-opacity-50 ${showPerformanceModal ? 'flex' : 'hidden'} items-center justify-center`}>
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Academic Performance</h3>
                {/* Performance details */}
            </div>
        </div>
    );

    const bulkActions = (
        <div className="flex gap-2 mb-4">
            <label className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Import Students
                <input
                    type="file"
                    className="hidden"
                    accept=".json"
                    onChange={(e) => handleBulkImport(e.target.files[0])}
                />
            </label>
            <button
                onClick={handleBulkExport}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Export Students
            </button>
        </div>
    );

    // Add these arrays for dropdown options
    const regulations = ['R19', 'R20', 'R21', 'R22'];
    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
    const sections = ['A', 'B', 'C', 'D'];

    // Add this function to check if all selections are made
    const canShowStudents = () => {
        return selectedRegulation && selectedYear && selectedDepartment && selectedSection;
    };

    // 5. Finally return the component
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Manage Student Profiles
            </h2>

            {/* Search Bar */}
            <div className="mb-4 flex items-center border border-gray-300 rounded">
                <input
                    type="text"
                    placeholder="Search by name or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 rounded-l w-full"
                />
                <button className="p-2 bg-gray-200 rounded-r">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            {/* Selection Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Regulation</label>
                    <select
                        value={selectedRegulation}
                        onChange={(e) => setSelectedRegulation(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select Regulation</option>
                        {regulations.map(reg => (
                            <option key={reg} value={reg}>{reg}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select Year</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <select
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select Section</option>
                        {sections.map(sec => (
                            <option key={sec} value={sec}>{sec}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Show Students Button */}
            <div className="flex justify-center mb-6">
                <button 
                    onClick={() => setShowFilteredStudents(true)}
                    disabled={!canShowStudents()}
                    className={`py-2 px-6 rounded-lg flex items-center ${
                        canShowStudents() 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    Show Students
                </button>
            </div>

            {/* Add Student Button */}
            <button 
                onClick={() => setShowForm(!showForm)} 
                className="mb-4 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                {showForm ? 'Cancel' : 'Add Student'}
            </button>

            {/* Student Profile Form */}
            {showForm && (
                <form onSubmit={handleUpdateProfile} className="p-4 bg-white rounded-lg shadow-md mb-4">
                    <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Student Profile' : 'Add New Student'}</h3>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="name">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={studentData.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="registrationId">
                            <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                            Registration ID
                        </label>
                        <input
                            type="text"
                            id="registrationId"
                            name="registrationId"
                            value={studentData.registrationId}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="email">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={studentData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="reason">
                            Reason for Update
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={studentData.reason}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            rows="3"
                        />
                    </div>
                    <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        {isEditing ? 'Update Profile' : 'Add Student'}
                    </button>
                </form>
            )}

            {/* Student List Table */}
            {showFilteredStudents && (
                <table className="min-w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2 text-left">Name</th>
                            <th className="border border-gray-300 p-2 text-left">Registration ID</th>
                            <th className="border border-gray-300 p-2 text-left">Department</th>
                            <th className="border border-gray-300 p-2 text-left">Year</th>
                            <th className="border border-gray-300 p-2 text-left">Section</th>
                            <th className="border border-gray-300 p-2 text-left">Email</th>
                            <th className="border border-gray-300 p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="border border-gray-300 p-4 text-center text-gray-500">
                                    No students found for the selected criteria
                                </td>
                            </tr>
                        ) : (
                            filteredStudents.map(student => (
                                <tr key={student.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{student.name}</td>
                                    <td className="border border-gray-300 p-2">{student.registrationId}</td>
                                    <td className="border border-gray-300 p-2">{student.department}</td>
                                    <td className="border border-gray-300 p-2">{student.year}</td>
                                    <td className="border border-gray-300 p-2">{student.section}</td>
                                    <td className="border border-gray-300 p-2">{student.email}</td>
                                    <td className="border border-gray-300 p-2 flex space-x-2">
                                        <button 
                                            onClick={() => handleEdit(student)} 
                                            className="text-blue-500 hover:text-blue-700"
                                            title="Edit Student"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button 
                                            onClick={() => handleRemove(student.id)} 
                                            className="text-red-500 hover:text-red-700"
                                            title="Remove Student"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {/* Import/Export Buttons */}
            <div className="flex gap-2">
                <label className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                    Import Students
                    <input
                        type="file"
                        className="hidden"
                        accept=".json"
                        onChange={(e) => handleBulkImport(e.target.files[0])}
                    />
                </label>
                <button
                    onClick={handleBulkExport}
                    className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Export Students
                </button>
            </div>
        </div>
    );
};

export default ManageStudentProfiles;