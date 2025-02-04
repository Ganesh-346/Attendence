import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFileAlt, 
    faDownload, 
    faFilePdf, 
    faFileCsv, 
    faSearch, 
    faFilter,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

const AttendanceReports = () => {
    // States for report generation
    const [reportType, setReportType] = useState('daily');
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState('all');
    const [selectedDate, setSelectedDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [downloadFormat, setDownloadFormat] = useState('pdf');

    // Mock data for attendance records
    const [attendanceData] = useState([
        {
            id: 1,
            studentName: 'John Doe',
            class: 'Class 10A',
            date: '2024-02-20',
            status: 'present',
            checkInTime: '08:30 AM'
        },
        {
            id: 2,
            studentName: 'Jane Smith',
            class: 'Class 10B',
            date: '2024-02-20',
            status: 'absent',
            checkInTime: '-'
        },
        // Add more mock data as needed
    ]);

    // Filter attendance data based on search and filters
    const filteredData = attendanceData.filter(record => {
        const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            record.class.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesClass = selectedClass === 'all' || record.class === selectedClass;
        const matchesDate = !selectedDate || record.date === selectedDate;
        return matchesSearch && matchesClass && matchesDate;
    });

    const handleGenerateReport = () => {
        setLoading(true);
        console.log('Generating report:', {
            type: reportType,
            format: downloadFormat,
            class: selectedClass,
            date: selectedDate
        });

        // Simulate report generation
        setTimeout(() => {
            setLoading(false);
            alert(`${downloadFormat.toUpperCase()} Report generated successfully!`);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            {/* Report Generation Controls */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                    Generate Attendance Report
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block mb-2">Report Type:</label>
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                            <option value="daily">Daily Report</option>
                            <option value="weekly">Weekly Report</option>
                            <option value="monthly">Monthly Report</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2">Class:</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                            <option value="all">All Classes</option>
                            <option value="Class 10A">Class 10A</option>
                            <option value="Class 10B">Class 10B</option>
                            {/* Add more class options */}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2">Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Download Format:</label>
                        <select
                            value={downloadFormat}
                            onChange={(e) => setDownloadFormat(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                            <option value="pdf">PDF</option>
                            <option value="csv">CSV</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search by student name or class..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded p-2 pl-10 w-full"
                        />
                        <FontAwesomeIcon 
                            icon={faSearch} 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>

                    <button 
                        onClick={handleGenerateReport}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center ml-4"
                    >
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon 
                                    icon={downloadFormat === 'pdf' ? faFilePdf : faFileCsv} 
                                    className="mr-2"
                                />
                                Generate {downloadFormat.toUpperCase()}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Attendance Data Table */}
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Attendance Records</h3>
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Student Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Class
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Check-in Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map((record) => (
                            <tr key={record.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {record.studentName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {record.class}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {record.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {record.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {record.checkInTime}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceReports;