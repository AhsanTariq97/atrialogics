import React from 'react'
import ContactForm from './constants/ContactForm'
import ContactDetails from './constants/ContactDetails'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import Link from 'next/link'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'

const Contact: React.FC = () => {

  useEffect(() => {
    AOS.init();
  }, [])
  
  return (
    <div id='contact' className='before:block before:h-[100px] before:-mt-[100px]'>
      <div className='flex flex-col justify-between items-center lg:flex-row lg:items-start py-16 px-8'>
          <div data-aos='fade-up'  className='flex flex-col justify-between items-center space-y-8 max-w-md lg:mt-16 lg:items-start lg:space-y-16'>
              <h1 className='text-3xl font-bold tracking-wide'>Contact Us</h1>
              <ContactDetails data-aos='fade-up' textColor='text-[#6E7477]' iconColor='#1F3A6E' />
              <div data-aos='fade-up' className='flex justify-between items-center space-x-4'>
                  <Link href='https://www.facebook.com/atrialogics' target='_blank'><div className='rounded-full text-[#1F3A6E] bg-[#E4E6E7] p-2'><FaFacebookF size={25} /></div></Link>
                  <Link href='https://www.instagram.com/atrialogics' target='_blank'><div className='rounded-full text-[#1F3A6E] bg-[#E4E6E7] p-2'><AiFillInstagram size={25} /></div></Link>
                  <Link href='https://atrialogics.io/#' target='_blank'><div className='rounded-full text-[#1F3A6E] bg-[#E4E6E7] p-2'><FaTwitter size={25} /></div></Link>
                  <Link href='https://atrialogics.io/#' target='_blank'><div className='rounded-full text-[#1F3A6E] bg-[#E4E6E7] p-2'><FaLinkedinIn size={25} /></div></Link>
              </div>
          </div>
          <div data-aos='fade-up' className='mt-16 max-w-lg w-full lg:mt-0'>
              <ContactForm />
          </div>
      </div>
    </div>
  )
}

export default Contact