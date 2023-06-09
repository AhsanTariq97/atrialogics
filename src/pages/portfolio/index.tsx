import Head from 'next/head';

import Navbar from '../../components/Navbar';
import ProjectHomePage from '../../components/ProjectHomePage';
import Footer from '../../components/Footer';

import { getAllArticles } from '../../utils/mdx'


export default function Home({ posts }: Props): JSX.Element {

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='overflow-x-hidden'>
        <header>
          <Navbar />
        </header>
        <main className='pb-16 mx-auto lg:max-w-screen-xl md:max-w-screen-md'>
          <ProjectHomePage posts={posts} />
        </main>
        <footer className='w-full'>
          <Footer />
        </footer>
      </main>
    </>
  );
}

export async function getStaticProps() {

  const articles:any = await getAllArticles()

  articles
    .map((article: { data: any; }) => article.data)
    .sort((a: { data: { publishedAt: number; }; }, b: { data: { publishedAt: number; }; }) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1
      if (a.data.publishedAt < b.data.publishedAt) return -1

      return 0
    })

  return {
    props: {
      posts: articles.reverse(),
    },
  }
}


export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  featureImage: string;
  videoSrc: string;
  frontend: {
    title: string;
    stack: {
      name: string;
      icon: string;
      description: string;
    }[];
  };
  backend: {
    title: string;
    stack: {
      name: string;
      icon: string;
      description: string;
    }[];
  };
  CICD: {
    title: string;
    stack: {
      name: string;
      icon: string;
      description: string;
    }[];
  };
}

interface Props {
  posts: Post[];
}