import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { currentUser, login, loginGoogle, register } from "../api/auth";
import { toast } from "react-toastify";


const useAuthStore = create(persist((set) => ({
    user: null,
    token: null,
    isDark: false,
    role: '',
    subscriptionStatus: '',
    errorLogin: '',
    errorRegister: '',
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
        set({ errorRegister: '' })
        try {
            const result = await register(form)
            toast.success('register success')
        } catch (err) {
            console.log('Error detail:', err.response.data.message)
            set({ errorRegister: err.response.data.message })
            toast.error(err.response.data.message)
        }
    },
    actionLogin: async (form) => {
        set({ errorLogin: '' });
        try {
            const result = await login(form)
            console.log(result.data.token)
            set({
                user: result.data.user,
                token: result.data.token
            })
            toast.success('Login success')
            return result.data
        } catch (err) {
            console.log('Error detail:', err)
            set({ errorLogin: err.response.data.message })
            toast.error(err.response.data.message)
        }
    },
    actionLogout: () => {
        localStorage.clear()
        set({ user: null, token: null, subscriptionStatus: '', })
    },
    currentUserStore: async (token) => {
        try {
            const result = await currentUser(token);
            console.log(result,'result')
            set({
                role: result.data.member.role,
                subscriptionStatus: result.data.member.Subscription?.status
            })
            return result
        } catch (err) {
            console.log('Error detail:', err)
        }
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
    clearError: () => {
        set({ errorLogin: '' }),
        set({ errorRegister: '' })
    }
}), {
    name: 'auth-store',
    storage: createJSONStorage(() => localStorage)
}));

export default useAuthStore