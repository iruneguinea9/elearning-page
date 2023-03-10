import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/courses';
import Link from 'next/link';
import Footer from "../components/footer"

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <>
      <header className="bg-gray-400">
      <div className="xl:container xl:mx-auto flex flex-col items-center  sm:justify-between text-center py-3">
              <Link href={"/"}>
                  <h1 className="font-bold text-4xl">eLearning platform</h1>
              </Link>          
      </div>  
      </header>
          <h1> In the future this will be a cool page to access the login</h1>
           <Link href={`singin`}>click here to log in</Link>
      <Footer></Footer>
     </>    
      );
 
    
}
