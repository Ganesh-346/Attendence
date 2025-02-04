import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarAlt, 
    faClipboardList, 
    faCommentDots, 
    faPaperPlane,
    faHistory,
    faFileUpload,
    faTimesCircle,
    faEdit,
    faTrash,
    faCalendarPlus
} from '@fortawesome/free-solid-svg-icons';

const RequestLeave = () => {
    const [leaveDate, setLeaveDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [leaveType, setLeaveType] = useState('Sick Leave');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [documents, setDocuments] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [isExtending, setIsExtending] = useState(false);

    // Mock leave balance data
    const [leaveBalance, setLeaveBalance] = useState({
        sickLeave: 10,
        casualLeave: 5,
        emergencyLeave: 3,
        vacationLeave: 7
    });

    // Mock leave history data
    const [leaveHistory, setLeaveHistory] = useState([
        {
            id: 1,
            startDate: '2024-03-01',
            endDate: '2024-03-02',
            type: 'Sick Leave',
            status: 'Approved',
            reason: 'Fever',
            documents: ['medical_certificate.pdf']
        },
        {
            id: 2,
            startDate: '2024-02-15',
            endDate: '2024-02-15',
            type: 'Casual Leave',
            status: 'Rejected',
            reason: 'Personal work'
        }
    ]);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setDocuments(prev => [...prev, ...files]);
    };

    const removeDocument = (index) => {
        setDocuments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!leaveDate || !reason) {
            setError('Please fill in all required fields.');
            return;
        }

        const newLeave = {
            startDate: leaveDate,
            endDate: endDate || leaveDate,
            type: leaveType,
            reason,
            documents: documents.map(doc => doc.name),
            status: 'Pending'
        };

        if (isExtending && selectedLeave) {
            // Handle leave extension
            console.log('Extending leave:', { originalLeave: selectedLeave, extension: newLeave });
        } else {
            // Handle new leave request
            console.log('New leave request:', newLeave);
        }

        setMessage(`Leave request ${isExtending ? 'extension ' : ''}submitted successfully!`);
        resetForm();
    };

    const resetForm = () => {
        setLeaveDate('');
        setEndDate('');
        setLeaveType('Sick Leave');
        setReason('');
        setDocuments([]);
        setError('');
        setIsExtending(false);
        setSelectedLeave(null);
    };

    const handleCancelLeave = (leaveId) => {
        if (window.confirm('Are you sure you want to cancel this leave request?')) {
            setLeaveHistory(prev => 
                prev.map(leave => 
                    leave.id === leaveId 
                        ? { ...leave, status: 'Cancelled' }
                        : leave
                )
            );
        }
    };

    const handleExtendLeave = (leave) => {
        setIsExtending(true);
        setSelectedLeave(leave);
        setLeaveDate(leave.endDate);
        setLeaveType(leave.type);
        setShowHistory(false);
    };

    return (
        <div className="p-4 border border-gray-300 rounded shadow-md bg-white">
            {/* Leave Balance Display */}
            <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(leaveBalance).map(([type, balance]) => (
                    <div key={type} className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-600">
                            {type.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-2xl font-bold text-blue-600">{balance}</p>
                        <p className="text-xs text-gray-500">days remaining</p>
                    </div>
                ))}
            </div>

            {/* Toggle History Button */}
            <button
                onClick={() => setShowHistory(!showHistory)}
                className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-2"
            >
                <FontAwesomeIcon icon={faHistory} />
                {showHistory ? 'Hide History' : 'Show History'}
            </button>

            {showHistory ? (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Leave History</h3>
                    <div className="space-y-4">
                        {leaveHistory.map(leave => (
                            <div key={leave.id} className="p-4 border rounded-lg bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            leave.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                            leave.status === 'Cancelled' ? 'bg-gray-100 text-gray-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {leave.status}
                                        </span>
                                        <p className="mt-2 font-medium">{leave.type}</p>
                                        <p className="text-sm text-gray-600">
                                            {leave.startDate} {leave.endDate !== leave.startDate && `to ${leave.endDate}`}
                                        </p>
                                        <p className="text-sm text-gray-600">{leave.reason}</p>
                                        {leave.documents?.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Attachments:</p>
                                                {leave.documents.map((doc, index) => (
                                                    <span key={index} className="text-sm text-blue-600 mr-2">
                                                        {doc}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {leave.status === 'Pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleExtendLeave(leave)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                title="Extend Leave"
                                            >
                                                <FontAwesomeIcon icon={faCalendarPlus} />
                                            </button>
                                            <button
                                                onClick={() => handleCancelLeave(leave.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                title="Cancel Leave"
                                            >
                                                <FontAwesomeIcon icon={faTimesCircle} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        {isExtending ? 'Extend Leave' : 'Request Leave'}
                    </h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {message && <p className="text-green-500">{message}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 flex items-center">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-500" />
                                Start Date:
                            </label>
                            <input 
                                type="date" 
                                value={leaveDate} 
                                onChange={(e) => setLeaveDate(e.target.value)} 
                                className="border border-gray-300 rounded p-2 w-full"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 flex items-center">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-500" />
                                End Date:
                            </label>
                            <input 
                                type="date" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                                className="border border-gray-300 rounded p-2 w-full"
                                min={leaveDate}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 flex items-center">
                            <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-gray-500" />
                            Leave Type:
                        </label>
                        <select 
                            value={leaveType} 
                            onChange={(e) => setLeaveType(e.target.value)} 
                            className="border border-gray-300 rounded p-2 w-full"
                            disabled={isExtending}
                        >
                            <option value="Sick Leave">Sick Leave ({leaveBalance.sickLeave} days remaining)</option>
                            <option value="Casual Leave">Casual Leave ({leaveBalance.casualLeave} days remaining)</option>
                            <option value="Emergency Leave">Emergency Leave ({leaveBalance.emergencyLeave} days remaining)</option>
                            <option value="Vacation Leave">Vacation Leave ({leaveBalance.vacationLeave} days remaining)</option>
                        </select>
                    </div>

                    {leaveType === 'Sick Leave' && (
                        <div>
                            <label className="block mb-1 flex items-center">
                                <FontAwesomeIcon icon={faFileUpload} className="mr-2 text-gray-500" />
                                Medical Documents:
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="document-upload"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                <label
                                    htmlFor="document-upload"
                                    className="cursor-pointer flex flex-col items-center justify-center text-gray-600"
                                >
                                    <FontAwesomeIcon icon={faFileUpload} className="text-2xl mb-2" />
                                    <span>Click to upload medical documents</span>
                                    <span className="text-sm text-gray-500">PDF, JPG, PNG accepted</span>
                                </label>
                            </div>
                            {documents.length > 0 && (
                                <div className="mt-2 space-y-2">
                                    {documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                            <span className="text-sm">{doc.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeDocument(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 flex items-center">
                            <FontAwesomeIcon icon={faCommentDots} className="mr-2 text-gray-500" />
                            Reason for Leave:
                        </label>
                        <textarea 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)} 
                            rows="4" 
                            className="border border-gray-300 rounded p-2 w-full"
                            placeholder="Please provide a reason for your leave request..."
                        />
                    </div>

                    <div className="flex gap-2">
                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition duration-200 flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                            {isExtending ? 'Submit Extension' : 'Submit Request'}
                        </button>
                        {isExtending && (
                            <button 
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-500 text-white rounded p-2 hover:bg-gray-600 transition duration-200 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faTimesCircle} />
                                Cancel Extension
                            </button>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
};

export default RequestLeave;