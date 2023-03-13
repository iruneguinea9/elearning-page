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
  const { params, req } = context;
  const { id } = params;

  const cookies = parseCookies({ req });
  const accessToken = cookies.token;

  try {
    const postData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, accessToken);

    return {
      props: {
        postData,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
}