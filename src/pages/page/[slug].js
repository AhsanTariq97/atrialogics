






export async function getStaticPaths() {
    const result = await client.query({
        query: gql`
        query GetWordPressPosts($offset: Int!, $size: Int!) {
            posts(where: {offsetPagination: {offset: $offset, size: $size}, orderby: {field: DATE, order: DESC}}) {
              pageInfo {
                offsetPagination {
                  hasMore
                  hasPrevious
                  total
                }
              }
            }
          }
        `
    })

    return {
        paths: result.data.posts.pageInfo.map(({ slug }) => {
            return {
                params: { slug }
            }
        }),
        fallback: false
    }
}