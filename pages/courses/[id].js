import { useRouter } from 'next/router'
import fetcher from '../../lib/fetcher';
import useSWR from 'swr';
import { parseCookies } from 'nookies';
import Head from "next/head"
import Format from '../../layout/format';

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const cookies = parseCookies();

  const { data: course, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, (url) => fetcher(url, cookies.token));

  if (error) return <div>Error loading course data.</div>; 
  if (!course) return <div>Loading course data...</div>;

  return (
    <> <Format>
    <Head>
        <title>eLearning</title>
    </Head>
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 200px' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {course.lessons.map((lesson) => (
              <li key={lesson.title}>
                <a href={`#${lesson.title}`}>{lesson.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1' }}>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          {course.lessons.map((lesson) => (
            <div key={lesson.title} style={{ marginBottom: '40px' }}>
              <h2 id={lesson.title}>{lesson.title}</h2>
              <p>{lesson.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Format>
    </>
  );
}