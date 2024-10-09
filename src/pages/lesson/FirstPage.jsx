import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import loading from '../../assets/loading.gif';

const FirstPage = () => {
    const navigate = useNavigate();
    const { lessonId, questionId } = useParams();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown === 0) {

            navigate(`/lesson/${lessonId}/${questionId}`);
        }
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown, navigate, lessonId, questionId]);

    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-[300px] h-[300px] bg-[#E2FAF8] rounded-full flex justify-center items-center mb-10'>
                    <img
                        className='w-[300px]  h-[300px]'
                        src={loading} alt="My GIF" />
                </div>
                <span className="countdown text-3xl">
                    แบบทดสอบจะเริ่มใน  <span className='text-[#22A094]' style={{ "--value": countdown }}> วินาที</span>
                </span>
            </div>
        </div>
    );
};

export default FirstPage;
