import { create } from "zustand";

const apiKey = import.meta.env.VITE_API_KEY;

const useTranslateStore = create((set) => ({
  detectedLanguage: '',
  translatedText: '',
  error: null,

  detectLanguage: async (text) => {
    const url = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
    const data = { q: text };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const detectedLang = result.data.detections[0][0].language;
      set({ detectedLanguage: detectedLang });
      return detectedLang;
    } catch (error) {
      console.error('Error detecting language:', error);
      set({ error });
    }
  },

  translateText: async (text, sourceLang, targetLang) => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const data = {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const translated = result.data.translations[0].translatedText;
      set({ translatedText: translated });
      return translated;
    } catch (error) {
      console.error('Error translating text:', error);
      set({ error });
    }
  },
}));

export default useTranslateStore;