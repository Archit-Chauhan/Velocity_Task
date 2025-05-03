import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

import DashboardVendors from './vendor_pages/DashboardVendors.jsx';
import VendorRfps from './vendor_pages/VendorRfps.jsx';

const VendorDashboard = () => {
  const [child, setChild] = useState('Dashboard');

  const menuItems = [
    { label: 'Dashboard', icon: 'mdi mdi-file-document-box-outline', path: 'Dashboard' },
    { label: 'RFP Lists', icon: 'mdi mdi-flip-vertical', path: 'VendorRfps' },
  ];

  const componentMap = {
    Dashboard: <DashboardVendors />,
    VendorRfps: <VendorRfps />,
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar menuItems={menuItems} setChild={setChild} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 bg-gray-100">
          componentMap[child]
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

export default VendorDashboard;
