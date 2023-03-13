import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { useController, useForm } from "react-hook-form";
import validator from 'validator';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

const BlogPage = ({ headings, processedContent }) => {
//   const ref = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.5 } // Only trigger when at least 50% of the element is visible
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//     };
//   }, [ref]);

//   console.log(ref)
//   console.log(isVisible)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: { /*date: currentDate()*/ } });

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      return true
    } else {
      return 'Enter valid email'
    } 
  }

  // EmailJS 
  const form = useRef();

  const updateEmailJS = () => {
    emailjs.sendForm('contact_service', 'contact_form', form.current, 'J_xT9g7xbilo1oKrW')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  }

  // Making the sidebar fix at its position when scrolling the blog
  // We have the sidebar initially placed beside the content via flex
  // On scrolling down, when the top position of the blog content reaches 120px from the top of viewport, we fix the sidebar at that location (adding class fixedTop via fixSidebar state)
  // When we reach bottom of blog and its bottom matches the sidebar bottom, we set fixSidebarBottom to true and add class of fixedBottom (replacing fixedTop)
  // On scrolling back up, we need the sidebar to fix again when blog content appears. So we apply condition that if top position of sidebar becomes greater than 120, we set the fixSidebarBottom to false and thus class becomes fixedTop again (according to ternary)
  // Check ternary statements and browser inspect to see how the classes changes

  const [fixSidebar, setFixSidebar] = useState(false)
  const [fixSidebarBottom, setFixSidebarBottom] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const myContentRef = useRef(null);
  const mySidebarRef = useRef(null);

  useEffect(() => {
    // Using ref to reference the blog content and getting its top and bottom position
    const rectContent = myContentRef.current?.getBoundingClientRect();
    const topPosition = rectContent?.top ;
    const bottomPosition = rectContent?.bottom ;
    
    // Using ref to reference the blog sidebar and getting its top and bottom position
    const rectSidebar = mySidebarRef.current?.getBoundingClientRect();
    const topPositionSidebar = rectSidebar?.top;
    const bottomPositionSidebar = rectSidebar?.bottom;

    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Condition for fixing sidebar to top
    topPosition < 120 ? setFixSidebar(true) : setFixSidebar(false)
    
    // Condition for fixing sidebar to bottom
    bottomPositionSidebar > bottomPosition ? setFixSidebarBottom(true) : setFixSidebarBottom(false)

    // Condition for fixing sidebar to top again on scrolling back up
    {(fixSidebar && fixSidebarBottom) && topPositionSidebar > 120 ? setFixSidebarBottom(false) : ''}

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  });

  return (
    <>
        <div className='w-full max-w-screen-xl'>
            <div className='relative flex flex-row justify-between items-start'>
              <div ref={myContentRef} className={`h-tag-style text-left ${fixSidebar || fixSidebarBottom ? 'md:pr-[300px]' : ''}`}>
                <div dangerouslySetInnerHTML={{ __html: processedContent }} />
              </div>

              <div ref={mySidebarRef} className={`${fixSidebar && !fixSidebarBottom ? 'fix-large-screen fixed top-[120px] right-8 xl:transform xl:translate-x-1/2 min-w-[300px] max-w-[300px]' : 'min-w-[300px] max-w-[300px]'}
                                                  ${fixSidebar && fixSidebarBottom ? 'absolute -bottom-[1px] right-0 min-w-[300px] max-w-[300px]' : 'min-w-[300px] max-w-[300px]'}
                                                  p-2 pl-8 hidden md:flex flex-col justify-between items-start space-y-8`}>
                <div className='flex flex-col justify-between items-start space-y-4'>
                  <h3 className='text-base font-bold'>Want to stay on top of all tips and news from Atrialogics?</h3>
                  <form className='text-sm flex flex-col justify-between items-start space-y-2 w-full' ref={form} onSubmit={handleSubmit((data) => {
                    console.log(data)
                    updateEmailJS()
                    reset();
                  })}>
                    <label htmlFor="email">Your email*</label>
                    <input type="email" placeholder='example@email.com' className={`${errors.email ? 'border border-red-600' : '' } w-full border border-black bg-black/5 p-2 rounded-xl outline-none`} {...register('email', {required: 'Required', validate: validateEmail })} />
                    <p className='text-red-600'>{errors.email?.message}</p>
                    <input type="submit" value="Submit" className='text-white bg-[#7187A2] px-4 py-2 rounded-full' />
                  </form>
                </div>
                
                {headings.length >= 1 && <div className='border border-black rounded-3xl p-2 w-full max-h-[300px] overflow-auto'>
                  <div className='flex flex-col space-y-4 py-2'>
                    <h3 className='text-base font-bold'>Table of Contents</h3>
                    <div className='flex flex-col space-y-2'>
                      {Array.from(headings).map((heading, index) => (
                        <Link href={`#section${index + 1}`}>
                          <p key={heading.textContent} className='text-sm'>{heading.textContent}</p>
                        </Link>
                      ))}              
                    </div>
                  </div>
                </div>}
              </div>
            </div>
        </div>
    
    
    </>
  )
}

export default BlogPage