import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react';
import Button from './constants/Button';

import data from './projectData/data'

const Navbar: React.FC = () => {

    const navbarData = data.navbar
    
    const [toggle, setToggle] = useState<boolean>(false)

  return (
    <div className='fixed top-0 z-[1] w-full bg-white'>
        <nav className='relative w-full mx-auto max-w-screen-xl h-[100px] pt-4'>
            <div className='flex flex-row justify-between items-center px-8'>
                <div className='mb-6'>
                    <Link href="/"><Image src='/assets/Atrialogics.png' alt="Solvers Cave Logo" width={200} height={100} /></Link>
                </div>
                <ul className={'hidden lg:flex flex-row justify-center items-center'}>
                    {/* {navbarData.links.map((item) => <li className='px-4 py-2'><Link href={item.to}><p className='text-base font-normal tracking-wide'>{item.label}</p></Link></li> )} */}
                    <li className='px-4 py-2 tracking-wide'><Link href="/"><p className='text-base font-normal tracking-wide'>Home</p></Link></li>
                    <li className='px-4 py-2 tracking-wide'><Link href="/#services"><p className='text-base font-normal tracking-wide'>Services</p></Link></li>
                    <li className='px-4 py-2 tracking-wide'><Link href="/#about"><p className='text-base font-normal tracking-wide'>About</p></Link></li>
                    <li className='px-4 py-2 tracking-wide'><Link href="/#team"><p className='text-base font-normal tracking-wide'>Team</p></Link></li>
                    <li className='px-4 py-2 tracking-wide'><Link href="/#contact"><p className='text-base font-normal tracking-wide'>Contact</p></Link></li>
                </ul>
                <div className='hidden lg:block'>
                    <Link href="/blogs"><Button type='text' text='Blogs' /></Link>
                </div>
                <div className='flex lg:hidden justify-end items-center'>
                    <Image src={toggle ? '' : '/assets/icons/menu.svg'} className='cursor-pointer brightness-0' width={25} height={25} alt='menu toggle' onClick={() => setToggle(prev => !prev)} />
                    <div className={`${toggle ? 'flex' : 'hidden'} absolute top-0 left-0 bg-white w-full h-screen text-center rounded-lg`}>
                        <ul className='flex flex-col justify-center items-center w-full h-full text-black space-y-8'>
                            {/* {navbarData.links.map((item) => <li className='px-4 py-2'><Link href={item.to}><p className='text-base font-normal tracking-wide'>{item.label}</p></Link></li> )} */}
                            <li className='px-4 py-2 tracking-wide'><Link href="/"><p className='text-base font-normal tracking-wide'>Home</p></Link></li>
                            <li className='px-4 py-2 tracking-wide'><Link href="#services"><p className='text-base font-normal tracking-wide'>Services</p></Link></li>
                            <li className='px-4 py-2 tracking-wide'><Link href="#about"><p className='text-base font-normal tracking-wide'>About</p></Link></li>
                            <li className='px-4 py-2 tracking-wide'><Link href="#team"><p className='text-base font-normal tracking-wide'>Team</p></Link></li>
                            <li className='px-4 py-2 tracking-wide'><Link href="#contact"><p className='text-base font-normal tracking-wide'>Contact</p></Link></li>
                            <Link href="/blogs"><Button type='text' text='Blogs' /></Link>
                            <Image className='absolute top-4 right-8 cursor-pointer brightness-0' src={'/assets/icons/close.svg'} width={25} height={25} alt='close toggle' onClick={() => setToggle(prev => !prev)} />
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar