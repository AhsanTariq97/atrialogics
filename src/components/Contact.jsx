import React from 'react'
import ContactForm from './constants/ContactForm'
import ContactDetails from './constants/ContactDetails'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import Link from 'next/link'

const Contact = () => {
  return (
    <div id='contact' className='flex flex-col justify-between items-center lg:flex-row lg:items-start py-16 px-8'>
        <div className='flex flex-col justify-between items-center space-y-8 max-w-md lg:mt-16 lg:items-start lg:space-y-16'>
            <h1 className='text-3xl font-bold tracking-wide'>Contact Us</h1>
            <ContactDetails textColor='text-[#6E7477]' iconColor='#1F3A6E' />
            <div className='flex justify-between items-center space-x-4'>
                <Link href='https://www.facebook.com/atrialogics'><div className='rounded-full text-[#1F3A6E] bg-[#E4E6E7] p-2'><FaFacebookF size={25} /></div></Link>
                <Link href='https://www.instagram.com/atrialogics'><div className='rounded-full text-[#1F3A6E] bg-[#E4E6E7] p-2'><AiFillInstagram size={25} /></div></Link>
                <Link href='https://atrialogics.io/#'><div className='rounded-full text-[#1F3A6E] bg-[#E4E6E7] p-2'><FaTwitter size={25} /></div></Link>
                <Link href='https://atrialogics.io/#'><div className='rounded-full text-[#1F3A6E] bg-[#E4E6E7] p-2'><FaLinkedinIn size={25} /></div></Link>
            </div>
        </div>
        <div className='mt-16 max-w-lg w-full lg:mt-0'>
            <ContactForm />
        </div>
    </div>
  )
}

export default Contact