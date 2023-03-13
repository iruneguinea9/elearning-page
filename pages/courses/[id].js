import { useState, useEffect } from 'react';
import fetcher from '../../lib/fetcher';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Format from '../../layout/format';

export default function Course({ postData }) {
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

export async function getStaticPaths() {
  // Call an API or fetch data from an external data source
  const accessToken = localStorage.getItem('token');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/courses`;
  const coursesData = await fetcher(url, accessToken);

  // Generate paths based on the fetched data
  const paths = coursesData.map((course) => ({
    params: { id: course.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch data for a single course
  const accessToken = localStorage.getItem('token');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/courses/${params.id}`;
  const postData = await fetcher(url, accessToken);

  return {
    props: {
      postData,
    },
  };
}