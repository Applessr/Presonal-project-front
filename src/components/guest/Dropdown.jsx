import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth-store";

const Dropdown = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);

  const hdlMouseEnter = () => {
    setIsOpen(true);
  };

  const hdlMouseLeave = () => {
    setIsOpen(false);
  };

  const hdlIsLogin = (where) => {
    if (!user) {
      document.getElementById('login_modal').showModal(); 
    } else {
      navigate(`/user/${where}`); 
    }
  };

  return (
    <div className="relative" onMouseEnter={hdlMouseEnter} onMouseLeave={hdlMouseLeave}>
      <button
        id="dropdownDelayButton"
        className="hover:text-[#156860] dark:hover:text-[#b0dfd1] font-medium text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        ฝึกภาษาสเปน
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDelayButton">
            <li onClick={() => hdlIsLogin("lesson")}>
              <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">บทเรียนภาษาสเปน</span>
            </li>
            <li onClick={() => hdlIsLogin("category")}>
              <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">คำศัพท์</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;