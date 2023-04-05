import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image';
import TechStackCard from './constants/TechStackCard'

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Post } from '../pages/portfolio'

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
            <div className='flex justify-center items-center w-full'>
                <iframe className='lg:w-[910.4px] lg:h-[500px]' width="550.4" height="370" src={frontmatter.videoSrc}></iframe> 
            </div>
            <div className='flex flex-col justify-between items-start space-y-8 w-full'>
                <h1 className='text-2xl md:text-3xl font-bold'>The tech stack we used:</h1>
                <div className='flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-8 w-full'>
                    <div className='space-y-2'>
                        <h3 className='text-xl text-[#7187A2]'>{frontmatter.frontend.title}</h3>
                        <div className='flex flex-col justify-between items-center space-y-4'>
                        {frontmatter.frontend.stack.map((tech) => (
                            <TechStackCard tech={tech}/>
                        ))
                        }
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <h3 className='text-xl text-[#7187A2]'>{frontmatter.backend.title}</h3>
                        <div className='flex flex-col justify-between items-center space-y-4'>
                        {frontmatter.backend.stack.map((tech) => (
                            <TechStackCard tech={tech}/>
                        ))
                        }
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <h3 className='text-xl text-[#7187A2]'>{frontmatter.CICD.title}</h3>
                        <div className='flex flex-col justify-between items-center space-y-4'>
                        {frontmatter.CICD.stack.map((tech) => (
                            <TechStackCard tech={tech}/>
                        ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProjectPage