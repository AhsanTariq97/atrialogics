import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

// Path to the directory containing articles
const articlesPath = path.join(process.cwd(), 'data/projects')

// This function reads the directory and returns an array of article slugs. It extracts the slug from each file name.
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

// This function takes a slug as input and returns the corresponding article content and front matter data. 
// It reads the content of the MDX file associated with the slug and extracts the front matter using 'gray-matter'.
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

// This function reads all MDX files in the directory and returns an array of objects each representing an article with its metadata. 
// It extracts the metadata from the front matter of each MDX file.
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
