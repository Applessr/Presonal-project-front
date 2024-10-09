import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth-store';
import { FaTrash } from "react-icons/fa6";
import useUserStore from '../../store/user-store';

const initialState = { searchTerm: '' };

const TranslatorInput = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const getSearTerm = useUserStore((state) => state.getSearTerm);
  const createSearch = useUserStore((state) => state.createSearch);
  const clearSearchHis = useUserStore((state) => state.clearSearchHis);
  const deleteSearch = useUserStore((state) => state.deleteSearch);
  const searchHis = useUserStore((state) => state.searchHis);
  const [inputValue, setInputValue] = useState(initialState);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    if (user === null) {
      clearSearchHis(); 
    } else {
      getSearchHis();
    }
  }, [token]);
  const getSearchHis = async () => {
    try {
      if (user !== null) {
        await getSearTerm(token)
      }
    } catch (err) {
      console.log('Error in getting search history:', err);
    }
  };

  const hdlOnChange = (e) => {
    setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlOnSubmit = async () => {
    if (!inputValue.searchTerm.trim()) {
      console.log('Input is empty');
      return;
    }
    try {
      if (user) {
        await createSearch(token, inputValue);
      }
      
      const url = user
        ? `/user/translate?text=${encodeURIComponent(inputValue.searchTerm)}&sourceLang=th&targetLang=es`
        : `/translate?text=${encodeURIComponent(inputValue.searchTerm)}&sourceLang=th&targetLang=es`;
      
      navigate(url);
      
      setInputValue(initialState);
      setShowHistory(false);
    } catch (err) {
      console.log('error in hdlOnSubmit', err);
    }
  };
  const handleFocus = () => {
    setShowHistory(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowHistory(false);
    }, 200);
  };

  const hdlDelete = async(id) => {
    try {
      await deleteSearch(token, id);
    } catch (err) {
      console.log('error in hdlDelete', err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); hdlOnSubmit(); }}>
        <input
          className='w-[40rem] p-4 pl-16 rounded-md border-none shadow-md bg-no-repeat bg-[length:20px] bg-[url("https://www.svgrepo.com/show/522266/search.svg")] bg-[position:12px_center] focus:outline-none'
          name='searchTerm'
          type="text"
          placeholder='แปลภาษาไทย หรือภาษาสเปน'
          value={inputValue.searchTerm}
          onChange={hdlOnChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {showHistory && searchHis.length > 0 && (
          <ul className="absolute bg-white border rounded-md shadow-md mt-2 w-[40rem] max-h-40 overflow-auto">
            {searchHis.map((item) => (
              <li
                key={item.id}
                className="p-2 pl-4 text-start hover:bg-gray-200 cursor-pointer flex items-center justify-between"
                onClick={() => setInputValue({ searchTerm: item.searchTerm })}
              >
                {item.searchTerm}
                <div 
                onClick={()=> hdlDelete(item.id)}
                className='hover:bg-slate-300 flex items-center justify-center w-10 h-10 rounded-full mr-2'>
                  <FaTrash className='h-6 text-[#DB5252]' />
                </div>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default TranslatorInput;