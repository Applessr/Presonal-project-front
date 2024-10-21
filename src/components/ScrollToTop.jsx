import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            {isVisible && (
                <button
                    className='w-12 h-12 fixed bottom-8 right-8 bg-[#22a093c4] dark:bg-[#878686b8] text-white rounded-full flex items-center justify-center cursor-pointer'
                    onClick={scrollToTop}
                >
                    <IoIosArrowUp className='w-6 h-6' /> 
                </button>
            )}
        </div>
    );
};

export default ScrollToTop
