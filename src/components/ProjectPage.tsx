import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Post } from '../pages/portfolio'
import TechStack from './TechStack';

interface Props {
  frontmatter: Post;
  source: string;
}

const ProjectPage = ({frontmatter, source}: Props) => {

    useEffect(() => {
        AOS.init();
      }, [])

  return (
    <>
        <div className='flex flex-col lg:flex-row justify-start items-center lg:space-x-16 pt-8'>
            {frontmatter.featureImage ? <Image data-aos='fade-up' className='rounded-3xl self-center w-full lg:w-[380px] lg:max-w-[380px]' src={frontmatter.featureImage} width={688} height={387} alt='' /> : <Image data-aos='fade-up' src='/assets/ecommerce.svg' className='rounded-3xl self-center h-[80vh]' alt='' width={800} height={500} /> }
            <div className='flex flex-col justify-between items-start space-y-8 py-8 sm:mt-16 lg:py-0 lg:mt-0'>
            <h1 data-aos='fade-up' className='text-3xl lg:text-xl font-bold w-full text-left'>{frontmatter.title}</h1>
            <p className='text-sm lg:text-sm text-[#6E7477]'>{source}</p>
            </div>
        </div>
        <div className='flex flex-col justify-between items-start space-y-16'>
            <div className='flex flex-col justify-between items-start space-y-8'>
                <h1 className='text-2xl font-bold'>Hello that my project Detail</h1>
                <p className='text-base text-[#6E7477]'>Since 1999, millions of people have expressed themselves on Blogger. From detailed posts about almost every apple variety you could ever imagine to a blog dedicated to the art of blogging itself, the ability to easily share, publish and express oneself on the web is at the core of Blogger’s mission.</p>
            </div>
            <div data-aos='fade-right' className='w-full'>
                <iframe className='w-full aspect-video pt-[5%] px-[13.2%] pb-[6%] bg-laptop' src="https://www.youtube.com/embed/Q1owo3t6CZ8" ></iframe>
            </div>
            {/* <div data-aos='fade-right' className='relative flex justify-center items-center w-max mx-auto rounded-3xl'>
                {frontmatter.featureImage ? <Image data-aos='fade-up' className='rounded-3xl self-center w-full lg:w-[910.4px] lg:h-[500px]' src={frontmatter.featureImage} width={600} height={338} alt='' /> : <Image data-aos='fade-up' src='/assets/ecommerce.svg' className='rounded-3xl self-center h-[80vh]' alt='' width={800} height={500} /> }
                <div className='absolute opacity-0 hover:opacity-100 w-full h-full rounded-3xl flex justify-center items-center bg-black/70'>
                <p className='text-3xl font-bold text-white'>WEB APPLICATION</p>
                </div>
            </div> */}
            <div data-aos='fade-up' className='flex flex-col justify-between items-start space-y-8 w-full'>
                <h1 className='text-2xl md:text-3xl font-bold'>The tech stack we used:</h1>
                <div className='flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-8 w-full'>
                    <TechStack data={frontmatter.frontend} />
                    <TechStack data={frontmatter.backend} />
                    <TechStack data={frontmatter.CICD} />
                </div>
            </div>
        </div>
    </>
  )
}

export default ProjectPage