import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/courses';
import Link from 'next/link';
import Format from '../layout/format';

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
        <Format>
          <h1> In the future this will be a cool page to access the login</h1>
           <Link href={`singin`}>click here to log in</Link>
        </Format>
      );

    
}
