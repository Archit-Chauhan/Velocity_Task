import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const RegisterVendors = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    revenue: '',
    no_of_employees: '',
    gst_no: '',
    pancard_no: '',
    mobile: '',
    category: [],
  });

  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://rfpdemo.velsof.com/api/categories',
        );
        if (response.data.response === 'success') {
          setCategories(Object.values(response.data.categories));
          console.log(response.data.categories);
        }
      } catch (error) {
        toast.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const selected = Array.from(selectedOptions).map(option => option.value);
      setFormData({ ...formData, category: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      toast.warn('Passwords do not match.');
      return;
    }

    try {
      const payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        revenue: formData.revenue,
        no_of_employees: formData.no_of_employees,
        category: formData.category.join(','),
        pancard_no: formData.pancard_no,
        gst_no: formData.gst_no,
        mobile: formData.mobile,
      };

      const response = await axios.post('https://rfpdemo.velsof.com/api/registervendor', payload);
      if (response.data.response === 'success') {
        toast.success('Registration successful!');
        navigate("/login");
        
      } else {
        toast.error('Registration failed. ' + (response.data.error?.[0] || ''));
      }
    } catch (error) {
      toast.error(
        "Error: " +
          (error.response?.data?.error?.[0] || "Something went wrong.")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-100 p-6">
          <h2 className="text-2xl font-semibold text-blue-600">Welcome to RFP System!</h2>
          <p className="text-blue-600">Register as Vendor</p>
        </div>
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First name*</label>
                <input name="firstname" value={formData.firstname} onChange={handleChange} type="text" placeholder="Enter Firstname" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last name*</label>
                <input name="lastname" value={formData.lastname} onChange={handleChange} type="text" placeholder="Enter Lastname" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Email*</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Enter Email" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password*</label>
                <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Enter Password" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password*</label>
                <input name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} type="password" placeholder="Enter Confirm Password" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Revenue (Last 3 Years in Lacks)*</label>
                <input name="revenue" value={formData.revenue} onChange={handleChange} type="text" placeholder="Enter Revenue" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">No of Employees*</label>
                <input name="no_of_employees" value={formData.no_of_employees} onChange={handleChange} type="text" placeholder="No of Employees" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">GST No*</label>
                <input name="gst_no" value={formData.gst_no} onChange={handleChange} type="text" placeholder="Enter GST No" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">PAN No*</label>
                <input name="pancard_no" value={formData.pancard_no} onChange={handleChange} type="text" placeholder="Enter PAN No" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone No*</label>
                <input name="mobile" value={formData.mobile} onChange={handleChange} type="text" placeholder="Enter Phone No" className="mt-1 block w-full border border-gray-300 rounded-md p-2"  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Categories*</label>
                <select name="category" multiple value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button type="submit" className=" bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Register</button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-600">
        &copy;Copyright ❤ RFP System
      </div>
    </div>
  );
};

export default RegisterVendors;
