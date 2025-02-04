// src/components/Teacher/LeaveApproval.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCheckCircle, 
    faTimesCircle, 
    faClipboardList, 
    faSearch,
    faFileUpload,
    faEnvelope,
    faCalendarAlt,
    faUserClock,
    faCheckDouble
} from '@fortawesome/free-solid-svg-icons';

const LeaveApproval = () => {
    // Enhanced leave requests data with additional fields
    const [leaveRequests, setLeaveRequests] = useState([
        { 
            id: 1, 
            studentName: 'John Doe', 
            regid: "S123",
            reason: 'Medical', 
            date: '2023-09-15', 
            status: 'Pending',
            leaveType: 'Medical',
            documents: ['medical_certificate.pdf'],
            leaveBalance: 10,
            leaveDuration: 2,
            emailNotified: false
        },
        { 
            id: 2, 
            studentName: 'Jane Smith',
            regid: "S124", 
            reason: 'Family Emergency', 
            date: '2023-09-16', 
            status: 'Approved',
            leaveType: 'Personal',
            documents: [],
            leaveBalance: 8,
            leaveDuration: 1,
            emailNotified: true
        },
        { 
            id: 3, 
            studentName: 'Alice Johnson', 
            regid: "S125", 
            reason: 'Vacation', 
            date: '2023-09-17', 
            status: 'Rejected',
            leaveType: 'Personal',
            documents: [],
            leaveBalance: 5,
            leaveDuration: 3,
            emailNotified: true
        },
        { 
            id: 4, 
            studentName: 'Bob Brown', 
            regid: "S126",
            reason: 'Medical', 
            date: '2023-09-18', 
            status: 'Pending',
            leaveType: 'Medical',
            documents: [],
            leaveBalance: 7,
            leaveDuration: 2,
            emailNotified: false
        }
    ]);

    // States for new features
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [showLeaveHistory, setShowLeaveHistory] = useState(false);
    const [leaveBalances, setLeaveBalances] = useState({
        'S123': { medical: 10, personal: 5, total: 15 }
        // ... other students' balances
    });

    // Bulk actions handlers
    const handleBulkApprove = () => {
        setLeaveRequests(leaveRequests.map(request => 
            selectedRequests.includes(request.id) 
                ? { ...request, status: 'Approved' } 
                : request
        ));
        // Send email notifications
        selectedRequests.forEach(id => sendEmailNotification(id, 'approved'));
        setSelectedRequests([]);
    };

    const handleBulkReject = () => {
        setLeaveRequests(leaveRequests.map(request => 
            selectedRequests.includes(request.id) 
                ? { ...request, status: 'Rejected' } 
                : request
        ));
        // Send email notifications
        selectedRequests.forEach(id => sendEmailNotification(id, 'rejected'));
        setSelectedRequests([]);
    };

    // Document handling
    const handleDocumentUpload = (requestId, files) => {
        setLeaveRequests(leaveRequests.map(request => 
            request.id === requestId 
                ? { 
                    ...request, 
                    documents: [...(request.documents || []), ...Array.from(files).map(f => f.name)] 
                  }
                : request
        ));
    };

    // Email notification
    const sendEmailNotification = (requestId, status) => {
        const request = leaveRequests.find(r => r.id === requestId);
        console.log(`Sending ${status} notification email to ${request.studentName}`);
        // Implement actual email sending logic
    };

    // Leave balance update
    const updateLeaveBalance = (studentId, days, type) => {
        setLeaveBalances(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [type]: prev[studentId][type] - days,
                total: prev[studentId].total - days
            }
        }));
    };

    // Individual approval handler
    const handleApprove = (requestId) => {
        setLeaveRequests(leaveRequests.map(request => 
            request.id === requestId 
                ? { ...request, status: 'Approved' } 
                : request
        ));
    };

    // Individual rejection handler
    const handleReject = (requestId) => {
        setLeaveRequests(leaveRequests.map(request => 
            request.id === requestId 
                ? { ...request, status: 'Rejected' } 
                : request
        ));
    };

    // Add these new states at the top with other states
    const [searchTerm, setSearchTerm] = useState('');
    const [leaveHistory] = useState([
        { 
            id: 5,
            studentName: 'John Doe',
            regid: "S123",
            reason: 'Medical',
            date: '2023-09-01',
            status: 'Approved',
            leaveType: 'Medical',
            documents: ['old_medical_certificate.pdf'],
            leaveDuration: 1,
            approvedBy: 'Ms. Smith',
            approvedAt: '2023-09-01 10:30 AM'
        },
        // Add more history items...
    ]);

    // Add this filter function before the return statement
    const filteredRequests = (showLeaveHistory ? leaveHistory : leaveRequests).filter(request => {
        return (
            request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.regid.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                    {showLeaveHistory ? 'Leave History' : 'Leave Approval'}
                </h2>
                <button
                    onClick={() => setShowLeaveHistory(!showLeaveHistory)}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    {showLeaveHistory ? 'Current Requests' : 'View History'}
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow">
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by student name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <FontAwesomeIcon 
                            icon={faSearch} 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* Leave Balance Summary - Only show for current requests */}
            {!showLeaveHistory && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-4 rounded">
                        <h3 className="font-semibold">Medical Leave Balance</h3>
                        <div className="text-2xl font-bold text-blue-600">
                            {leaveBalances['S123']?.medical || 0} days
                        </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                        <h3 className="font-semibold">Personal Leave Balance</h3>
                        <div className="text-2xl font-bold text-green-600">
                            {leaveBalances['S123']?.personal || 0} days
                        </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded">
                        <h3 className="font-semibold">Total Leave Balance</h3>
                        <div className="text-2xl font-bold text-purple-600">
                            {leaveBalances['S123']?.total || 0} days
                        </div>
                    </div>
                </div>
            )}

            {/* Enhanced Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {!showLeaveHistory && (
                                <th className="p-4 w-12">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRequests(leaveRequests.map(r => r.id));
                                            } else {
                                                setSelectedRequests([]);
                                            }
                                        }}
                                    />
                                </th>
                            )}
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Student Details
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Leave Type
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Duration & Date
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Documents
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            {!showLeaveHistory && (
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredRequests.length === 0 ? (
                            <tr>
                                <td colSpan={showLeaveHistory ? 6 : 7} className="p-4 text-center text-gray-500">
                                    No leave requests found
                                </td>
                            </tr>
                        ) : (
                            filteredRequests.map(request => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    {!showLeaveHistory && (
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={selectedRequests.includes(request.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedRequests([...selectedRequests, request.id]);
                                                    } else {
                                                        setSelectedRequests(selectedRequests.filter(id => id !== request.id));
                                                    }
                                                }}
                                            />
                                        </td>
                                    )}
                                    <td className="p-4">
                                        <div className="text-sm font-medium text-gray-900">{request.studentName}</div>
                                        <div className="text-sm text-gray-500">{request.regid}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            request.leaveType === 'Medical' 
                                                ? 'bg-blue-100 text-blue-800' 
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {request.leaveType}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-900">{request.leaveDuration} days</div>
                                        <div className="text-sm text-gray-500">{request.date}</div>
                                    </td>
                                    <td className="p-4">
                                        {(request.documents || []).map(doc => (
                                            <div key={doc} className="text-blue-600 hover:underline cursor-pointer">
                                                {doc}
                                            </div>
                                        ))}
                                        <label className="cursor-pointer text-sm text-gray-500">
                                            <FontAwesomeIcon icon={faFileUpload} className="mr-1" />
                                            Upload
                                            <input
                                                type="file"
                                                className="hidden"
                                                multiple
                                                onChange={(e) => handleDocumentUpload(request.id, e.target.files)}
                                            />
                                        </label>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded ${
                                            request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {request.status === 'Pending' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        handleApprove(request.id);
                                                        updateLeaveBalance(request.regid, request.leaveDuration, request.leaveType.toLowerCase());
                                                        sendEmailNotification(request.id, 'approved');
                                                    }}
                                                    className="text-green-500 hover:text-green-700 mx-3"
                                                >
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleReject(request.id);
                                                        sendEmailNotification(request.id, 'rejected');
                                                    }}
                                                    className="text-red-500 hover:text-red-700 mx-3"
                                                >
                                                    <FontAwesomeIcon icon={faTimesCircle} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveApproval;