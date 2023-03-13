import Head from 'next/head';
import Link from 'next/link';
import { client } from '../../lib/apollo';
import { gql } from '@apollo/client';
import { useState } from 'react';

import Navbar from '../components/Navbar';
import BlogHomePage from '../components/BlogHomePage';
import Footer from '../components/Footer';

const POSTS_PER_PAGE = 9;

export default function Home({ posts, postsPageInfo }) {
  
  // console.log(postsPageInfo.pageInfo.endCursor)

  // const [ afterValue, setAfterValue ] = useState(null)

  // const handleNextPage = () => {
  //   if (postsPageInfo.pageInfo.hasNextPage) {
  //     setAfterValue(postsPageInfo.pageInfo.endCursor);
  //   }
  // };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend+Giga:wght@200;300;400;500;600;700;800;900&display=swap"rel="stylesheet"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className='overflow-x-hidden'>
        <header>
          <Navbar />
          <div className='py-[50px]'></div>
        </header>
        <main className='max-w-screen-xl mx-auto pb-16'>
          <BlogHomePage posts={posts} />
          {postsPageInfo.pageInfo.hasNextPage && (
            <div className='flex flex-col justify-center items-center'>
              {/* <button onClick={handleNextPage}> */}
                {/* <Link href={`/blogs?afterValue=${afterValue}`}>Next</Link> */}
              {/* </button> */}
            </div>
          )}
        </main>
        <footer className='w-full'>
          <Footer />
        </footer>
      </body>
    </>
  );
}

export async function getStaticProps() {

  // const { query } = context
  // const afterValue = query.afterValue || null

  const { data } = await client.query({
    query: gql`
      query GetWordPressPosts($first: Int!, $after: String) {
        posts(where: { orderby: { field: DATE, order: DESC } }, first: $first, after: $after) {
          nodes {
            content
            excerpt
            title
            slug
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
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
          edges {
            cursor
          }
        }
      }
    `,
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
  });

  // const endCursor = data.posts.pageInfo.endCursor;
  // setAfterValue(endCursor);

  // after = data.posts.pageInfo.endCursor;

  return {
    props: {
      posts: data.posts.nodes,
      postsPageInfo: data.posts,
      // afterValue,
    },
  };
}
