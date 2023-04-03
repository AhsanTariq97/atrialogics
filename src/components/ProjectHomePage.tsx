import React from 'react'

import { getAllArticles } from '../../data/'


const ProjectHomePage = () => {
  return (
    <div className='flex flex-col justify-between items-center space-y-8 py-8 w-[90%] mx-auto'>
      <h2 data-aos='fade-down' className='text-2xl font-bold md:text-3xl py-4 [text-shadow:_0_10px_20px_rgb(0_0_0_/_20%)]'>Portfolio</h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {posts.map((frontMatter) => {
            return (
              <Link href={`/blog/${frontMatter.slug}`} passHref>
                <div>
                  <h1 className="title">{frontMatter.title}</h1>
                  <p className="summary">{frontMatter.excerpt}</p>
                </div>
              </Link>
            )
          })}
      </ul>
    </div>
  )
}

export default ProjectHomePage

export async function getStaticProps() {
  const articles = await getAllArticles()

  articles
    .map((article) => article.data)
    .sort((a, b) => {
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


