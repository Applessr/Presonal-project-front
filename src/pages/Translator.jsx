import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useTranslateStore from '../store/translate-store';
import WordDay from '../components/WordDay';
import Footer from '../components/Footer';
import { FaRegCopy } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AiOutlineSound } from "react-icons/ai";


const Translator = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialText = params.get('text') || '';
  const initialSourceLang = params.get('sourceLang') || 'th';
  const initialTargetLang = params.get('targetLang') || 'es';

  const [inputText, setInputText] = useState(initialText);
  const [sourceLang, setSourceLang] = useState(initialSourceLang);
  const [targetLang, setTargetLang] = useState(initialTargetLang);
  const { translatedText, translateText } = useTranslateStore();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputText) {
        translateText(inputText, sourceLang, targetLang);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [inputText, sourceLang, targetLang, translateText]);

  const handleClear = () => {
    setInputText('');
  };

  const listenToTranslation = () => {
    const word = new SpeechSynthesisUtterance(translatedText);

    word.lang = targetLang === 'es' ? 'es-ES' : 'th-TH'; 

    speechSynthesis.speak(word);
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText)
      .then(() => toast.success("คัดลอกข้อความเรียบร้อย"))
      .catch(err => toast.error("ไม่สามารถคัดลอกข้อความได้"));
  };

  return (
    <div className="w-full min-h-screen text-center text-[#22A094]">
      <div className='flex justify-center'>
        <div className='w-[50%] bg-[#E2FAF8] dark:bg-[#6E6E6E] dark:text-[#e7f4ef] rounded-lg mt-24'>
          <div className='flex gap-4 m-4'>
            <label htmlFor="sourceLang" className="text-2xl mb-2">ภาษาต้นทาง:</label>
            <select
              id="sourceLang"
              className="p-2 rounded-md border border-gray-300 text-black"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              <option value="th">ไทย</option>
              <option value="es">สเปน</option>
              <option value="en">อังกฤษ</option>
            </select>
          </div>
          <textarea
            id="inputText"
            placeholder="กรอกข้อความที่นี่"
            className="w-[95%] h-40 text-2xl p-4 text-black dark:text-[#e7efeb] bg-[#E2FAF8] dark:bg-[#6E6E6E] rounded-md border-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          <div className='flex justify-end mr-10 mb-6'>
            <button onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-10'>
        <div className='w-[50%] bg-[#E2FAF8] dark:bg-[#6E6E6E] dark:text-[#e7f4ef] rounded-lg'>
          <div className='flex gap-4 m-4'>
            <label htmlFor="targetLang" className="text-2xl mb-2">ภาษาปลายทาง:</label>
            <select
              id="targetLang"
              className="p-2 rounded-md border text-black border-gray-300"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              <option value="es">สเปน</option>
              <option value="th">ไทย</option>
              <option value="en">อังกฤษ</option>
            </select>
          </div>
          <textarea
            id="translatedText"
            className="w-[95%] h-40 text-2xl p-4 text-black dark:text-[#e7efeb] bg-[#E2FAF8] dark:bg-[#6E6E6E] rounded-md border-none"
            value={translatedText}
            readOnly
          ></textarea>

          <div className='flex m-10 gap-5 items-baseline'>
            <span
              className='w-12 h-12 rounded-full flex items-center justify-center active:bg-slate-300 '
              onClick={copyToClipboard}
            >
              <FaRegCopy className='w-8 h-8' />
            </span>
            <span
              className='w-12 h-12 rounded-full flex items-center justify-center active:bg-slate-300 '
              onClick={listenToTranslation}
            >
             <AiOutlineSound className='w-9 h-9' />
            </span>
          </div>
        </div>
      </div>

      <WordDay />
      <Footer />
    </div>
  );
};

export default Translator
