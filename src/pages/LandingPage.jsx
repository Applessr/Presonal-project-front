import React, { useEffect } from 'react'
import TranslatorInput from '../components/landingPage/TranslatorInput'
import WordDay from '../components/WordDay'
import Lesson from '../components/landingPage/Lesson'
import Footer from '../components/Footer'
import Hotvocap from '../components/landingPage/HotVocap'
import Subscript from '../components/landingPage/Subscript'
import useAuthStore from '../store/auth-store'
import { useNavigate } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import ScrollAnimation from '../components/ScrollAnimation'

function LandingPage() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus);

  const navigate = useNavigate();

  const wordDayRef = ScrollAnimation();
  const lessonRef = ScrollAnimation();
  const hotvocapRef = ScrollAnimation();
  const subscriptRef = ScrollAnimation();


  useEffect(() => {

    if (user) {
      if (subscriptionStatus === 'ACTIVE') {
        navigate('/subscript');
      } else if (role === 'USER') {
        navigate('/user');
      } else {
        navigate('/');
      }
    }

  }, [user, role, subscriptionStatus, navigate]);

  return (
    <div className="w-full h-auto text-center ">
      <div
        className=" h-[25rem] flex justify-center items-center bg-cover bg-center overflow-hidden bg-slate-300"
        style={{ backgroundImage: "url('https://i.imgur.com/qLPSyHy.png')" }}
      >
        <TranslatorInput />
      </div>
      <div ref={wordDayRef} className="fade-in-section">
        <WordDay />
      </div>
      <div ref={lessonRef} className="fade-in-section">
        <h1 className='text-3xl font-semibold mt-16 mb-10'>บทเรียนภาษาสเปน</h1>
        <Lesson />
      </div>
      <div  ref={hotvocapRef} className="fade-in-section">
        <h1 className='text-3xl font-semibold mb-16'>คำศัพท์ยอดฮิต</h1>
        <Hotvocap />
      </div>
      <div  ref={subscriptRef} className="fade-in-section">
        <h1 className='text-3xl font-semibold mb-16 mt-24'>สิทธิพิเศษสำหรับผู้ที่สมัครเป็นสมาชิก</h1>
        <Subscript />
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage
