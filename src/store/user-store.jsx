import { create } from "zustand";
import { getUserPro, lesson, upDateUserPro } from "../api/user";
import { persist, createJSONStorage } from "zustand/middleware"; 

const useUserStore = create(persist((set) => ({
      lesson: [],
      lessonId: null,
      userProfile:'',
      getAllLesson: async (token) => {
        console.log('getAllLesson')
        try {
          const res = await lesson(token);
          console.log("Response data:", res.data); 
          set({ lesson: res.data });
        } catch (err) {
          console.log("Error detail:", err.response?.data?.message);
        }
      },
      getLesson: async (token) => {
        try {
          const res = await lesson(token);
          console.log(res)
          set({ lesson: res.data }); 
        } catch (err) {
          console.log("Error detail:", err.response?.data?.message);
          toast.error(err.response?.data?.message);
        }
      },
      getUserInformation: async (token) => {
        try {
          const res = await getUserPro(token);
          console.log(res)
          set({ userProfile: res.data }); 
        } catch (err) {
          console.log("Error detail:", err.response?.data?.message);
          toast.error(err.response?.data?.message);
        }
      },
      upDateUserProfile: async (token, body) => {
        try {
          const res = await upDateUserPro(token, body);
          return res; 
        } catch (err) {
          console.log("Error detail:", err.response?.data?.message || err.message); 
          toast.error(err.response?.data?.message || 'An unexpected error occurred');
          throw err; 
        }
      }
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }));

export default useUserStore;