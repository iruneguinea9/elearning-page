import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/courses';
import Link from 'next/link';

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
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Courses</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, description, title }) => (
              <li className={utilStyles.listItem} key={id}>
              <Link href={`/courses/${id}`}>{title}
              <br />
              <small className={utilStyles.lightText}>
              <h4 className={utilStyles.listItem}>{description}</h4>
              </small></Link>
            </li>
            ))}
          </ul>
        </section>
        </Layout>
      );

    
}
