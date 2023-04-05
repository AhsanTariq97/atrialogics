import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import PaginationButton from './constants/PaginationButton'

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Post } from '../pages/portfolio'

interface Props {
  posts: Post[];
}

const ProjectHomePage = ({ posts }: Props): JSX.Element => {

  useEffect(() => {
    AOS.init();
  }, [])

  const noOfPages = Math.ceil(posts.length / BATCH_SIZE)

  const [projectActiveIndex, setProjectActiveIndex] = useState<number | null>(null);

  // Accessing the stored value from session storage
  useEffect(() => {
    const storedState = sessionStorage.getItem("myprojectActiveIndex");
    if (storedState === null) {
      setProjectActiveIndex(0)
    } else {
      setProjectActiveIndex(JSON.parse(storedState));
    }
  }, [])

  // Storing value on clicking a blog link
  const handleClick = (): void => {
    sessionStorage.setItem("myprojectActiveIndex", JSON.stringify(projectActiveIndex)); 
  }

  //Storing value on reloading the page
  useEffect(() => {
    const handleBeforeUnload = (): void => {
      sessionStorage.setItem('myprojectActiveIndex', JSON.stringify(projectActiveIndex))
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [projectActiveIndex])
  
  // On clicking pagination buttons, we change the active index accordingly (Named strangely because PaginationButton component was previously used in blog section so just got on with same name)
  const onLoadMore = (index: string | number) => {
    if (index === 'prev') {
      setProjectActiveIndex(projectActiveIndex! - 1);
    } else if (index === 'next') {
      setProjectActiveIndex(projectActiveIndex! + 1);
    } else {
      setProjectActiveIndex(Number(index))
    }
  }

  return (
    <div className='flex flex-col justify-between items-center space-y-8 py-8 w-[90%] mx-auto'>
      <h2 data-aos='fade-down' className='text-2xl font-bold md:text-3xl py-4 [text-shadow:_0_10px_20px_rgb(0_0_0_/_20%)]'>Portfolio</h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {posts && posts.map((frontMatter, index: number) => {
          if (index >= BATCH_SIZE * projectActiveIndex! && index < BATCH_SIZE * (projectActiveIndex! + 1)) {
            let newExcerpt = frontMatter.excerpt 
            if (frontMatter.excerpt.split(' ').length > 20) {
              newExcerpt = frontMatter.excerpt.split(' ').slice(0, 20).join(' ').concat('...')
            }
            return (
              <li data-aos='fade-up' key={frontMatter.slug} className='flex flex-col justify-start items-start w-full max-w-xl' >
                <Link href={`/portfolio/${frontMatter.slug}`} onClick={handleClick} >{frontMatter.featureImage ? <Image src={frontMatter.featureImage} className='rounded-3xl md:max-h-[184.5px] md:min-h-[184.5px]' alt='' width={600} height={200} /> : <Image src='/assets/welcome.jpg' className='rounded-3xl md:max-h-[184.5px] md:min-h-[184.5px]' alt='' width={600} height={200} /> }</Link>
                <div className='flex flex-col justify-between items-start space-y-4 py-4'>
                    <Link href={`/portfolio/${frontMatter.slug}`} onClick={handleClick} ><h2 className='text-lg font-semibold text-[#1F3A6E] md:text-lg'>{frontMatter.title}</h2></Link>
                    <div dangerouslySetInnerHTML={{__html: newExcerpt}} className='text-[#6E7477] text-sm' />
                </div>
              </li>
            )
          }
        })}
      </ul>
      
      <div className='flex justify-between items-center space-x-1 xs:space-x-2 md:space-x-4 text-sm xs:text-base sm:text-lg'>
        <button disabled={projectActiveIndex === 0} onClick={() => onLoadMore('prev')} className={`${projectActiveIndex === 0 ? 'cursor-default opacity-25' : ''} w-[45px] h-[45px] border border-gray-300 rounded-full shadow-xl`} >
          <Image src='/assets/icons/backward.svg' className='mx-auto' alt='' width={10} height={10} />
        </button>
        {Array.from({length: noOfPages}, (_,index) => {
          //For less than 5 pages, show all pagination. If greater than 5, we go to else condition
          if (noOfPages <= 5) {
            return (
              <PaginationButton index={index} activeIndex={projectActiveIndex} onLoadMore={onLoadMore} />  
            )
          } else {
            if (projectActiveIndex === 0) { /*If projectActiveIndex is 0, then we show the first 3 and then the last one*/
              if (index < 3) {
                return (
                  <PaginationButton index={index} activeIndex={projectActiveIndex} onLoadMore={onLoadMore} />
                )
              }
              if (index === noOfPages -1) {
                return (
                  <>
                    <button className='cursor-default'>...</button>
                    <PaginationButton index={index} activeIndex={projectActiveIndex} onLoadMore={onLoadMore} />
                  </>
                )
              }
            } else if (projectActiveIndex === noOfPages - 1) { /*If projectActiveIndex is the last one, then we show the last 3 and the 1st one*/
              if (index === 0) {
                return (
                  <>
                    <PaginationButton index={index} activeIndex={projectActiveIndex} onLoadMore={onLoadMore} />
                    <button className='cursor-default'>...</button>
                  </>
                )
              }
              if (index > noOfPages - 1 - 3) {
                return (
                  <PaginationButton index={index} activeIndex={projectActiveIndex} onLoadMore={onLoadMore} />
                )
              }
            } else { /*If projectActiveIndex is somewhere in between 1st and last, then we show one forward and one backward of the projectActiveIndex and 1st and last*/
              if (index === 0) {
                return (
                  <>
                    <PaginationButton index={index} activeIndex={projectActiveIndex} onLoadMore={onLoadMore} />
                    {projectActiveIndex! <= RANGE_FORWARD_BACKWARD + 1 ? '' : <button className='cursor-default'>...</button>}
                  </>
                )
              }
              // Show one forward and one backward (If want to show 2 forward and backward, add two more conditions with -2 and +2)
              if (index > 0 && index < noOfPages - 1) {
                if (index >= projectActiveIndex! - RANGE_FORWARD_BACKWARD && index <= projectActiveIndex! + RANGE_FORWARD_BACKWARD) {
                // if (index === projectActiveIndex || index === projectActiveIndex - 1 || index === projectActiveIndex + 1) {
                  return (
                    <PaginationButton index={index} activeIndex={projectActiveIndex} onLoadMore={onLoadMore} />
                  )
                }
              }
              if (index === noOfPages - 1) {
                return (
                  <>
                    {projectActiveIndex! >= noOfPages - 1 - RANGE_FORWARD_BACKWARD - 1 ? '' : <button className='cursor-default'>...</button>}
                    <PaginationButton index={index} activeIndex={projectActiveIndex} onLoadMore={onLoadMore} />
                  </>
                )
              }
            }
          }
        })}
        <button disabled={projectActiveIndex === noOfPages - 1} onClick={() => onLoadMore('next')} className={`${projectActiveIndex === noOfPages - 1 ? 'cursor-default opacity-25' : ''} w-[45px] h-[45px] border border-gray-300 rounded-full shadow-xl`} >
          <Image src='/assets/icons/forward.svg' className='mx-auto' alt='' width={10} height={10} />
        </button>
      </div>

    </div>
  )
}

export default ProjectHomePage

// No of blogs per page
const BATCH_SIZE = 6

let RANGE_FORWARD_BACKWARD: number;
if (typeof window !== 'undefined' && window.innerWidth < 768) {
  // For screens lower than 768px
  RANGE_FORWARD_BACKWARD = 1
} else {
  // For screens greater than 768px
  RANGE_FORWARD_BACKWARD = 1
}