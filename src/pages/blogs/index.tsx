import Head from 'next/head';

import Navbar from '../../components/Navbar';
import BlogHomePage from '../../components/BlogHomePage';
import Footer from '../../components/Footer';

export default function Home(): JSX.Element {

  return (
    <>
      <Head>
        <title>Blogs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='overflow-x-hidden font-roboto'>
        <header>
          <Navbar />
        </header>
        <main className='pb-16 mx-auto lg:max-w-screen-xl md:max-w-screen-md'>
          <BlogHomePage />
        </main>
        <footer className='w-full'>
          <Footer />
        </footer>
      </main>
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