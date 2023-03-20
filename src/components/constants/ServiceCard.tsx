import Image from 'next/image'
import React from 'react'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'

interface ServiceCardProps {
  image: string;
  heading: string;
  text: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, heading, text }) => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div data-aos='fade-up' className='flex flex-col justify-between items-center w-full max-w-2xl lg:max-w-lg px-16 text-center space-y-4'>
        <Image src={image} width={250} height={200} alt='' />
        <h1 className='text-2xl font-bold tracking-wide'>{heading}</h1>
        <p className='text-sm text-[#6E7477] tracking-wide'>{text}</p>
    </div>
  )
}

export default ServiceCard