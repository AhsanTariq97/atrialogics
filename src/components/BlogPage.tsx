import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import validator from 'validator';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

import AOS from 'aos';
import 'aos/dist/aos.css';

type Props = {
  headings: Element[];
  processedContent: any;
};

const BlogPage: React.FC<Props> = ({ headings, processedContent }) => {

  useEffect(() => {
    AOS.init();
  }, [])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ email: string }>({ defaultValues: { /*date: currentDate()*/ } });

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      return true
    } else {
      return 'Enter valid email'
    } 
  }

  // EmailJS
  const form = useRef<HTMLFormElement>(null);

  const updateEmailJS = (): void => {
    emailjs.sendForm('contact_service', 'contact_form', form.current!, 'J_xT9g7xbilo1oKrW')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  }

  // Making the sidebar fix at its position when scrolling the blog
  // We have the sidebar initially placed beside the content via flex
  // On scrolling down, when the top position of the blog content reaches 120px (navbar height) from the top of viewport, we fix the sidebar at that location (via fixSidebar state)
  // When we reach bottom of blog and its bottom matches the sidebar bottom, we set fixSidebarBottom to true (both fixSidebar and fixSidebarBottom are true and thus we make position absolute set at bottom)
  // On scrolling back up, we need the sidebar to fix again when blog content appears. So we apply condition that if top position of sidebar becomes greater than 120, we set the fixSidebarBottom to false and set classes based on fixSidebar state (according to ternary)
  // Check ternary statements and browser inspect to see how the classes changes

  const [fixSidebarTop, setFixSidebarTop] = useState<boolean>(false)
  const [fixSidebarBottom, setFixSidebarBottom] = useState<boolean>(false)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const myContentRef = useRef<HTMLDivElement>(null);
  const mySidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Using ref to reference the blog content and getting its top and bottom position
    const rectContent = myContentRef.current?.getBoundingClientRect();
    const topPositionContent = rectContent?.top ;
    const bottomPositionContent = rectContent?.bottom ;
    
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
    topPositionContent! < 120 ? setFixSidebarTop(true) : setFixSidebarTop(false)
    
    // Condition for fixing sidebar to bottom
    bottomPositionSidebar! > bottomPositionContent! ? setFixSidebarBottom(true) : setFixSidebarBottom(false)

    // Condition for fixing sidebar to top again on scrolling back up
    {(fixSidebarTop && fixSidebarBottom) && topPositionSidebar! > 120 ? setFixSidebarBottom(false) : null}

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Scroll to the heading but without href id which modifies the URL too.
  // const smoothScrollTo = (index: number) => {
  //   const id = `section${index + 1}`
  //   const element = document.getElementById(id);
  //   element!.scrollIntoView({
  //       block: 'start',
  //       behavior: 'smooth' // smooth scroll
  //   })
  // };

  return (
    <>
      <div className='w-full max-w-screen-xl'>
        <div className='relative flex flex-row items-start justify-between'>
          <div ref={myContentRef} className={`w-full text-left ${fixSidebarTop ? 'md:pr-[300px]' : ''}`}>
            <div data-aos='fade-up' dangerouslySetInnerHTML={{ __html: processedContent }}
            className='prose lg:prose-lg prose-a:text-blue-400 hover:prose-a:text-blue-600 prose-a:no-underline prose-headings:underline prose-figcaption:text-center prose-img:rounded-2xl'
            />
          </div>

          <div ref={mySidebarRef} className={`p-2 pl-8 hidden md:flex flex-col justify-between items-start space-y-8
            ${fixSidebarTop && !fixSidebarBottom ? 'fix-large-screen fixed top-[120px] right-8 xl:transform xl:translate-x-1/2 min-w-[300px] max-w-[300px]' : 'min-w-[300px] max-w-[300px]'}
            ${fixSidebarTop && fixSidebarBottom ? 'absolute -bottom-[1px] right-0 min-w-[300px] max-w-[300px]' : 'min-w-[300px] max-w-[300px]'}`}>
            <div className='flex flex-col items-start justify-between space-y-4'>
              <h3 className='text-base font-bold leading-tight'>Want to stay on top of all tips and news from Atrialogics?</h3>
              <form className='flex flex-col items-start justify-between w-full space-y-2 text-xs' ref={form} onSubmit={handleSubmit((data) => {
                console.log(data)
                updateEmailJS()
                reset();
              })}>
                <label htmlFor="email">Your email*</label>
                <input type="email" placeholder='example@email.com' className={`${errors.email ? 'border-red-600' : 'border-[#7187A2]' } w-full border p-2 rounded-xl outline-none shadow-lg`} {...register('email', {required: 'Required', validate: validateEmail })} />
                <p className='py-1 text-red-600'>{errors.email?.message}</p>
                <button type="submit" className='text-white bg-[#7187A2] px-4 py-2 rounded-full cursor-pointer hover:bg-[#75C3B9]' >Submit</button>
              </form>
            </div>
            
            {/* {headings.length > 0 && <div className='border border-black rounded-3xl p-2 w-full max-h-[300px] overflow-auto'>
              <div className='flex flex-col py-2 space-y-4'>
                <h3 className='text-lg font-bold'>Table of Contents</h3>
                <div className='flex flex-col space-y-2'>
                  {Array.from(headings).map((heading, index) => (
                    <Link href={`#section${index + 1}`} onClick={(event) => {
                      event.preventDefault();
                      smoothScrollTo(index)
                    }}>
                      <p key={heading.textContent} className='text-sm'>{heading.textContent}</p>
                    </Link>
                  ))}              
                </div>
              </div>
            </div>} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPage