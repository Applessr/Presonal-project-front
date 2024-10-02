import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const TranslatorInput = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        navigate(`/translate?text=${encodeURIComponent(inputValue)}&sourceLang=th&targetLang=es`);
      }
    };
  
    return (
      <div>
        <input
          className='w-[40rem] p-4 pl-16 rounded-md border-none shadow-md bg-no-repeat bg-[length:20px] bg-[url("https://www.svgrepo.com/show/522266/search.svg")] bg-[position:12px_center] focus:outline-none'
          type="text"
          placeholder='แปลภาษาไทย หรือภาษาสเปน'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
}

export default TranslatorInput
