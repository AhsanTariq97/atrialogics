import Image from 'next/image'
import { Props } from 'next/script';
import React from 'react'

interface PropsTechStack {
    tech: {
        name: string;
        icon: string;
        description: string;
    }
}

const TechStackCard = ({ tech }: PropsTechStack) => {
  return (
    <div className='flex justify-between items-center max-w-[350px] rounded-lg shadow-tech-card'>
        <div className='flex justify-center items-center slanted-tech-card bg-[#40546F] rounded-lg px-8 py-7'>
            <Image src='/assets/icons/tick.svg' className='min-w-[30px] h-[30px]' alt='' width={30} height={30} />
        </div>
        <div className='flex justify-between items-center pr-4'>
            <div className='flex flex-col justify-between items-start space-y-1'>
                <h5 className='text-xs font-semibold'>{tech.name}</h5>
                <p className='text-[10px]'>{tech.description}</p>
            </div>
            <Image src={`/assets/tech/${tech.icon}.svg`} className='w-[40px] h-[40px]' width={40} height={40} alt='' />
        </div>
    </div>
  )
}

export default TechStackCard