import React from 'react'
import Image from 'next/image'
import Button from './constants/Button'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'
import Link from 'next/link';

const About: React.FC = () => {
    
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div id='about' className='before:block before:h-[100px] before:-mt-[100px]'>
      <div className='flex flex-col items-center justify-between px-8 py-32 space-y-24 lg:flex-row lg:space-y-0 lg:space-x-16'>
          <div className='relative max-w-md lg:max-w-sm'>
              <Image data-aos='fade' className='rounded-tl-[128px] rounded-br-[128px] sm:rounded-tl-[150px] sm:rounded-br-[150px]' src='/assets/about-us.jpg' width={448} height={540} alt='' />
              <div>
                  <Image data-aos='fade' className='absolute left-0 rounded-full -top-24' src='/assets/webDevIcons/reactjs.png' width={90} height={90} alt='' />
                  <Image data-aos='fade' className='absolute rounded-full -top-20 right-32' src='/assets/webDevIcons/Gatsby.png' width={50} height={50} alt='' />
                  <Image data-aos='fade' className='absolute rounded-full top-48 -right-16' src='/assets/webDevIcons/graphql.png' width={50} height={50} alt='' />
                  <Image className='absolute rounded-full -bottom-20 left-64' src='/assets/webDevIcons/javascript.png' width={60} height={60} alt='' />
                  <Image className='absolute bottom-0 rounded-full -left-32' src='/assets/webDevIcons/nextjs.png' width={90} height={90} alt='' />
              </div>
          </div>
          <div data-aos='fade-up' className='flex flex-col items-center justify-between w-full max-w-lg space-y-8 lg:items-start lg:max-w-xl'>
              <h1 className='text-3xl font-bold tracking-wide'>About Us</h1>
              <p className='text-sm font-normal text-[#6E7477] text-center lg:text-left tracking-wide'>Leading IT-based company that specializes in providing top-of-the-line software services. Our focus is on delivering intuitive, user-centric solutions that meet the highest standards of quality and transparency. Established in 2020 and located in Islamabad, our team of experienced developers, designers, and project managers work tirelessly to ensure that each project meets our clients' unique needs and exceeds their expectations.</p>
              <Link href='/portfolio'><Button type='text' text='See about our Portfolio' /></Link>
          </div>
      </div>
    </div>
  )
}

export default About