import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const articlesPath = path.join(process.cwd(), 'data/projects')

export async function getSlug() {
  const paths = await fs.promises.readdir(path.join(process.cwd(), 'data/projects'))

  return paths.map((path) => {
    // holds the paths to the directory of the article
    const pathContent = path.split('/')
    const fileName = pathContent[pathContent.length - 1]
    const [slug, _extension] = fileName.split('.')

    return slug
  })
}

export async function getArticleFromSlug(slug: string) {
  const articleDir = path.join(articlesPath, `${slug}.mdx`)
  const source = fs.readFileSync(articleDir)
  const { content, data } = matter(source)

  return {
    content,
    frontmatter: {
      slug,
      excerpt: data.excerpt,
      title: data.title,
      ...data,
    },
  }
}

export async function getAllArticles() {
    const articles = fs.readdirSync(path.join(process.cwd(), 'data/projects'))
  
    return articles.reduce<any>((allArticles, articleSlug) => {
      // get parsed data from mdx files in the "articles" dir
      const source = fs.readFileSync(
        path.join(process.cwd(), 'data/projects', articleSlug),
        'utf-8'
      )
      const { data } = matter(source)
  
      return [
        {
          ...data,
          slug: articleSlug.replace('.mdx', ''),
        },
        ...allArticles,
      ]
    }, [])
  }
  