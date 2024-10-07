import { create } from "zustand";
import { allVocab, category, deleteUserPro, getUserPro, lesson, upDateUserPro, vocabulary } from "../api/user";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";

const useUserStore = create(persist((set, get) => ({
  lesson: [],
  lessonId: null,
  userProfile: '',
  category: [],
  allVocabulary: [],
  vocabulary: [],
  wordOfTheDay: [],

  getAllLesson: async (token) => {
    console.log('getAllLesson');
    try {
      const res = await lesson(token);
      console.log("Response data:", res.data);
      set({ lesson: res.data });
    } catch (err) {
      console.log("Error getAllLesson detail:", err.response?.data?.message);
    }
  },

  getCategory: async (token) => {
    console.log('getCategory');
    try {
      const res = await category(token);
      console.log(res);
      set({ category: res.data });
    } catch (err) {
      console.log("Error getCategory detail:", err.response?.data?.message);
    }
  },

  getAllVocab: async (token) => {
    console.log('getAllVocab');
    try {
      const res = await allVocab(token);
      console.log(res);
      set({ allVocabulary: res.data });
      getRandomWord();
    } catch (err) {
      console.log("Error getAllVocab detail:", err.response?.data?.message);
    }
  },

  getRandomWord: () => {
    const { allVocabulary } = get();
    const lastDate = localStorage.getItem('lastRandomDate');
    const today = new Date().toISOString().split('T')[0]; 

    if (allVocabulary.length > 0 && lastDate !== today) {
      const randomIndex = Math.floor(Math.random() * allVocabulary.length);
      const randomWord = allVocabulary[randomIndex];
      set({ wordOfTheDay: randomWord });
      localStorage.setItem('lastRandomDate', today); 
    } 
  },

  getVocabulary: async (token, categoryId) => {
    console.log('getCategory');
    try {
      const res = await vocabulary(token, categoryId);
      console.log(res);
      set({ vocabulary: res.data });
    } catch (err) {
      console.log("Error getCategory detail:", err.response?.data?.message);
    }
  },

  getUserInformation: async (token) => {
    try {
      const res = await getUserPro(token);
      console.log(res);
      set({ userProfile: res.data });
    } catch (err) {
      console.log("Error getUserInformation detail:", err.response?.data?.message);
    }
  },

  upDateUserProfile: async (token, body) => {
    try {
      const res = await upDateUserPro(token, body);
      return res;
    } catch (err) {
      console.log("Error upDateUserProfile detail:", err.response?.data?.message || err.message);
    }
  },

  deleteUserProfile: async (token) => {
    try {
      const res = await deleteUserPro(token);
      return res;
    } catch (err) {
      console.log("Error deleteUserProfile detail:", err.response?.data?.message || err.message);
    }
  }
}),
  {
    name: "user-store",
    storage: createJSONStorage(() => localStorage),
  }));

export default useUserStore;