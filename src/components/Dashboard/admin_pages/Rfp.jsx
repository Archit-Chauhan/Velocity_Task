import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';


const Rfp = () => {
  const[step,setStep] = useState('list');
  const [categorySelected, setCategorySelected] = useState('');
  const componentMap = {
    list: <List setStep={setStep}/>,
    selectCategory: <SelectCategory setStep={setStep} setCategorySelected={setCategorySelected}/>,
    addRfp:<AddRfp categorySelected={categorySelected} setStep={setStep}/>

  };
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-4">RFP List</h2>
        <h3>Home/RFP Quotes</h3>
      </div>
      <div className="bg-white rounded-md shadow px-6 py-4 text-gray-700">
        
        <div>
      {componentMap[step]}
        </div>
        
      </div>
    </div>
  );
}

export default Rfp





const List = ({setStep}) => {
  const[loading,setLoading] = useState(true);
  const[rfp,setRfp] = useState([]);

  useEffect(()=>{
      const fetchRfp = async () => {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');
          const response = await axios.get('https://rfpdemo.velsof.com/api/rfp/getrfp/2',
           {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params:{
              userId
            }
           }
          );
          if (response.data.response === 'success') {
            setRfp(response.data.rfps);
            
          }
        } catch (error) {
          console.error('Error fetching vendor list:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRfp();
    }
  ,[])
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-medium mb-4">RFP</h4>
        <button
          className="text-white bg-green-500 p-2 rounded-md"
          onClick={() => {
            setStep("selectCategory");
          }}
        >
          + Add RFP
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto max-h-[50vh]">
          <table className="w-full">
            <thead className="bg-[#27333a] text-white ">
              <tr>
                <th className="px-4 py-2 text-left">RFP NO.</th>
                <th className="px-4 py-2 text-left">RFP Title</th>
                <th className="px-4 py-2 text-left">RFP Last Date</th>
                <th className="px-4 py-2 text-left">Min Amount</th>
                <th className="px-4 py-2 text-left">Max Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {rfp.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.rfp_no}</td>
                  <td className="px-4 py-2">{item.item_name}</td>
                  <td className="px-4 py-2">{item.last_date}</td>
                  <td className="px-4 py-2">{item.minimum_price}</td>
                  <td className="px-4 py-2">{item.maximum_price}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                        item.rfp_status === "open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.rfp_status}
                    </span>
                  </td>

                  <td
                    className={`px-4 py-2 italic ${
                      item.rfp_status === "closed"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {item.rfp_status === "closed" ? "open" : "close"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}



const SelectCategory = ({setStep,setCategorySelected}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://rfpdemo.velsof.com/api/categories',
        );
        if (response.data.response === 'success') {
          setCategories(Object.values(response.data.categories));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='relative h-[45vh]'>
      <h4 className="text-md font-semibold mb-2">Select Category</h4>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <select size={8} className="border border-gray-300 rounded p-2 w-1/2">
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} onClick={()=>{setCategorySelected(cat.id);}}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
      <div className="absolute bottom-0 right-0 flex justify-between items-center gap-2">
        <button
          className="text-white bg-blue-500 py-2 rounded-md px-4"
          onClick={() => {
            setStep("addRfp");
          }}
        >
          Submit
        </button>
        <button
          className="text-white bg-gray-400 py-2 rounded-md px-4"
          onClick={() => {
            setStep("list");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};



const AddRfp = ({ setStep,categorySelected }) => {
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    item_name: '',
    rfp_no: '',
    quantity: '',
    last_date: '',
    minimum_price: '',
    maximum_price: '',
    categories:categorySelected,
    vendors: vendors,
    item_description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://rfpdemo.velsof.com/api/vendorlist/${categorySelected}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params:{
              "Category ID":categorySelected
            }
          }
        );
        if (response.data.response === 'success') {
          setVendors(response.data.vendors);
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(vendors);
    try {
      const token = localStorage.getItem('token');

      const payload = {
        ...formData,
        categories: categorySelected,
        vendors: vendors.map(v=>v.user_id).join(',')
      };

      const response = await axios.post(
        'https://rfpdemo.velsof.com/api/createrfp',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response)
      if (response.data.response === 'success') {
        toast.success('RFP Created Successfully');
        setStep('list');
      } else {
        toast.error(response.data?.errors[0] || "Failed to create RFP");
      }
    } catch (err) {
      
      toast.error('Error submitting RFP');
    } finally {
      setLoading(false);
    }
  };

  const Label = ({ text }) => (
    <label className="block font-medium mb-1">
      {text}
      <span className="text-red-600 ml-1">*</span>
    </label>
  );

  console.log(categorySelected);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-lg font-semibold mb-4">Create RFP</h4>

      <div>
        <Label text="Item Name" />
        <input name="item_name" value={formData.item_name} onChange={handleChange} className="border p-2 w-full"  />
      </div>

      <div>
        <Label text="RFP No." />
        <input name="rfp_no" value={formData.rfp_no} onChange={handleChange} className="border p-2 w-full"  />
      </div>

      <div>
        <Label text="Quantity" />
        <input name="quantity" value={formData.quantity} onChange={handleChange} type="number" className="border p-2 w-full"  />
      </div>

      <div>
        <Label text="Last Date" />
        <input name="last_date" value={formData.last_date} onChange={handleChange} placeholder="YYYY-MM-DD HH:mm:ss" className="border p-2 w-full"  />
      </div>

      <div>
        <Label text="Minimum Price" />
        <input name="minimum_price" value={formData.minimum_price} onChange={handleChange} type="number" className="border p-2 w-full"  />
      </div>

      <div>
        <Label text="Maximum Price" />
        <input name="maximum_price" value={formData.maximum_price} onChange={handleChange} type="number" className="border p-2 w-full"  />
      </div>

      <div>
        <Label text="Vendors" />
        <select multiple onChange={(e) => handleMultiSelectChange(e, 'vendors')} className="border p-2 w-full" >
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label text="Item Description" />
        <textarea name="item_description" value={formData.item_description} onChange={handleChange} className="border p-2 w-full"  />
      </div>

      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Submitting...' : 'Submit RFP'}
        </button>
        <button
          type="button"
          onClick={() => setStep('list')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};


