import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Topbar = () => {
 const navigate = useNavigate();
    const name = localStorage.getItem("name").split(" ")[0];
    const handleLogout = () =>{
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/");
    }
    return (
      <header className="bg-white shadow-md w-full flex justify-end items-center px-6 py-3 gap-3">
        <div>
          <h1 className="text-sm">Welcome {name}</h1>
        </div>
        <div>
          <button href="#" className="text-blue-600 font-normal" onClick={()=>{handleLogout()}}>Logout</button>
        </div>
      </header>
    );
  };

export default Topbar;