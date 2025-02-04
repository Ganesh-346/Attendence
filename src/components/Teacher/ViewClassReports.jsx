// src/components/Teacher/ViewClassReports.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarAlt, 
    faSearch, 
    faDownload, 
    faChartBar, 
    faClock,
    faFileExcel,
    faFilePdf,
    faFileCode,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ViewClassReports = () => {
    // Enhanced states
    const [reports, setReports] = useState([
        { 
            id: 1, 
            studentName: 'John Doe', 
            date: '2023-09-15', 
            status: 'Present',
            class: '10A',
            performance: 85
        },
        // ... more report data
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [selectedClass, setSelectedClass] = useState('all');
    const [selectedFormat, setSelectedFormat] = useState('pdf');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleConfig, setScheduleConfig] = useState({
        frequency: 'weekly',
        email: '',
        format: 'pdf'
    });

    // Computed values for charts
    const attendanceData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
            {
                label: 'Class Attendance %',
                data: [95, 88, 92, 85, 90],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const performanceData = {
        labels: ['10A', '10B', '10C'],
        datasets: [
            {
                label: 'Average Performance',
                data: [85, 78, 82],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    };

    // Export handlers
    const handleExport = (format) => {
        const exportData = reports.map(report => ({
            Student: report.studentName,
            Date: report.date,
            Status: report.status,
            Class: report.class,
            Performance: report.performance
        }));

        switch (format) {
            case 'excel':
                // Implement Excel export
                console.log('Exporting to Excel:', exportData);
                break;
            case 'pdf':
                // Implement PDF export
                console.log('Exporting to PDF:', exportData);
                break;
            case 'csv':
                // Implement CSV export
                console.log('Exporting to CSV:', exportData);
                break;
            default:
                break;
        }
    };

    // Schedule report handler
    const handleScheduleReport = (config) => {
        console.log('Scheduling report with config:', config);
        setShowScheduleModal(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                    Class Attendance Reports
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowScheduleModal(true)}
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        Schedule Reports
                    </button>
                </div>
            </div>

            {/* Enhanced Search and Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Search by student name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded p-2"
                />
                <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="border rounded p-2"
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="border rounded p-2"
                    placeholder="End Date"
                />
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="all">All Classes</option>
                    <option value="10A">Class 10A</option>
                    <option value="10B">Class 10B</option>
                    <option value="10C">Class 10C</option>
                </select>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Attendance Trends</h3>
                    <Line data={attendanceData} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Class Comparison</h3>
                    <Bar data={performanceData} />
                </div>
            </div>

            {/* Export Options */}
            <div className="flex gap-2 bg-white p-4 rounded-lg shadow">
                <button
                    onClick={() => handleExport('excel')}
                    className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                    Export to Excel
                </button>
                <button
                    onClick={() => handleExport('pdf')}
                    className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                    Export to PDF
                </button>
                <button
                    onClick={() => handleExport('csv')}
                    className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    <FontAwesomeIcon icon={faFileCode} className="mr-2" />
                    Export to CSV
                </button>
            </div>

            {/* Schedule Report Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Schedule Report</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1">Frequency</label>
                                <select
                                    value={scheduleConfig.frequency}
                                    onChange={(e) => setScheduleConfig({
                                        ...scheduleConfig,
                                        frequency: e.target.value
                                    })}
                                    className="w-full border rounded p-2"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={scheduleConfig.email}
                                    onChange={(e) => setScheduleConfig({
                                        ...scheduleConfig,
                                        email: e.target.value
                                    })}
                                    className="w-full border rounded p-2"
                                    placeholder="Enter email address"
                                />
                            </div>
                            
                            <div>
                                <label className="block mb-1">Format</label>
                                <select
                                    value={scheduleConfig.format}
                                    onChange={(e) => setScheduleConfig({
                                        ...scheduleConfig,
                                        format: e.target.value
                                    })}
                                    className="w-full border rounded p-2"
                                >
                                    <option value="pdf">PDF</option>
                                    <option value="excel">Excel</option>
                                    <option value="csv">CSV</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowScheduleModal(false)}
                                    className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleScheduleReport(scheduleConfig)}
                                    className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Existing Reports Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* ... your existing table code ... */}
            </div>
        </div>
    );
};

export default ViewClassReports;