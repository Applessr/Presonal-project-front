import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createScore, getAllUserScore, getOneScore, redoScore, userProgress } from "../api/progress";


const useProgressStore = create(persist((set) => ({
    allProgress: [],
    thisLessonScore: [],
    allScore: [],
    getUserAllProgress: async (token) => {
        try {
            const result = await userProgress(token);
            set({ allProgress: result.data });
            console.log(result.data, 'getUserAllProgress');
        } catch (err) {
            if (err.response) {
                console.log('Error detail:', err.response.data.message);
            } else {
                console.log('Error:', err.message);
            }
        }
    },
    getAllUser: async (token, lessonId) => {
        try {
            const result = await getAllUserScore(token, lessonId);
            set({ allScore: result.data });
            console.log(result.data, 'getAllUser');
        } catch (err) {
            console.error('Error detail:', err.response ? err.response.data.message : err.message);
        }
    },
    getOneScore: async (token, lessonId) => {
        try {
            const result = await getOneScore(token, lessonId);
            set({ thisLessonScore: result.data });
            console.log(result.data, 'getOneScore');
        } catch (err) {
            console.error('Error detail:', err.response ? err.response.data.message : err.message);
        }
    },
    createUserScore: async (token, lessonId, score) => {
        try {
            const result = await createScore(token, lessonId, score)
            console.log(result.data)  
            } catch (err) {
            console.log('Error detail:', err.response.data.message)
        }
    },
    redoUserScore: async (token, lessonId, score) => {
        try {
            const result = await redoScore(token, lessonId, score)
            console.log(result.data)
        } catch (err) {
            console.log('Error detail:', err.response.data.message)
        }
    },
    clearProgress: () => {
        set({ allProgress: [] });
    }
}), {
    name: 'progress-store',
    storage: createJSONStorage(() => localStorage)
}));

export default useProgressStore