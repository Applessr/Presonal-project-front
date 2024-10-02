import axios from 'axios'


export const register = (form) => 
    axios.post('http://localhost:5000/auth/register',form);

export const login = (form) => 
    axios.post('http://localhost:5000/auth/login',form);

export const currentUser = (token) => {
    return axios.post('http://localhost:5000/auth/current-user',{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
