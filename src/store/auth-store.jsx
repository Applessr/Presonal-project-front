import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { login, register } from "../api/auth";
import { toast } from "react-toastify";


const useAuthStore = create(persist((set)=> ({
    user: null,
    token: null,
    searchTerm: '',
    actionRegister: async(form) => {
        try {
            const res = await register(form)
            toast.success('register success')
        }catch (err) {
            console.log('Error detail:', err.response.data.message)
            toast.error(err.response.data.message)
        }
    },
    actionLogin: async(form) => {
        try{
            const res = await login(form)
            console.log(res.data.token)
            set({
                user: res.data.user,
                token: res.data.token
            })
            toast.success('Login success')
            return res.data.user.user.role
        }catch (err) {
            console.log('Error detail:', err)
            toast.error(err.response.data.message)
        }
    },
    actionLogout: ()=>{
        localStorage.clear()
        set({user: null, token: null })
    },
}),{
    name:'auth-store',
    storage: createJSONStorage(()=> localStorage)
}));

export default useAuthStore