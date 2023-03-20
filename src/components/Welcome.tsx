import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './constants/Button'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'

const Welcome: React.FC = () => {
  
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center px-8 py-28 space-y-32 lg:space-y-0 lg:space-x-16'>
        <div data-aos='fade-up' className='flex flex-col justify-between items-start space-y-8 w-full max-w-md'>
            <h1 className='text-[40px] leading-[46px] font-bold tracking-wide'>Transform Your Vision into Reality</h1>
            <h3 className='text-xl font-normal text-[#6E7477] tracking-wide'>Top-notch Web and Mobile App Development Services</h3>
            <Link href='#services' ><Button type='text' text='Check our services' /></Link>
        </div>
        <div data-aos='fade-down' className='relative'>
            <Image className='rounded-tl-[100px] rounded-br-[100px] sm:rounded-tl-[150px] sm:rounded-br-[150px]' src='/assets/welcome.jpg' width={544} height={500} alt='' />
            <div>
                <Image className='absolute rounded-full -top-24 left-0' src='/assets/webDevIcons/reactjs.png' width={90} height={90} alt='' />
                <Image className='absolute rounded-full -top-20 right-32' src='/assets/webDevIcons/Gatsby.png' width={50} height={50} alt='' />
                <Image className='absolute rounded-full -top-16 -right-20' src='/assets/new/square.svg' width={90} height={90} alt='' />
                <Image className='absolute rounded-full top-48 -right-16' src='/assets/webDevIcons/graphql.png' width={50} height={50} alt='' />
                <Image className='absolute rounded-full -bottom-8 right-32 opacity-50' src='/assets/new/square.svg' width={50} height={50} alt='' />
                <Image className='absolute rounded-full -bottom-20 left-64' src='/assets/webDevIcons/javascript.png' width={60} height={60} alt='' />
                <Image className='absolute rounded-full bottom-0 -left-32' src='/assets/webDevIcons/nextjs.png' width={90} height={90} alt='' />
                <Image className='absolute rounded-full top-32 -left-20' src='/assets/new/square.svg' width={70} height={70} alt='' />
            </div>
        </div>
    </div>
  )
}

export default Welcome