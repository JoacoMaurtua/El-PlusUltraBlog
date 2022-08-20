/* 
  Cualquier archivo que este dentro del folder/api
  se asigna a la ruta api/.... y se tratara como una
  API endpoint en lugar de una pagina
*/

import { GraphQLClient, gql } from 'graphql'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default function comments(req,res){
  const {name, email, slug, comment} = req.body;
  const graphQLClient = new GraphQLClient(graphqlAPI,{
    headers:{
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })

  //una mutacion en graphql significa una consulta en la que vamos a actualizar o agregar algunos datos nuevos
  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: { name: $name, email: $email, comment: $comment, post: {connect:{slug:$slug} }}) {id}
    }
  `

  const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result);
}