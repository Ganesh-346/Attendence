import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const CheckInOut = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [message, setMessage] = useState('');

    const fetchCheckInStatus = () => {
        setTimeout(() => {
            setIsCheckedIn(false);
        }, 1000);
    };

    useEffect(() => {
        fetchCheckInStatus();
    }, []);

    const handleCheckIn = () => {
        setIsCheckedIn(true);
        setMessage('You have successfully checked in.');
    };

    const handleCheckOut = () => {
        setIsCheckedIn(false);
        setMessage('You have successfully checked out.');
    };

    return (
        <div className="p-4 border border-gray-300 rounded shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Check-in/Check-out
            </h2>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <div className="flex space-x-4">
                <button
                    onClick={handleCheckIn}
                    disabled={isCheckedIn}
                    className={`flex items-center bg-blue-600 text-white rounded p-2 ${isCheckedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                    Check In
                </button>
                <button
                    onClick={handleCheckOut}
                    disabled={!isCheckedIn}
                    className={`flex items-center bg-red-600 text-white rounded p-2 ${!isCheckedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Check Out
                </button>
            </div>
            <div className="mt-4">
                <strong>Status:</strong> {isCheckedIn ? 'Checked In' : 'Checked Out'}
            </div>
        </div>
    );
};

export default CheckInOut;