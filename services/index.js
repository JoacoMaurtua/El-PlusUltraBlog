import { request, gql } from 'graphql-request'; //gql es un objeto que permite hacer consultas

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

//Controlador para traer todos los posts
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

  return result.postsConnection.edges;
};


//Controlador para traer los posts mas recientes

export const getRecentPosts = async () =>{
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title
        featureImage{
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query);

  return result.posts;
}

//Controlador para traer posts similares al que se tiene en pantalla

export const getSimilarPosts = async () =>{
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]){
      posts(
        where: { slug_not: $slug, AND {categories_some: { slug_in: $categories}}}
        last: 3
      ){
        title
        featureImage{
          url
        }
        createdAt
        slug
      }
    }
  
  `
  const result = await request(graphqlAPI, query);

  return result.posts;
}

