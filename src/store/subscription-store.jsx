import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createBankSubscription, createSubscription } from "../api/subscription";


const useSubscriptionStore = create(persist((set) => ({
    plan: null,
    hdlSelectPlan: async (plan) => {
        try {
            set({ plan });
            console.log(plan);
        } catch (err) {
            console.error('Error:', err.message);
        }
    },
    createSubscript: async (token, plan, omiseToken) => {
        try {
            const result = await createSubscription(token, plan, omiseToken);
            console.log("Subscription Result:", result); 
            return result; 
        } catch (err) {
            console.error('Error:', err.message);
            throw err; 
        }
    },
    createBankSubscript: async (token, plan, omiseToken) => {
        try {
            const result = await createBankSubscription(token, plan, omiseToken);
            console.log("Subscription Result:", result); 
            return result; 
        } catch (err) {
            console.error('Error:', err.message);
            throw err; 
        }
    },

}), {
    name: 'subscription-store',
    storage: createJSONStorage(() => localStorage)
}));

export default useSubscriptionStore