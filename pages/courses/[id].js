import { getAllPostIds, getPostData } from '../../lib/courses';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Format from '../../layout/format';

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
  
    return {
      props: {
        postData,
      },
    };
  }

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
export default function Course({ postData }) {
    return (
      <Format>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <h2 className={utilStyles.headingMd}>{postData.description}</h2>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Format>
    );
  }