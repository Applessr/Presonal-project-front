import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { login, loginGoogle, register } from "../api/auth";
import { toast } from "react-toastify";
import axios from "axios";


const useAuthStore = create(persist((set) => ({
    user: null,
    token: null,
    isDark: false,
    toggleTheme: () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
        } else {
            htmlElement.classList.add('dark');
            htmlElement.classList.remove('light');
        }
        set((state) => ({ isDark: !state.isDark }));
    },
    actionRegister: async (form) => {
        try {
            const result = await register(form)
            toast.success('register success')
        } catch (err) {
            console.log('Error detail:', err.response.data.message)
            toast.error(err.response.data.message)
        }
    },
    actionLogin: async (form) => {
        try {
            const result = await login(form)
            console.log(result.data.token)
            set({
                user: result.data.user,
                token: result.data.token
            })
            toast.success('Login success')
            return result.data.user.user.role
        } catch (err) {
            console.log('Error detail:', err)
            toast.error(err.response.data.message)
        }
    },
    actionLogout: () => {
        localStorage.clear()
        set({ user: null, token: null })
    },
    loginWithGoogle: async (token) => {
        try {
            const result = await loginGoogle(token);
            console.log(result.data.token);
            set({
                user: result.data.user,
                token: result.data.token
            });
            console.log("User after login:", result.data.user);
            console.log("Token after login:", result.data.token);
            toast.success('Login success');
        } catch (err) {
            console.log('Error detail:', err.response.data.message);
            toast.error(err.response.data.message);
        }
    },

}), {
    name: 'auth-store',
    storage: createJSONStorage(() => localStorage)
}));

export default useAuthStore