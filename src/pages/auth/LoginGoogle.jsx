import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import useAuthStore from '../../store/auth-store';
import { useNavigate } from 'react-router-dom';

const LoginGoogle = () => {
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token); 

    await loginWithGoogle(token); 
    document.getElementById('login_modal').close();
    console.log(decoded);

    if (token) {
      navigate('/user'); 
    } else {
      navigate('/'); 
    }
  };

  return (
    <GoogleOAuthProvider clientId ={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className='m-auto w-[19rem] border rounded-lg'>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
