import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('https://rfpdemo.velsof.com/api/login', formData);

      if (res.data.response === 'success') {
        const { token, type,name,user_id } = res.data;

        // Save token , role , user_id and name 
        localStorage.setItem('token', token);
        localStorage.setItem('type', type);
        localStorage.setItem('name',name);
        localStorage.setItem('userId',user_id);

        toast.success("Login successful!");

        // Navigate
        if (type === 'vendor') {
          navigate('/vendor/dashboard');
        console.log("navigate to vendor dashboard");
        } else if (type === 'admin') {
          navigate('/admin/dashboard');
        console.log("navigate to admin dashboard");
        } else {
        console.log("navigate to dashboard");
        }
      } else {
        toast.error (res.data.error || 'Invalid credentials');
      }
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.error?.[0] || "Something went wrong.")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-100 px-6 py-4">
          <h2 className="text-blue-600 text-xl font-semibold">
            Welcome to RFP System!
          </h2>
          <p className="text-blue-500 text-sm">Sign in to continue</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Log In
            </button>
            {message && (
              <p className="text-center text-sm text-red-600">{message}</p>
            )}
          </form>

          <div className="mt-6 flex flex-col items-center justify-center space-x-2 text-sm text-gray-600 space-y-2">
            <div
              onClick={() => {
                navigate("/register/vendor");
              }}
            >
              <div className="flex items-center gap-3">
                <span>
                  <FaLock />
                </span>{" "}
                Register as Vendor
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>
                <FaLock />
              </span>
              Forgot your password?
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        © Copyright <span className="text-red-500">❤</span> RFP System
      </div>
    </div>
  );
};

export default Login;
