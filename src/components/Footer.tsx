import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaArrowUp } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'
import ContactDetails from './constants/ContactDetails'
import Link from 'next/link'
import { useRouter } from 'next/router'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'

const Footer: React.FC = () => {

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    }

    useEffect(() => {
    AOS.init();
    }, [])

    const router = useRouter()

    const smoothScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                block: 'start',
                behavior: 'smooth' // smooth scroll
            })
        } else {
            router.push(`/#${id}`)
        }
    };

  return (
    <div className='relative pt-16 pb-8 bg-[#243140] text-[#BDC0C2] w-full'>
        <div className='slanted-cut text-[#E5E7EB] absolute animate-bounce top-0 left-auto right-8 bg-[#7187A2] p-2 md:-top-4 md:left-1/2 md:-translate-x-1/2 md:right-auto md:px-6 md:py-3 md:bg-[#243140] md:animate-none'>
            <button onClick={scrollToTop}><FaArrowUp size={25} className='md:animate-bounce' /></button>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center px-8 space-y-12 mx-auto pb-16 sm:pb-32 md:pt-12 md:border-t-2 border-[#E4E6E7] md:space-y-0 md:max-w-4xl lg:max-w-6xl'>
            <div data-aos='fade-up' className='flex flex-col justify-between items-center lg:items-start w-max space-y-4 text-center'>
                <h3 className='text-base font-semibold tracking-wide w-full text-white'>Navigate Links</h3>
                <Link href="/"><p className='text-base tracking-wide w-full'>Home</p></Link>
                <Link href="/blogs"><p className='text-base tracking-wide w-full'>Blogs</p></Link>
                <Link href="" onClick={(event) => {event.preventDefault();smoothScrollTo('services');}}><p className='text-base tracking-wide w-full'>Services</p></Link>
                <Link href="" onClick={(event) => {event.preventDefault();smoothScrollTo('team');}}><p className='text-base tracking-wide w-full'>Team</p></Link>
            </div>
            <div data-aos='fade-up' className='flex flex-col justify-between items-center space-y-4'>
                <h2 className='text-lg font-medium tracking-wide text-[#E5E7EB]'>FOLLOW US</h2>
                <div className='flex justify-between items-center space-x-4 md:space-x-2'>
                    <Link href='https://www.facebook.com/atrialogics'><div className='rounded-full text-[#252728] bg-[#E4E6E7] p-2'><FaFacebookF size={25} /></div></Link>
                    <Link href='https://www.instagram.com/atrialogics'><div className='rounded-full text-[#252728] bg-[#E4E6E7] p-2'><AiFillInstagram size={25} /></div></Link>
                    <Link href='https://atrialogics.io/#'><div className='rounded-full text-[#252728] bg-[#E4E6E7] p-2'><FaTwitter size={25} /></div></Link>
                    <Link href='https://atrialogics.io/#'><div className='rounded-full text-[#252728] bg-[#E4E6E7] p-2'><FaLinkedinIn size={25} /></div></Link>
                </div>
            </div>
            <div data-aos='fade-up' className='flex flex-col justify-between items-center lg:items-start space-y-4'>
                <h3 className='text-white tex-2xl font-bold tracking-wide'>Contact Us</h3>
                <ContactDetails textColor='text-[#BDC0C2]'iconColor='#BDC0C2' />
            </div>
        </div>
        <div className='flex justify-between items-center border-t-2 border-[#E4E6E7] w-full p-4 mx-auto md:max-w-4xl lg:max-w-6xl'>
            <h3 className='text-base font-medium tracking-wide'>©2023 Atrialogics</h3>
            <h3 className='text-base font-medium tracking-wide'>Atrialogics</h3>
        </div>
    </div>
  )
}

export default Footer