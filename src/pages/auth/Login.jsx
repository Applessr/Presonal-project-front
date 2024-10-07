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
  const navigate = useNavigate();
  const actionLogin = useAuthStore((state) => state.actionLogin);
  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const hdlIsRegister = () => {
    document.getElementById('login_modal').close(); 
    navigate('/register'); 
};
  const hdlForgetPass = () => {
    document.getElementById('login_modal').close(); 
    navigate('/forget-password'); 
};

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const error = validateLogin(form)
    if (error) {
      return setFormErrors(error)
    }

    const role = await actionLogin(form);
    if (role) {
      roleRedirect(role)
    }
    toast.success('Login success')
    setForm(initialState);
    setFormErrors({});
  };

  const roleRedirect = (role) => {
    console.log(role)
    if (role === 'ADMIN') {
      navigate('/admin')
    } else {
      navigate('/user')

    }
  }
  
  return (
    <div>
      <button className="border-2 border-[#22A094] p-1 rounded-md hover:bg-[#E2FAF8]"
        onClick={() => document.getElementById('login_modal').showModal()}>เข้าสู่ระบบ</button>
      <dialog id="login_modal" className="modal">
        <div className="modal-box">
          <button
            type="button"
            onClick={e => e.target.closest('dialog').close()}
            className="btn btn-sm btn-circle btn-ghost absolute text-xl right-2 top-2">✕
          </button>
            <div className="flex justify-center mt-12 ">
              <img className='w-36' src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />
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
              <span onClick={hdlForgetPass}> ลืมรหัสผ่านใช่หรือไม่ </span>
              <span className="text-[#6e6e6ec8] ml-4 cursor-pointer" onClick={hdlIsRegister}>
                ยังไม่มีบัญชี <span className="text-[#22A094]"> ลงทะเบียน </span>
              </span>
            </div>
          </div>
      </dialog>
    </div>
  );
}

export default Login;