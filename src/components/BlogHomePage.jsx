import Link from 'next/link';
import Image from 'next/image'


const BlogHomePage = ({posts}) => {

  const minRead = (content) => {
      const words = content.split(' ')
      const minutesToRead = Math.ceil(words.length / 200);
      return minutesToRead
  }
  
  return (
    <div className='flex flex-col justify-between items-center py-8 w-[90%] mx-auto'>
        <h2 className='text-lg font-bold md:text-2xl py-4'>Blogs</h2>
        {/* <ul className='flex justify-between items-start flex-wrap space-y-4'> */}
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.map((post) => {
            const { slug, title, excerpt, content, featuredImage, author } = post;
            return (
            <li key={slug} className='flex justify-between items-start w-full max-w-xl' >
                <Link href={`/blogs/${slug}`} >
                    {featuredImage ? <Image src={featuredImage.node.sourceUrl} className='rounded-3xl' alt='' width={600} height={200} /> : <Image src='/assets/Atrialogics.png' className='rounded-3xl min-h-[180px]' alt='' width={600} height={200} /> }
                    <div className='flex flex-col justify-between items-start space-y-2 py-4'>
                        <h3 className='text-lg font-semibold md:text-lg'>{title}</h3>
                        <div dangerouslySetInnerHTML={{__html: excerpt}} className='text-[#6E7477] text-sm' />
                        <div className='flex justify-start items-center space-x-16'>
                          <h3 className='text-sm font-medium'>{author.node.name}</h3>
                          {content && <p className='text-sm font-medium'>{`${minRead(content)} min read`}</p>}
                        </div>
                    </div>
                </Link>
            </li>
          )})}
        </ul>
    </div>
  )
}

export default BlogHomePage