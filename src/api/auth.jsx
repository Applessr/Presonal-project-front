import axios from 'axios'


export const register = (form) => 
    axios.post('http://localhost:5000/auth/register',form);

export const login = (form) => 
    axios.post('http://localhost:5000/auth/login',form);

export const loginGoogle = (token) => 
    axios.post('http://localhost:5000/auth/login/google', { token });

export const forget = (body) => 
    axios.post('http://localhost:5000/auth/forget-password',body);

export const ResetPassword = (token,newPassword) => 
    axios.post('http://localhost:5000/auth/reset-password',{token: token, newPassword: newPassword});

export const currentUser = (token) => {
    return axios.post('http://localhost:5000/auth/current-user',{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};