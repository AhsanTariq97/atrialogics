import { client } from '../../../lib/apollo'
import { gql } from '@apollo/client'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import BlogPage from '../../components/BlogPage'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'

export default function Blogs({ post }) {
  
    let sectionIndex = 0;
    const processedContent = post.content?.replace(/<(h[1-6])/g, (match, p1) => {
        sectionIndex++;
        return `<${p1} id="section${sectionIndex}" class="before:block before:h-[100px] before:-mt-[100px]"`;
    });

    // To determine how long it will take to read the post. General speed is 200 words per minute. Change 200 to something else to change the rate.
    const minRead = (content) => {
        const words = content.split(' ')
        const minutesToRead = Math.ceil(words.length / 200);
        return minutesToRead
    }
  
    const [headings, setHeadings] = useState([]);
    useEffect(() => {
        const content = processedContent;
        const parser = new DOMParser();
        const parsedContent = parser.parseFromString(content, "text/html");
        const headings = parsedContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
        setHeadings(Array.from(headings));
    }, []);

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
                <main className='max-w-screen-xl mx-auto'>
                    <div className='flex flex-col justify-between items-start px-8 pb-16 space-y-16'>
                        {post.featuredImage ? <Image className='rounded-3xl self-center h-[80vh]' src={post.featuredImage.node.sourceUrl} width={800} height={500} /> : <Image src='/assets/ecommerce.svg' className='rounded-3xl self-center h-[80vh]' alt='' width={800} height={500} /> }
                        <h1 className='text-4xl font-bold w-full text-left'>{post.title}</h1>
                        <div className='flex justify-start items-center space-x-16'>
                            <h3 className='text-lg font-medium'>{post.author.node.name}</h3>
                            {post.content && <p>{`${minRead(processedContent)} min read`}</p>}
                        </div>
                        <BlogPage headings={headings} processedContent={processedContent} post={post} />
                        <Link href='/blogs'>&larr; Back to Blog</Link>
                    </div>
                </main>
                <footer className='w-full'>
                    <Footer />
                </footer>
            </body>
        </>
    )
}

export async function getStaticPaths() {
    const result = await client.query({
        query: gql`
            query GetPosts {
                posts {
                    nodes {
                        slug
                    }
                }
            }
        `
    })

    return {
        paths: result.data.posts.nodes.map(({ slug }) => {
            return {
                params: { slug }
            }
        }),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const result = await client.query({
        query: gql`
            query GetPostDataBySlug($slug: String!) {
                postBy(slug: $slug) {
                    title
                    content
                    date
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
        `,
        variables: { slug }
    })

    return {
        props: {
            post: result.data.postBy
        }
    }
}