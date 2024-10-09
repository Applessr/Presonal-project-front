import { create } from "zustand";
import { allVocab, allVocabCategory, createFavorite, createSearch, deleteFavorite, deleteSearch, deleteUserPro, getFavorite, getLessonById, getUserPro, lesson, searchTerm, upDateUserPro, vocabulary } from "../api/user";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";

const useUserStore = create(persist((set, get) => ({
  lesson: [],
  lessonName: '',
  questions: [],
  userProfile: '',
  category: [],
  allVocabulary: [],
  vocabulary: [],
  wordOfTheDay: [],
  searchHis: [],
  favorite: [],
  getSearTerm: async (token) => {
    try {
      const result = await searchTerm(token);
      console.log("getSearTerm data:", result.data);
      set({ searchHis: result.data || [] });
    } catch (err) {
      console.log("Error getAllLesson detail:", err.response?.data?.message);
    }
  },
  createSearch: async (token, inputValue) => {
    try {
      const result = await createSearch(token, inputValue);
      console.log("createSearch data:", result.data);
      getSearTerm();
    } catch (err) {
      console.log("Error createSearch detail:", err.response?.data?.message);
    }
  },
  clearSearchHis: () => {
    set({ searchHis: [] })
  },
  deleteSearch: async (token, id) => {
    try {
      const result = await deleteSearch(token, id);
      console.log("deleteSearch data:", result.data);
      getSearTerm();
    } catch (err) {
      console.log("Error deleteSearch detail:", err.response?.data?.message);
    }
  },
  getAllLesson: async (token) => {
    console.log('getAllLesson');
    try {
      const result = await lesson(token);
      console.log("Response data:", result.data);
      set({ lesson: result.data });
    } catch (err) {
      console.log("Error getAllLesson detail:", err.response?.data?.message);
    }
  },
  getLessonId: async (token,id) => {
    console.log('getLessonIb');
    try {
      const result = await getLessonById(token,id);
      console.log("Response data:", result.data.questions);
      set({ lessonName: result.data.lessonName});
      set({ questions: result.data.questions});
    } catch (err) {
      console.log("Error getAllLesson detail:", err.response?.data?.message);
    }
  },

  getVocabCategory: async (token) => {
    console.log('getCategory');
    try {
      const result = await allVocabCategory(token);
      console.log(result);
      set({ category: result.data });
    } catch (err) {
      console.log("Error getCategory detail:", err.response?.data?.message);
    }
  },

  getAllVocab: async () => {
    console.log('getAllVocab');
    try {
      const result = await allVocab();
      console.log(result);
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
      const result = await vocabulary(token, categoryId);
      console.log(result);
      set({ vocabulary: result.data });
    } catch (err) {
      console.log("Error getCategory detail:", err.response?.data?.message);
    }
  },

  getUserInformation: async (token) => {
    try {
      const result = await getUserPro(token);
      console.log(result);
      set({ userProfile: result.data });
    } catch (err) {
      console.log("Error getUserInformation detail:", err.response?.data?.message);
    }
  },

  upDateUserProfile: async (token, body) => {
    try {
      const result = await upDateUserPro(token, body);
      return result;
    } catch (err) {
      console.log("Error upDateUserProfile detail:", err.response?.data?.message || err.message);
    }
  },

  deleteUserProfile: async (token) => {
    try {
      const result = await deleteUserPro(token);
      return result;
    } catch (err) {
      console.log("Error deleteUserProfile detail:", err.response?.data?.message || err.message);
    }
  },

  getFavoriteVocab: async (token) => {
    try {
      const result = await getFavorite(token);
      set({ favorite: result.data });
    } catch (err) {
      console.log("Error getFavoriteVocab detail:", err.response?.data?.message || err.message);
    }
  },

  createFavoriteVocab: async (token, id) => {
    try {
      await createFavorite(token, id);
    } catch (err) {
      console.log("Error createFavoriteVocab detail:", err.response?.data?.message || err.message);
    }
  },

  deleteFavoriteVocab: async (token, vocabId) => {
    try {
      const result = await deleteFavorite(token, vocabId);
    } catch (err) {
      console.log("Error deleteFavoriteVocab detail:", err.response?.data?.message || err.message);
    }
  },
}),
  {
    name: "user-store",
    storage: createJSONStorage(() => localStorage),
  }));

export default useUserStore;