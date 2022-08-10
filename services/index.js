import { request, gql } from 'graphql-request';

const graphqlAPI = 'https://api-sa-east-1.hygraph.com/v2/cl6ces2uv12ju01ui6ul41b8p/master';

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  console.log('result: ',result);

  return result.postsConnection.edges;
};


