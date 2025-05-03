import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://rfpdemo.velsof.com/api/vendorlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.response === 'success') {
        setVendors(response.data.vendors);
      }
    } catch (error) {
      console.error('Error fetching vendor list:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    
    fetchVendors();
  }, []);

  const handleApprove = async (vendorId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        "https://rfpdemo.velsof.com/api/rfp/approveVendor",{
        params :{ "User ID": vendorId, "Status": "approved"},
        headers: {
          Authorization: `Bearer ${token}`}
      }
      );
      if (res.data.response === 'success') {
        toast.success('Vendor approved successfully');
        fetchVendors();
      } else {
        toast.error(res.data.errors);
      }
    } catch (err) {
      toast.error('Approval error');
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Vendors List</h2>
        <nav className="text-sm text-gray-600">
          <span>Home</span> / Vendors
        </nav>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h4 className="text-lg font-medium mb-4">Vendors</h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto max-h-[50vh]">
            <table className="min-w-full divide-gray-200 text-sm py-2">
              <thead className="bg-[#27333a] text-white">
                <tr>
                  <th className="px-4 py-2 text-left">S. No.</th>
                  <th className="px-4 py-2 text-left">First Name</th>
                  <th className="px-4 py-2 text-left">Last Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Contact No</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, index) => (
                  <tr key={vendor.user_id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{vendor.name.split(" ")[0]}</td>
                    <td className="px-4 py-2">{vendor.name.split(" ")[1]}</td>
                    <td className="px-4 py-2">{vendor.email}</td>
                    <td className="px-4 py-2">{vendor.mobile}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                          vendor.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : vendor.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      {vendor.status !== 'Approved' && (
                        <button
                          className="px-4 py-2 text-sm italic text-green-500 font-normal"
                          onClick={() => handleApprove(vendor.user_id)}
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;
