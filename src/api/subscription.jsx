import axios from "axios";

export const createSubscription = (token, plan, omiseToken) => {
    return axios.post('http://localhost:5000/subscription/charge-credit', { plan, token: omiseToken }, {
        headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json" 
        }
    });
};
export const createBankSubscription = (token, plan, omiseToken) => {
    return axios.post('http://localhost:5000/subscription/charge-bank', { plan, token: omiseToken }, {
        headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json" 
        }
    });
}