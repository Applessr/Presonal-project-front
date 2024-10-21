import React from 'react'

const Presente = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h1 className='text-2xl mb-4'>Presente de indicativo</h1>
            <h1 className='text-2xl mb-4'>การผันเวิร์บ ปัจจุบัน</h1>
            <div className="video-container">
                <iframe
                    width="850"
                    height="550"
                    src={`https://www.youtube.com/embed/T5sj1xj1NNs`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}

export default Presente
