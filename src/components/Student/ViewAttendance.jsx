import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch, 
    faFilter, 
    faClipboardList, 
    faCheckCircle, 
    faTimesCircle, 
    faClock,
    faDownload,
    faEdit
} from '@fortawesome/free-solid-svg-icons';

const ViewAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showCorrectionModal, setShowCorrectionModal] = useState(false);
    const [correctionData, setCorrectionData] = useState({
        date: '',
        subject: '',
        reason: '',
        attachments: []
    });

    const demoData = [
        { date: '2023-09-01', status: 'Present', remarks: 'On time' },
        { date: '2023-09-02', status: 'Absent', remarks: 'Sick' },
        { date: '2023-09-03', status: 'Present', remarks: 'On time' },
        { date: '2023-09-04', status: 'Late', remarks: 'Traffic issues' },
        { date: '2023-09-05', status: 'Present', remarks: 'On time' },
        { date: '2023-09-06', status: 'Absent', remarks: 'Family emergency' },
    ];

    const fetchAttendanceRecords = () => {
        setTimeout(() => {
            setAttendanceRecords(demoData);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchAttendanceRecords();
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredRecords = attendanceRecords.filter(record => {
        const matchesStatus = filter === 'All' || record.status === filter;
        const matchesSearch = record.date.includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    // Attendance Calculation
    const totalDaysInMonth = 30; // Example: 30 days in the month
    const daysAttended = attendanceRecords.filter(record => record.status === 'Present').length; // Count of present days
    const targetAttendancePercentage = 74; // Target attendance percentage

    // Calculate attendance percentage
    const attendancePercentage = (daysAttended / totalDaysInMonth) * 100;

    // Calculate days needed to reach target attendance percentage
    const daysNeeded = Math.ceil((targetAttendancePercentage / 100) * totalDaysInMonth) - daysAttended;

    const handleCorrectionSubmit = (e) => {
        e.preventDefault();
        console.log('Correction request submitted:', correctionData);
        // Add API call here
        setShowCorrectionModal(false);
        setCorrectionData({
            date: '',
            subject: '',
            reason: '',
            attachments: []
        });
    };

    if (loading) {
        return <div>Loading attendance records...</div>;
    }

    return (
        <div className="p-4 border border-gray-300 rounded shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                Attendance Records
            </h2>

            <div className="flex items-center mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by date..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded p-2 pl-10"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-2 text-gray-500" />
                </div>
                <div className="ml-4">
                    <select value={filter} onChange={handleFilterChange} className="border border-gray-300 rounded p-2">
                        <option value="All">All</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                    </select>
                    <FontAwesomeIcon icon={faFilter} className="ml-2 text-gray-500" />
                </div>
            </div>
            {filteredRecords.length === 0 ? (
                <p>No attendance records found.</p>
            ) : (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.map((record, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{record.date}</td>
                                <td className="border border-gray-300 p-2 flex items-center">
                                    {record.status === 'Present' && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-1" />}
                                    {record.status === 'Absent' && <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-1" />}
                                    {record.status === 'Late' && <FontAwesomeIcon icon={faClock} className="text-yellow-500 mr-1" />}
                                    {record.status}
                                </td>
                                <td className="border border-gray-300 p-2">{record.remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Request Correction Button */}
            <button
                onClick={() => setShowCorrectionModal(true)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
                <FontAwesomeIcon icon={faEdit} />
                Request Attendance Correction
            </button>

            {/* Correction Request Modal */}
            {showCorrectionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Request Attendance Correction</h3>
                        <form onSubmit={handleCorrectionSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1">Date</label>
                                <input
                                    type="date"
                                    value={correctionData.date}
                                    onChange={(e) => setCorrectionData(prev => ({
                                        ...prev,
                                        date: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={correctionData.subject}
                                    onChange={(e) => setCorrectionData(prev => ({
                                        ...prev,
                                        subject: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Reason</label>
                                <textarea
                                    value={correctionData.reason}
                                    onChange={(e) => setCorrectionData(prev => ({
                                        ...prev,
                                        reason: e.target.value
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Supporting Documents</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => setCorrectionData(prev => ({
                                        ...prev,
                                        attachments: Array.from(e.target.files)
                                    }))}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCorrectionModal(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAttendance;