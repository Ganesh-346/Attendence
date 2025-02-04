// src/components/Login/Login.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faIdCard } from '@fortawesome/free-solid-svg-icons';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('student'); // Default role
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        registerId: '', // Added registerId
    });
    const [errors, setErrors] = useState({}); // For input validation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error on change
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.registerId) newErrors.registerId = 'Register ID is required';
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!isLogin && !formData.email) newErrors.email = 'Email is required';
        if (!isLogin && !formData.firstName) newErrors.firstName = 'First name is required';
        if (!isLogin && !formData.lastName) newErrors.lastName = 'Last name is required';
        if (!isLogin && !formData.phone) newErrors.phone = 'Phone number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(isLogin ? 'Logging in' : 'Registering', formData);
            // ... existing code to handle login or registration ...
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Register ID:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                            <FontAwesomeIcon icon={faIdCard} className="p-2 text-gray-500" />
                            <input
                                type="text"
                                name="registerId"
                                value={formData.registerId}
                                onChange={handleChange}
                                required
                                placeholder="Enter your Register ID"
                                className={`mt-1 block w-full rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 ${errors.registerId ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        {errors.registerId && <p className="text-red-500 text-xs mt-1">{errors.registerId}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                            <FontAwesomeIcon icon={faUser} className="p-2 text-gray-500" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Enter your username"
                                className={`mt-1 block w-full rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                            <FontAwesomeIcon icon={faLock} className="p-2 text-gray-500" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className={`mt-1 block w-full rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    {!isLogin && (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email:</label>
                                <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                    <FontAwesomeIcon icon={faEnvelope} className="p-2 text-gray-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email"
                                        className={`mt-1 block w-full rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">First Name:</label>
                                <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                    <FontAwesomeIcon icon={faUser} className="p-2 text-gray-500" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your first name"
                                        className={`mt-1 block w-full rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                                <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                    <FontAwesomeIcon icon={faUser} className="p-2 text-gray-500" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your last name"
                                        className={`mt-1 block w-full rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                                <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                    <FontAwesomeIcon icon={faUser} className="p-2 text-gray-500" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your phone number"
                                        className={`mt-1 block w-full rounded-md p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-4 w-full text-blue-600 font-semibold hover:underline"
                >
                    Switch to {isLogin ? 'Register' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default LoginRegister;