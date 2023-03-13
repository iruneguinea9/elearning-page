import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Format from '../../layout/format';
import fetcher from '../../lib/fetcher';
import { parseCookies } from 'nookies';

export default function Course({ postData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!postData) {
    return <div>No data found</div>;
  }
  return (
    <Format>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <div className="container md:px-20 ">
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <h2 className={utilStyles.headingMd}>{postData.description}</h2>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
    </Format>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const { id } = params;

  const cookies = parseCookies({ req });
  const accessToken = cookies.token;

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`;
    console.log('fetching data from', url);
    console.log('accessToken', accessToken);
    const postData = await fetcher(url, accessToken, { timeout: context.serverRuntimeConfig.timeout });
    console.log('postData', postData);
    return {
      props: {
        postData,
      },
    };
  } catch (error) {
    console.error(error);
    res.writeHead(302, { Location: '/authenticatedindex' });
    res.end();
  }
}