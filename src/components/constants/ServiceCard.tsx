import Image from 'next/image'
import React from 'react'

interface ServiceCardProps {
  image: string;
  heading: string;
  text: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, heading, text }) => {
  return (
    <div className='flex flex-col justify-between items-center w-full max-w-2xl lg:max-w-lg px-16 text-center space-y-4'>
        <Image src={image} width={250} height={200} alt='' />
        <h1 className='text-2xl font-bold tracking-wide'>{heading}</h1>
        <p className='text-sm text-[#6E7477] tracking-wide'>{text}</p>
    </div>
  )
}

export default ServiceCard