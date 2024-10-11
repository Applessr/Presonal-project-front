import React from 'react'
import TranslatorInput from '../components/landingPage/TranslatorInput'
import WordDay from '../components/WordDay'
import Lesson from '../components/landingPage/Lesson'
import Footer from '../components/Footer'
import Hotvocap from '../components/landingPage/HotVocap'

function LandingPage() {
  return (
    <div className="w-full h-auto text-center ">
    <div
      className=" h-[25rem] flex justify-center items-center bg-cover bg-center overflow-hidden bg-slate-300"
      style={{ backgroundImage: "url('https://i.imgur.com/qLPSyHy.png')" }}
    >
      <TranslatorInput />
    </div>
    <WordDay/>
    <h1 className='text-3xl font-semibold mt-16 mb-10'>บทเรียนภาษาสเปน</h1>
    <Lesson/>
    <h1 className='text-3xl font-semibold mb-16'>คำศัพท์ยอดฮิต</h1>
    <Hotvocap/>
    <Footer/>
  </div>
  )
}

export default LandingPage
