// src/components/Teacher/ViewClassReports.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCheckCircle, faFileExport, faSearch, faQrcode, faFingerprint, faClock, faChartBar, faHistory, faComments } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'react-chartjs-2';

const ViewClassReports = () => {
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [showBiometric, setShowBiometric] = useState(false);
    const [remarks, setRemarks] = useState({});
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const className = "10th Grade";
    const year = "2023";
    const [selectedRegulation, setSelectedRegulation] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [showStudents, setShowStudents] = useState(false);
    const [fetchTriggered, setFetchTriggered] = useState(false);

    // Mock attendance statistics
    const [statistics] = useState({
        present: 85,
        absent: 10,
        late: 5,
        total: 100
    });

    // Bulk attendance actions
    const markAllPresent = () => {
        const newAttendanceData = {};
        students.forEach(student => {
            newAttendanceData[student.id] = 'Present';
        });
        setAttendanceData(newAttendanceData);
    };

    const markAllAbsent = () => {
        const newAttendanceData = {};
        students.forEach(student => {
            newAttendanceData[student.id] = 'Absent';
        });
        setAttendanceData(newAttendanceData);
    };

    // Handle QR Code scanning
    const handleQRScan = () => {
        setShowQRScanner(!showQRScanner);
        // Implement QR scanning logic
        console.log('QR scanning initiated');
    };

    // Handle biometric attendance
    const handleBiometric = () => {
        setShowBiometric(!showBiometric);
        // Implement biometric scanning logic
        console.log('Biometric scanning initiated');
    };

    // Handle late arrival
    const handleLateArrival = (studentId) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: 'Late'
        }));
    };

    // Handle remarks
    const handleRemarkChange = (studentId, remark) => {
        setRemarks(prev => ({
            ...prev,
            [studentId]: remark
        }));
    };

    // Simulate fetching student data for attendance
    useEffect(() => {
        const fetchStudents = async () => {
            if (canShowStudents() && fetchTriggered) {
                setLoading(true);
                // Simulating a delay for fetching data
                await new Promise(resolve => setTimeout(resolve, 1000));
                setStudents([
                    { id: 1, name: 'John Doe', registrationId: 'REG123' },
                    { id: 2, name: 'Jane Smith', registrationId: 'REG124' },
                    { id: 3, name: 'Alice Johnson', registrationId: 'REG125' },
                    { id: 4, name: 'Bob Brown', registrationId: 'REG126' },
                    { id: 5, name: 'Charlie Black', registrationId: 'REG127' },
                ]);
                setLoading(false);
                setShowStudents(true);
            }
        };

        fetchStudents();
    }, [fetchTriggered]);

    const handleAttendanceChange = (id, status) => {
        setAttendanceData(prevState => ({
            ...prevState,
            [id]: status, // Set attendance status (Present or Absent)
        }));
    };

    const handleSubmitAttendance = () => {
        const attendanceReport = students.map(student => ({
            name: student.name,
            registrationId: student.registrationId,
            status: attendanceData[student.id] || 'Not Marked',
            remarks: remarks[student.id] || '',
            date: selectedDate
        }));

        console.log('Attendance Report:', {
            date: selectedDate,
            regulation: selectedRegulation,
            year: selectedYear,
            department: selectedDepartment,
            section: selectedSection,
            attendance: attendanceReport
        });

        setAttendanceSubmitted(true);
    };

    // Filter students based on search term
    const filteredStudents = students.filter(student => {
        return (
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.registrationId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleExport = () => {
        // Logic to export attendance data
        const exportData = filteredStudents.map(student => ({
            name: student.name,
            registrationId: student.registrationId,
            status: attendanceData[student.id] || 'Not Marked',
        }));

        console.log('Exporting attendance data:', exportData);
        // You can implement actual export logic here (e.g., CSV download)
    };

    // Add these mock data arrays
    const regulations = ['R19', 'R20', 'R21', 'R22'];
    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
    const sections = ['A', 'B', 'C', 'D'];

    // Add this function to check if all selections are made
    const canShowStudents = () => {
        return selectedRegulation && selectedYear && selectedDepartment && selectedSection;
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    Take Attendance
                </h2>
                <button 
                    onClick={() => setShowHistory(!showHistory)}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    <FontAwesomeIcon icon={faHistory} className="mr-2" />
                    View History
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
                    onClick={() => setFetchTriggered(true)}
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

            {/* Show loading state or no selection message */}
            {!canShowStudents() && (
                <div className="text-center py-8 text-gray-500">
                    Please select all fields to view students
                </div>
            )}

            {loading && (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading students...</p>
                </div>
            )}

            {/* Show students only when fetch is triggered and loading is complete */}
            {showStudents && !loading && fetchTriggered && (
                <>
                    {/* Bulk Actions */}
                    <div className="mb-4 flex gap-2">
                        <button 
                            onClick={markAllPresent}
                            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Mark All Present
                        </button>
                        <button 
                            onClick={markAllAbsent}
                            className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Mark All Absent
                        </button>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-4">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="border border-gray-300 rounded p-2"
                        />
                    </div>

                    {/* Attendance Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {filteredStudents.map(student => (
                            <div key={student.id} className="bg-white border rounded-lg p-4 shadow-md">
                                <h3 className="text-lg font-semibold">{student.name}</h3>
                                <p className="text-gray-600">ID: {student.registrationId}</p>
                                
                                {/* Attendance Status Buttons */}
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => handleAttendanceChange(student.id, 'Present')}
                                        className={`py-1 px-3 rounded ${
                                            attendanceData[student.id] === 'Present' 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-gray-200'
                                        }`}
                                    >
                                        Present
                                    </button>
                                    <button
                                        onClick={() => handleAttendanceChange(student.id, 'Absent')}
                                        className={`py-1 px-3 rounded ${
                                            attendanceData[student.id] === 'Absent' 
                                                ? 'bg-red-500 text-white' 
                                                : 'bg-gray-200'
                                        }`}
                                    >
                                        Absent
                                    </button>
                                    <button
                                        onClick={() => handleLateArrival(student.id)}
                                        className={`py-1 px-3 rounded ${
                                            attendanceData[student.id] === 'Late' 
                                                ? 'bg-yellow-500 text-white' 
                                                : 'bg-gray-200'
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faClock} className="mr-1" />
                                        Late
                                    </button>
                                </div>

                                {/* Remarks Input */}
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="Add remarks..."
                                        value={remarks[student.id] || ''}
                                        onChange={(e) => handleRemarkChange(student.id, e.target.value)}
                                        className="border border-gray-300 rounded p-1 w-full text-sm"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Statistics Visualization */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h3 className="text-lg font-semibold mb-4">
                            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                            Attendance Statistics
                        </h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-green-100 p-4 rounded">
                                <div className="text-2xl font-bold text-green-600">{statistics.present}%</div>
                                <div className="text-sm text-gray-600">Present</div>
                            </div>
                            <div className="bg-red-100 p-4 rounded">
                                <div className="text-2xl font-bold text-red-600">{statistics.absent}%</div>
                                <div className="text-sm text-gray-600">Absent</div>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded">
                                <div className="text-2xl font-bold text-yellow-600">{statistics.late}%</div>
                                <div className="text-sm text-gray-600">Late</div>
                            </div>
                        </div>
                    </div>

                    {/* Previous Attendance Records */}
                    {showHistory && (
                        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <h3 className="text-lg font-semibold mb-4">Previous Attendance Records</h3>
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="p-2 text-left">Date</th>
                                        <th className="p-2 text-left">Present</th>
                                        <th className="p-2 text-left">Absent</th>
                                        <th className="p-2 text-left">Late</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Add mock history data */}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button 
                        onClick={handleSubmitAttendance}
                        disabled={attendanceSubmitted}
                        className={`mt-4 py-2 px-4 rounded flex items-center ${
                            attendanceSubmitted 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                        {attendanceSubmitted ? 'Attendance Submitted' : 'Submit Attendance'}
                    </button>
                </>
            )}
        </div>
    );
};

export default ViewClassReports;