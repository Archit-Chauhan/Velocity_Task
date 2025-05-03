
import React, { useState } from 'react';
import axios from 'axios';

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        mobile: formData.phone 
      };

      const res = await axios.post('https://rfpdemo.velsof.com/api/registeradmin', payload);

      if (res.data.response === 'success') {
        setMessage('Admin registered successfully!');
      } else {
        setMessage('Registration failed: ' + (res.data.error?.[0] || 'Unknown error'));
      }
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error?.[0] || 'Something went wrong'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-100 px-6 py-4">
          <h2 className="text-blue-600 text-xl font-semibold">Welcome to RFP System!</h2>
          <p className="text-blue-500 text-sm">Sign up to continue</p>
        </div>
        <div className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                type="text"
                placeholder="First Name"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone No.</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                placeholder="Phone Number"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
            {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
            <div><i className="fas fa-lock mr-1"></i> Register as Vendor</div>
            <div><i className="fas fa-lock mr-1"></i> Forgot your password?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
