import Head from 'next/head';
import Link from 'next/link';
import { client } from '../../lib/apollo';
import { gql } from '@apollo/client';
import { useState } from 'react';

import Navbar from '../components/Navbar';
import BlogHomePage from '../components/BlogHomePage';
import BlogHomePage2 from '../components/BlogHomePage2';
import Footer from '../components/Footer';
import LoadMoreList from '../components/LoadMoreList'

export default function Home(): JSX.Element {

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
          {/* <BlogHomePage posts={posts} /> */}
          <BlogHomePage2 />


        </main>
        <footer className='w-full'>
          <Footer />
        </footer>
      </body>
    </>
  );
}

// const POSTS_PER_PAGE = 3

// export async function getStaticProps() {

//   const { data } = await client.query({
//     query: gql`
//       query GetWordPressPosts($offset: Int!, $size: Int!) {
//         posts(where: {offsetPagination: {offset: $offset, size: $size}, orderby: {field: DATE, order: DESC}}) {
//           pageInfo {
//             offsetPagination {
//               hasMore
//               hasPrevious
//               total
//             }
//           }
//           edges {
//               node {
//                   content
//                   excerpt
//                   slug
//                   title
//                   featuredImage {
//                       node {
//                       sourceUrl
//                       }
//                   }
//                   author {
//                       node {
//                       name
//                       }
//                   }
//               }
//           }
//         }
//       }
//     `,
//     variables: {
//       size: POSTS_PER_PAGE,
//       offset: 0,
//     },
//   });

//   return {
//     props: {
//       posts: data.posts.edges.map((edge) => edge.node),
//       postsPageInfo: data.posts.pageInfo.offsetPagination,
//     },
//   };
// }