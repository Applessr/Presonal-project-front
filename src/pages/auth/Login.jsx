import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth-store';
import validateLogin from '../../utils/loginvalidator';
import LoginGoogle from './LoginGoogle';


const initialState = {
  identifier: "",
  password: ""
};

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useAuthStore((state) => state.actionLogin);
  const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus);
  const isDark = useAuthStore((state) => state.isDark);
  const currentUserStore = useAuthStore((state) => state.currentUserStore);
  const errorLogin = useAuthStore((state) => state.errorLogin);
  const clearError = useAuthStore((state) => state.clearError);

  console.log("subscriptionStatus",subscriptionStatus)

  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const hdlIsRegister = () => {
    document.getElementById('login_modal').close();
    setFormErrors({});
    clearError();
    navigate('/register');
  };
  const hdlForgetPass = () => {
    document.getElementById('login_modal').close();
    setFormErrors({});
    clearError();
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
    const validationErrors = validateLogin(form)
    if (validationErrors) {
      return setFormErrors(validationErrors);
    }
    const data = await actionLogin(form);
    const role = data.user.user.role

    if (role) {
      const result = await currentUserStore(data.token); 
      
      if (role === 'ADMIN') {
      navigate('/admin')
    } else if (result.data.member.Subscription?.status !== 'ACTIVE') {
      navigate('/user')
    } else {
      navigate('/subscript')
    }
    
    }
    setForm(initialState);
    setFormErrors({});
  };

  const closeModal = () => {
    document.getElementById('login_modal').close()
    setFormErrors({});
    clearError(); 
};

  return (
    <div>
      <button className="border-2 border-[#22A094] p-1 rounded-md hover:bg-[#E2FAF8] dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49]"
        onClick={()=>document.getElementById('login_modal').showModal()}>เข้าสู่ระบบ</button>
      <dialog id="login_modal" className="modal">
        <div className="modal-box dark:bg-[#2c2c2a] text-[#6e6e6ec8] dark:text-[#e7f4ef]">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute text-xl right-2 top-2">✕
          </button>
          <div className="mx-auto w-36 mt-12">
            {isDark
              ? <img src="https://i.imgur.com/T8gF1pT.png" alt="External Logo" />
              : <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />}
          </div>
          <div>
            <form onSubmit={hdlSubmit} className="flex flex-col mx-20">
              <span className=" mt-6">ชื่อผู้ใช้ หรือ อีเมล</span>
              <input
                className="border-2 text-black dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49] border-[#6e6e6ec1] p-2 rounded-md focus:outline-none focus:border-[#22A094] transition duration-200"
                type="text"
                name="identifier"
                value={form.identifier}
                onChange={hdlOnChange}
              />
              {formErrors.identifier && (
                <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">Username or Email is require</div>
              )}
                 {errorLogin && !formErrors.identifier  && !errorLogin.includes('Password') && (
                <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">
                  email or username you entered was not found. Please try again.
                </div>
              )}
              <span className=" mt-6">รหัสผ่าน</span>
              <input
                className="border-2 text-black dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49] border-[#6e6e6ec1] p-2 rounded-md focus:outline-none focus:border-[#22A094] transition duration-200"
                type="password"
                name="password"
                value={form.password}
                onChange={hdlOnChange}
              />
              {formErrors.password && (
                <div className="text-left text-red-500 text-sm dark:text-[#DB5252]">{formErrors.password}</div>
              )}
              { typeof errorLogin === 'string'&& errorLogin.includes('Password') && !formErrors.password  && (
                <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">
                  {errorLogin}
                </div>
              )}
              <button className="mt-10 border-2 text-[#22A094] dark:border-[#e7f4ef]  dark:hover:bg-[#e7f4ef49] border-[#22A094] rounded-md p-2 hover:bg-[#E2FAF8] dark:text-[#e7f4ef]">เข้าสู่ระบบ</button>
            </form>
          </div>
          <div className="divider">OR</div>
          <LoginGoogle />
          <div className="mx-20 mb-8 flex justify-center mt-4">
            <span onClick={hdlForgetPass} className='text-[#22A094] dark:text-[#45bcb0] cursor-pointer'> ลืมรหัสผ่านใช่หรือไม่ </span>
            <span className=" ml-4 cursor-pointer" onClick={hdlIsRegister}>
              ยังไม่มีบัญชี <span className="text-[#22A094] dark:text-[#45bcb0]"> ลงทะเบียน </span>
            </span>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Login;