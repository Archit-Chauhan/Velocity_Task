
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from './admin_pages/Dashboard';
import Vendors from './admin_pages/Vendors';
import Rfp from './admin_pages/Rfp';
import Users from './admin_pages/Users';
import Categories from './admin_pages/Categories';

const AdminDashboard = () => {
  const [child, setChild] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard", icon: "TiDocumentText", path: "Dashboard" },
    { label: "Vendors", icon: "MdOutlineDocumentScanner", path: "Vendors" },
    { label: "RFP Lists", icon: "mdi mdi-flip-vertical", path: "Rfp" },
    { label: "User Management", icon: "mdi mdi-apps", path: "Users" },
    { label: "Categories", icon: "mdi mdi-weather-night", path: "Categories" },
  ];

  const componentMap = {
    Dashboard: <Dashboard />,
    Vendors: <Vendors />,
    Rfp: <Rfp />,
    Users: <Users />,
    Categories: <Categories />
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar menuItems={menuItems} setChild={setChild} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 bg-gray-100">
          {componentMap[child]}
        </main>
        <footer className="bg-white border-t p-4 text-sm text-gray-500 flex justify-between">
          <div>2022 &copy; Copyright.</div>
          <div>
            Support Email: <a href="#">support@velsof.com</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
