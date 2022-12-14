import Head from 'next/head';
import {PostCard, Categories, PostWidget} from '../components/index';
import { FeaturedPosts } from '../sections/index';

import {getPosts} from '../services/index';


export default function Home({posts}) {
  console.log(posts)
  return (
    <div className="container mx-auto px-10 mb-8 "> {/* Clase predefinidas de tailwind */}
      <Head>
        <title>FalconsDev Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <FeaturedPosts/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={post.title}/>
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
        </div>
      </div>
    </div>
  );
}

//Forma de Next.js para extraer data de una API y pasarsela al componente
//Metodo para lograr contenido estatico(prerenderizado)

export async function getStaticProps(){
  const posts = (await getPosts()) || [];

  return{
    props: { posts }
  }

}