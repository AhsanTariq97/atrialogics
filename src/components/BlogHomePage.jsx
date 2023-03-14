// import { client } from '../../lib/apollo';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image'
import { useState } from 'react'


export default function BlogHomePage() {

  // const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
      variables: {size: BATCH_SIZE, offset: 0},
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

  // console.log(noOfPages)

  const minRead = (content) => {
      const words = content.split(' ')
      const minutesToRead = Math.ceil(words.length / 200);
      return minutesToRead
  }


  const onLoadMore = (index) => {
    // const nextPage = currentPage + 1;
    setActiveIndex(index);

    const offset = index * BATCH_SIZE;
    console.log(offset)
      fetchMore({
        // variables: { offset: data.posts.pageInfo.endCursor },
        variables: { offset: offset },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          // setCurrentPage(nextPage);
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
                  // console.log('tect', posts)
                  return (
                      <li key={slug} className='flex flex-col justify-start items-start w-full max-w-xl' >
                        <Link href={`/blogs/${slug}`} >{featuredImage ? <Image src={featuredImage.node.sourceUrl} className='rounded-3xl min-h-[180px] max-h-[250px]' alt='' width={600} height={200} /> : <Image src='/assets/ecommerce.svg' className='rounded-3xl min-h-[180px] max-h-[250px]' alt='' width={600} height={200} /> }</Link>
                        <div className='flex flex-col justify-between items-start space-y-4 py-4'>
                            <Link href={`/blogs/${slug}`} ><h2 className='text-lg font-semibold md:text-lg'>{title}</h2></Link>
                            <div dangerouslySetInnerHTML={{__html: excerpt}} className='text-[#6E7477] text-sm' />
                            <div className='flex justify-start items-center space-x-16'>
                                <h3 className='text-sm font-medium'>{author.node.name}</h3>
                                {content && <p className='text-sm font-medium'>{`${minRead(content)} min read`}</p>}
                            </div>
                        </div>
                      </li>
                  )
              })}
          </ul>
          <div className='flex justify-between items-center space-x-2 text-lg'>
            {Array.from({length: noOfPages}, (_,index) => (
              <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
            ))}
            {/* <button type="button" onClick={onLoadMore}>2</button>
            <button type="button" onClick={onLoadMore}>3</button>
            <button type="button" onClick={onLoadMore}>4</button> */}
          </div>
      </div>
  )
}

const BATCH_SIZE = 3

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