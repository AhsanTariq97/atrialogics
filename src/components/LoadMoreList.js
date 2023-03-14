// import { client } from '../../lib/apollo';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image'


const GET_POSTS = gql`
    query GetWordPressPosts($first: Int!, $after: String) {
        posts(where: { orderby: { field: DATE, order: DESC } }, first: $first, after: $after) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
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

  const BATCH_SIZE = 3

  export default function LoadMoreList() {
    const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
        variables: {first: BATCH_SIZE, after: null},
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
    const haveMorePosts = Boolean(data?.posts?.pageInfo?.hasNextPage)

    const minRead = (content) => {
        const words = content.split(' ')
        const minutesToRead = Math.ceil(words.length / 200);
        return minutesToRead
    }

    const onLoadMore = () => {
        fetchMore({
          variables: { after: data.posts.pageInfo.endCursor },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.posts.edges;
            const pageInfo = fetchMoreResult.posts.pageInfo;
    
            return newEdges.length
              ? {
                  posts: {
                    __typename: previousResult.posts.__typename,
                    edges: [...previousResult.posts.edges, ...newEdges],
                    pageInfo,
                  },
                }
              : previousResult;
          },
        });
    };

    return (
        <div className='flex flex-col justify-between items-center space-y-8 py-8 w-[90%] mx-auto'>
        <h2 className='text-lg font-bold md:text-2xl py-4'>Blogs</h2>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {posts.map((post) => {
                    const { slug, title, excerpt, content, featuredImage, author } = post;
                    console.log('tect', posts)
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
            {console.log(data.posts.pageInfo.endCursor)}
            {haveMorePosts ? (
                <button type="button" onClick={onLoadMore}>
                {loading ? "Loading..." : "Load More"}
                </button>
            ) : (
                <p>All posts loaded</p>
            )}
        </div>
    )
  }