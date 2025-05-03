import  logo  from "../../assets/velocity_logo.png";

const Sidebar = ({ menuItems, setChild }) => {
    return (
      <div className="w-64 bg-[#27343b] border-r h-screen">
        <div className="p-4">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <ul className="p-4 space-y-2">
          {menuItems.map(({ label, icon, path }) => (
            <li key={path}>
              <button
                onClick={() => setChild(path)}
                className="w-full flex items-center m-2 text-left text-[#778c99] hover:text-white"
              >
                <i className={icon}></i>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  