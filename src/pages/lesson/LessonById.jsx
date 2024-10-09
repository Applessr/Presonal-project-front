import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../../store/user-store';
import useAuthStore from '../../store/auth-store';
import pop from '../../assets/pop.gif';
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import useProgressStore from '../../store/progress-store';

const LessonById = () => {
  const { lessonId } = useParams();
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const getLessonId = useUserStore((state) => state.getLessonId);
  const questions = useUserStore((state) => state.questions);
  const getAllUser = useProgressStore((state) => state.getAllUser);
  const allScore = useProgressStore((state) => state.allScore);
  const createUserScore = useProgressStore((state) => state.createUserScore);
  const redoUserScore = useProgressStore((state) => state.redoUserScore);
  const getOneScore = useProgressStore((state) => state.getOneScore);
  const thisLessonScore = useProgressStore((state) => state.thisLessonScore);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [buttonState, setButtonState] = useState({});

  useEffect(() => {
    if (token && lessonId) {
      (async () => {
        await getOneScore(token,lessonId)
        await getAllUser(token, lessonId);
        await getLessonId(token, lessonId);
      })();
    }
  }, [token, lessonId, getLessonId]);

  setTimeout(async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setButtonState({});
    } else {
      setIsFinished(true);
  
      const newScore = score + 1; 
  
      if (thisLessonScore.length === 0 || newScore > thisLessonScore[0].score) { 
        if (thisLessonScore.length === 0) {
          await createUserScore(token, lessonId, { score: newScore });
        } else {
          await redoUserScore(token, lessonId, { score: newScore });
        }
        getAllUser(token, lessonId);  
      }
    }
  }, 3000);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {isFinished ? (
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-3xl flex items-center'>ยินดีด้วย<img className='w-16 h-16' src={pop} alt="Congratulations" /></h2>
          <p className='text-xl mb-4'>คะแนนของคุณคือ {score} คะแนนจาก {questions.length}</p>
          <div className="overflow-x-auto w-[30rem] bg-secondary text-primary rounded-lg mb-10">
            <table className="table flex-1">
              {/* head */}
              <thead>
                <tr className=''>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {allScore.map((item,index) => (
                  <tr key={item.id} className="text-black">
                    <th>{index + 1}</th>
                    <td>{item.user.username}</td>
                    <td>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            className='p-2 border-2 border-primary text-primary text-xl rounded-lg'
            onClick={() => navigate('/user/lesson')}
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      ) : currentQuestion ? (
        <div>
          <div className='flex flex-col items-center justify-center'>
            <span className='text-sm mb-4'>
              ข้อที่ {currentQuestionIndex + 1} จาก {questions.length}
            </span>
            <span className='text-3xl'>{currentQuestion.question}</span>
            <img className='w-[325px] h-[325px] mt-10 mb-10' src={currentQuestion.image} alt="Question" />
          </div>
          <div className='flex justify-center gap-5'>
            {['option1', 'option2'].map(option => (
              <button
                key={option}
                className={`p-2 border-2 border-[#6E6E6E] text-xl flex gap-2 rounded-lg ${buttonState[option] === 'correct' ? 'bg-[#E2FAF8] text-[#22A094] border-[#22A094]' : buttonState[option] === 'incorrect' ? 'bg-[#E8A1A1] text-[#DB5252] border-[#DB5252]' : 'text-[#6E6E6E]'}`}
                onClick={() => handleAnswer(option)}
              >
                {buttonState[option] === 'correct' ? <FaCheck className='w-6 h-6 text-[#22A094]' /> : buttonState[option] === 'incorrect' ? <RxCross2 className='w-6 h-6 text-[#DB5252]' /> : null}
                {currentQuestion[option]}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default LessonById;