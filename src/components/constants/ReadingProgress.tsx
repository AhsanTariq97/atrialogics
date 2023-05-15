import { useState, useEffect, RefObject } from 'react';

const ReadingProgress = ({ progressBarRef }: {
    progressBarRef: RefObject<HTMLDivElement>
}) => {

    const [readingProgress, setReadingProgress] = useState(0);


    const scrollListener = () => {
        const element = progressBarRef.current;
        if (!element) return

        const windowsHeight = window.innerHeight

        const contentBounds = element?.getBoundingClientRect();
        const contentHeight = contentBounds.height
        const contentTop = contentBounds.top
        const contentBottom = contentBounds.bottom

        const windowScroll = window.scrollY || 0;

        if (contentTop >= windowsHeight) {
          return setReadingProgress(0);
        }
        if (contentBottom <= windowsHeight ) {
            return setReadingProgress(100);
        }
        console.log('windowScroll: ', windowScroll)
        setReadingProgress(((windowScroll  - 350) / contentHeight) * 100);
    };
      
    useEffect(() => {
        window.addEventListener("scroll", scrollListener);
        return () => window.removeEventListener("scroll", scrollListener);
    });
    
    return (
        <div className={`fixed z-[100] h-1 top-0 left-0 bg-[#473743]`} style={{width: `${readingProgress}%` }} />
    )
};

export default ReadingProgress;
