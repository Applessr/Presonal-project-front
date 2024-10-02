import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/'); 
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-screen h-[91vh]">
        <img className='w-[30rem] h-[30rem]'
          src="https://i.imgur.com/ntpiSB3.png" alt="401" />
        <button
          onClick={handleOnClick}
          className="px-4 py-2 bg-[#006989] text-white rounded hover:bg-[#006989c1]"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized
