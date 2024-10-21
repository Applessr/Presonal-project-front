import React from 'react'

const Letters = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl mb-4'>ตัวอักษรในภาษาสเปน</h1>
      <div className="video-container">
        <iframe
          width="850"
          height="550"
          src={`https://www.youtube.com/embed/Z0AkRZIjvCU`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default Letters
