import { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
      setIsOpen(true);
    };
  
  
    const handleMouseLeave = () => {
      setIsOpen(false);
    };
  
  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <button
      id="dropdownDelayButton"
      className="hover:text-[#156860] font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center "
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
      <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownDelayButton"
        >
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              บทเรียนภาษาสเปน
            </Link>
          </li>
          <li>
            <Link
              to="/mainvocap"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              คำศัพท์
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              รายการโปรด
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>
  )
}

export default Dropdown
