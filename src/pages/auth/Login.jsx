import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import useAuthStore from '../../store/auth-store';
import validateLogin from '../../utils/loginvalidator';
import { toast } from 'react-toastify';

const initialState = {
  identifier: "",
  password: ""
};

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 
  const actionLogin = useAuthStore((state) => state.actionLogin);
  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const hdlIsRegister = () => {
    setIsOpen(false); 
    navigate('/register'); // ไปที่หน้าลงทะเบียน
  };

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const hdlSubmit = async(e) => {
    e.preventDefault();
    const error = validateLogin(form)
    if(error) {
    return setFormErrors(error)
    }

    const role = await actionLogin(form);
    if(role) {
      roleRedirect(role)
    }
    toast.success('Login success')
    setForm(initialState);
    setFormErrors({});
  };

  const roleRedirect = (role) => {
    console.log(role)
    if(role === 'ADMIN') {
      navigate('/admin')
    }else{
      navigate('/user')

    }
  }


  return (
    <div>
      <button
        className="border-2 border-[#22A094] p-1 rounded-md hover:bg-[#E2FAF8]"
        onClick={toggleModal}
      >
        เข้าสู่ระบบ
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="w-[40%] h-auto overflow-auto rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between mt-12 ">
              <img className='w-36 ml-56' src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />
              <span onClick={toggleModal} className="pr-14">
                <RxCross2 className="w-8 h-8 cursor-pointer" />
              </span>
            </div>
            <div>
              <form onSubmit={hdlSubmit} className="flex flex-col mx-20">
                <span className="text-[#6e6e6ec8] mt-6">ชื่อผู้ใช้ หรือ อีเมล</span>
                <input
                  className="border-2 border-[#6e6e6ec1] p-2 rounded-md focus:outline-none focus:border-[#22A094] transition duration-200"
                  type="text"
                  name="identifier"  
                  value={form.identifier}
                  onChange={hdlOnChange}
                />
                <span className="text-[#6e6e6ec8] mt-6">รหัสผ่าน</span>
                <input
                  className="border-2 border-[#6e6e6ec1] p-2 rounded-md mb-10 focus:outline-none focus:border-[#22A094] transition duration-200"
                  type="password"
                  name="password" 
                  value={form.password}
                  onChange={hdlOnChange}
                />
                <button className="border-2 border-[#22A094] rounded-md p-2 mb-8 hover:bg-[#E2FAF8]">เข้าสู่ระบบ</button>
              </form>
            </div>
            {formErrors.message && (
              <div className="text-red-500 text-center">{formErrors.message}</div>
            )}
            <div className="mx-20 mb-8 flex justify-center">
              <Link to="/"> ลืมรหัสผ่านใช่หรือไม่ </Link>
              <span className="text-[#6e6e6ec8] ml-4 cursor-pointer" onClick={hdlIsRegister}>
                ยังไม่มีบัญชี <span className="text-[#22A094]"> ลงทะเบียน </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;