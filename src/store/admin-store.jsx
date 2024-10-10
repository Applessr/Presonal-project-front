import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { adminCreateVocab, adminDeleteVocab, adminEditUserRole, adminEditVocab, adminGetUser, adminGetVocabulary } from "../api/admin";



const useAdminStore = create(persist((set) => ({
    userInfo: [],
    adminVocab: [],
    allScore: [],
    adminGetUserInfo: async (token) => {
        try {
            const result = await adminGetUser(token);
            set({ userInfo: result.data });
            console.log(result.data, 'adminGetUserInfo');
        } catch (err) {
            console.log('Error detail:', err.response.data.message || err.message);
        }
    },
    adminUpdateUserRole: async (token,id,body) => {
        try {
            const result = await adminEditUserRole(token,id,body);
            console.log(result.data, 'adminUpdateUserRole');
        } catch (err) {
            console.log('Error detail:', err.response.data.message || err.message);
        }
    },
    adminVocabulary: async (token,categoryId) => {
        try {
            const result = await adminGetVocabulary(token,categoryId);
            set({ adminVocab: result.data });
            console.log(result, 'adminGetVocabulary');
        } catch (err) {
            console.log('Error detail:', err.response?.data?.message || err.message);
        }
    },
    adminCreateVocabulary: async (token,categoryId,body) => {
        try {
            const result = await adminCreateVocab(token,categoryId,body);
            console.log(result.data, 'adminCreateVocabulary');
        } catch (err) {
            console.log('Error detail:', err.response?.data?.message || err.message);
        }
    },
    adminDeleteVocabulary: async (token,vocabularyId) => {
        try {
            const result = await adminDeleteVocab(token,vocabularyId);
            console.log(result, 'adminDeleteVocabulary');
        } catch (err) {
            console.log('Error detail:', err.response?.data?.message || err.message);
        }
    },
    adminEditVocabulary: async (token,vocabularyId, body) => {
        try {
            const result = await adminEditVocab(token,vocabularyId, body);
            console.log(result, 'adminEditVocabulary');
        } catch (err) {
            console.log('Error detail:', err.response?.data?.message || err.message);
        }
    },

}), {
    name: 'admin-store',
    storage: createJSONStorage(() => localStorage)
}));

export default useAdminStore