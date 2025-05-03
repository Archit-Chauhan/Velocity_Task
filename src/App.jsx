import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './components/LoginPage';
import RegisterVendor from './components/RegisterVendors';
import RegisterAdmin from './components/RegisterAdmin';

import VendorDashboard from './components/Dashboard/VendorDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register/vendor" element={<RegisterVendor />} />
        <Route path="/register/admin" element={<RegisterAdmin />} />

        {/* Protected Routes */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
