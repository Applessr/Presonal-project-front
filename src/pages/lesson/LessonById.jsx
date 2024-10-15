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
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (token && lessonId) {
      (async () => {
        await getOneScore(token, lessonId);
        await getAllUser(token, lessonId);
        await getLessonId(token, lessonId);
      })();
    }
  }, [token, lessonId, getLessonId]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (option) => {
    if (isAnswered) return;

    const correctOption = currentQuestion.correctOption;

    let newScore = score;

    if (option === correctOption) {
      newScore = score + 1;
      setScore(newScore);
      setButtonState({ [option]: 'correct' });
    } else {
      setButtonState({ [option]: 'incorrect' });
    }

    setIsAnswered(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setButtonState({});
        setIsAnswered(false);
      } else {
        setIsFinished(true);
        hdlScoreSubmit(newScore);
      }
    }, 3000);
  };

  const hdlScoreSubmit = async (finalScore) => {
    if (thisLessonScore.length === 0 || finalScore > thisLessonScore[0].score) {
      if (thisLessonScore.length === 0) {
        await createUserScore(token, lessonId, { score: finalScore });
      } else {
        await redoUserScore(token, lessonId, { score: finalScore });
      }
      getAllUser(token, lessonId);
    }
  };


  return (
    <div>
      {isFinished ? (
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-3xl flex items-center'>ยินดีด้วย<img className='w-16 h-16' src={pop} alt="Congratulations" /></h2>
          <p className='text-xl mb-4'>คะแนนของคุณคือ {score} คะแนนจาก {questions.length}</p>
          <div className="overflow-x-auto w-[30rem] bg-secondary text-primary rounded-lg mb-10">
            <table className="table text-lg flex-1">
              <thead>
                <tr>
                  <th className='text-center text-xl font-semibold'>Rank</th>
                  <th className='text-center text-xl font-semibold'>Name</th>
                  <th className='text-center text-xl font-semibold'>Score</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {allScore[0] && allScore[0].user && (
                  <tr key={allScore[0].id} className="text-black dark:text-white text-center">
                    <th><img className='w-12 h-12' src="https://i.imgur.com/jpFXWtu.png" alt="gold-medal" /></th>
                    <td className='text-xl text-primary'>"{allScore[0].user.username}"</td>
                    <td>{allScore[0].score}</td>
                  </tr>
                )}
                {allScore[1] && allScore[1].user && (
                  <tr key={allScore[1].id} className="text-black dark:text-white text-center">
                    <th><img className='w-11 h-11' src="https://i.imgur.com/4DOKN4o.png" alt="gold-medal" /></th>
                    <td className='text-xl'>{allScore[1].user.username}</td>
                    <td>{allScore[1].score}</td>
                  </tr>
                )}
                {allScore[2] && allScore[2].user && (
                  <tr key={allScore[2].id} className="text-black dark:text-white text-center">
                    <th><img className='w-9 h-9' src="https://i.imgur.com/RqG6jhE.png" alt="gold-medal" /></th>
                    <td>{allScore[2].user.username}</td>
                    <td>{allScore[2].score}</td>
                  </tr>
                )}
                {allScore[3] && allScore[3].user && (
                  <tr key={allScore[3].id} className="text-black dark:text-white">
                    <th>4</th>
                    <td>{allScore[3].user.username}</td>
                    <td>{allScore[3].score}</td>
                  </tr>
                )}
                {allScore[4] && allScore[4].user && (
                  <tr key={allScore[4].id} className="text-black dark:text-white">
                    <th>5</th>
                    <td>{allScore[4].user.username}</td>
                    <td>{allScore[4].score}</td>
                  </tr>
                )}
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
          <div className='flex flex-col items-center justify-center  text-black dark:text-white'>
            <span className='text-sm mb-4'>ข้อที่ {currentQuestionIndex + 1} จาก {questions.length}</span>
            <span className='text-3xl'>{currentQuestion.question}</span>
            <img className='w-[325px] h-[325px] mt-10 mb-10' src={currentQuestion.image} alt="Question" />
          </div>
          <div className='flex justify-center gap-5'>
            {['option1', 'option2'].map(option => (
              <button
                key={option}
                className={`p-2 border-2 border-[#6E6E6E] text-xl flex gap-2 rounded-lg ${buttonState[option] === 'correct' ? 'bg-[#E2FAF8] text-[#22A094] border-[#22A094]' : buttonState[option] === 'incorrect' ? 'bg-[#E8A1A1] text-[#DB5252] border-[#DB5252]' : 'text-[#6E6E6E]'}`}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
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