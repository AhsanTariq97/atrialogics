import React from 'react'
import Image from 'next/image';
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { ImSkype } from 'react-icons/im'
import Link from 'next/link';

const TeamCard = ({ image, name, post, linkedin, twitter, skype }) => {
  return (
    <div className='flex flex-col justify-between items-center space-y-2'>
        <Image className='rounded-full' src={image} width={92} height={92} />
        <h3 className='text-base font-bold tracking-wide'>{name}</h3>
        <p className='text-sm font-normal text-[#6E7477] tracking-wide'>{post}</p>
        <div className='flex justify-evenly items-center space-x-4'>
            <Link href={linkedin}><FaLinkedinIn size={20} color='#0C4B5B' /></Link>
            <Link href={twitter}><FaTwitter size={20} color='#0C4B5B' /></Link>
            <Link href={skype}><ImSkype size={20} color='#0C4B5B' /></Link>
        </div>
    </div>
  )
}

export default TeamCard