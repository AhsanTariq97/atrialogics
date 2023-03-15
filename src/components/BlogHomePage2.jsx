// import { client } from '../../lib/apollo';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';


export default function BlogHomePage() {

  // const [currentPage, setCurrentPage] = useState(1);
  
  // const [activeIndex, setActiveIndex] = useState(0);

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const storedState = sessionStorage.getItem("myActiveIndex");
    if (storedState === null) {
      setActiveIndex(0)
    } else {
      setActiveIndex(JSON.parse(storedState));
    }
  }, [])

  const handleClick = () => {
    sessionStorage.setItem("myActiveIndex", JSON.stringify(activeIndex));
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('myActiveIndex', JSON.stringify(activeIndex))
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [activeIndex])

  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
      variables: {size: BATCH_SIZE, offset: activeIndex * BATCH_SIZE},
      notifyOnNetworkStatusChange: true,
  }) 

  if (error) {
      return <p>Error occured</p>
  }
  if (!data && loading) {
      return <p>Loading...</p>
  }
  if(!data?.posts.edges.length) {
      return <p>No posts</p>
  }

  const posts = data.posts.edges.map((edge) => edge.node)
  const haveMorePosts = Boolean(data?.posts?.pageInfo?.offsetPagination?.hasMore)
  const totalPosts = data.posts.pageInfo.offsetPagination.total
  const noOfPages = Math.ceil(totalPosts / BATCH_SIZE)

  const minRead = (content) => {
      const words = content.split(' ')
      const minutesToRead = Math.ceil(words.length / 200);
      return minutesToRead
  }

  const onLoadMore = (index) => {
    let offset
    
    if (index === 'prev') {
      setActiveIndex(activeIndex - 1);
      offset = activeIndex * BATCH_SIZE - BATCH_SIZE
    } else if (index === 'next') {
      setActiveIndex(activeIndex + 1);
      offset = activeIndex * BATCH_SIZE + BATCH_SIZE
    } else {
      setActiveIndex(index)
      offset = index * BATCH_SIZE;
    }
    
      fetchMore({
        variables: { offset: offset },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          return fetchMoreResult;
        },
      });
  };
  
  return (
      <div className='flex flex-col justify-between items-center space-y-8 py-8 w-[90%] mx-auto'>
      <h2 className='text-lg font-bold md:text-2xl py-4'>Blogs</h2>
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {posts.map((post) => {
                  const { slug, title, excerpt, content, featuredImage, author } = post;

                  // For lengthy excerpts, making it limit to 30 words only
                  let newExcerpt = excerpt 
                  if (excerpt.split(' ').length > 30) {
                    newExcerpt = excerpt.split(' ').slice(0, 30).join(' ').concat('...')
                  }
                  return (
                      <li key={slug} className='flex flex-col justify-start items-start w-full max-w-xl' >
                        <Link href={`/blogs/${slug}`} onClick={handleClick} >{featuredImage ? <Image src={featuredImage.node.sourceUrl} className='rounded-3xl md:max-h-[250px] md:min-h-[250px]' alt='' width={600} height={200} /> : <Image src='/assets/welcome.jpg' className='rounded-3xl md:max-h-[250px] md:min-h-[250px]' alt='' width={600} height={200} /> }</Link>
                        <div className='flex flex-col justify-between items-start space-y-4 py-4'>
                            <Link href={`/blogs/${slug}`} onClick={handleClick} ><h2 className='text-lg font-semibold md:text-lg'>{title}</h2></Link>
                            <div dangerouslySetInnerHTML={{__html: newExcerpt}} className='text-[#6E7477] text-sm' />
                            <div className='flex justify-start items-center space-x-16'>
                                <h3 className='text-sm font-medium'>{author.node.name}</h3>
                                {content && <p className='text-sm font-medium'>{`${minRead(content)} min read`}</p>}
                            </div>
                        </div>
                      </li>
                  )
              })}
          </ul>
          <div className='flex justify-between items-center space-x-1 xs:space-x-2 text-sm xs:text-base sm:text-lg'>
            <button disabled={activeIndex === 0} onClick={() => {
              onLoadMore('prev')
              handleClick
              }} className={`${activeIndex === 0 ? 'cursor-not-allowed opacity-25' : ''}`} >&lt;</button>
            {Array.from({length: noOfPages}, (_,index) => {
              //For less than 5 pages, show all pagination. If greater than 5, we go to else condition
              if (noOfPages <= 5 ) {
                return (
                  <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
                )
              } else {
                if (activeIndex === 0) { /*If activeIndex is 0, then we show the first 3 and then the last one*/
                  if (index < 3) {
                    return (
                      <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
                    )
                  }
                  if (index === noOfPages -1) {
                    return (
                      <>
                        <button className='cursor-default'>...</button>
                        <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
                      </>
                    )
                  }
                } else if (activeIndex === noOfPages - 1) { /*If activeIndex is the last one, then we show the last 3 and the 1st one*/
                  if (index === 0) {
                    return (
                      <>
                        <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
                        <button className='cursor-default'>...</button>
                      </>
                    )
                  }
                  if (index > noOfPages - 1 - 3) {
                    return (
                      <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
                    )
                  }
                } else { /*If activeIndex is somewhere in between 1st and last, then we show one forward and one backward of the activeIndex and 1st and last*/
                  if (index === 0) {
                    return (
                      <>
                        <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
                        {activeIndex <= RANGE_FORWARD_BACKWARD + 1 ? '' : <button className='cursor-default'>...</button>}
                      </>
                    )
                  }
                  // Show one forward and one backward (If want to show 2 forward and backward, add two more conditions with -2 and +2)
                  if (index > 0 && index < noOfPages - 1) {
                    if (index >= activeIndex - RANGE_FORWARD_BACKWARD && index <= activeIndex + RANGE_FORWARD_BACKWARD) {
                    // if (index === activeIndex || index === activeIndex - 1 || index === activeIndex + 1) {
                      return (
                        <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
                      )
                    }
                  }
                  if (index === noOfPages - 1) {
                    return (
                      <>
                        {activeIndex >= noOfPages - 1 - RANGE_FORWARD_BACKWARD - 1 ? '' : <button className='cursor-default'>...</button>}
                        <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
                      </>
                    )
                  }
                }
              }
            })}
            <button disabled={activeIndex === noOfPages - 1} onClick={() => onLoadMore('next')} className={`${activeIndex === noOfPages - 1 ? 'cursor-not-allowed opacity-25' : ''}`} >&gt;</button>
          </div>
      </div>
  )
}

const BATCH_SIZE = 10

// For range in pagination when in between 1st and last, enter forward and backward value here
let RANGE_FORWARD_BACKWARD
if (typeof window !== 'undefined' && window.innerWidth < 768) {
  // For screens lower than 768px
  RANGE_FORWARD_BACKWARD = 1
} else {
  // For screens greater than 768px
  RANGE_FORWARD_BACKWARD = 2
}

const GET_POSTS = gql`
  query GetWordPressPosts($offset: Int!, $size: Int!) {
      posts(where: {offsetPagination: {offset: $offset, size: $size}, orderby: {field: DATE, order: DESC}})  {
          pageInfo {
            offsetPagination {
              hasMore
              total
            }
          }
          edges {
              node {
                  content
                  excerpt
                  slug
                  title
                  featuredImage {
                      node {
                      sourceUrl
                      }
                  }
                  author {
                      node {
                      name
                      }
                  }
              }
          }
      }
  }
`