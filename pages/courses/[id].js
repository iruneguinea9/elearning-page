import { useState } from 'react';
import { useRouter } from 'next/router';
import fetcher from '../../lib/fetcher';
import useSWR from 'swr';
import { parseCookies } from 'nookies';
import Head from 'next/head';
import Format from '../../layout/format';
import styles from '../../styles/course.module.css';

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const cookies = parseCookies();

  const { data: course, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
    (url) => fetcher(url, cookies.token)
  );

  const [selectedLesson, setSelectedLesson] = useState(null);

  if (error) return <div>Error loading course data.</div>;
  if (!course) return <div>Loading course data...</div>;

  return (
    <>
      <Format>
  <Head>
    <title>eLearning</title>
  </Head>
  <div style={{ display: 'flex', alignItems: 'stretch' }}>
    <div style={{ flex: '0 0 200px' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {course.lessons.map((lesson) => (
          <li key={lesson.title}>
            <a
              className={styles.lessonButton}
              onClick={() => setSelectedLesson(lesson)}
            >
              {lesson.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div style={{ flex: '1', marginLeft: '20px' }}>
      <h1 style={{ fontSize: '3em'}}>{course.title}</h1>
      <p>{course.description}</p>
      {selectedLesson && (
        <div key={selectedLesson.title} style={{ marginBottom: '40px', marginTop: '10px' }}>
          <h2 id={selectedLesson.title}>{selectedLesson.title}</h2>
          <p>{selectedLesson.content}</p>
        </div>
      )}
    </div>
  </div>
</Format>
    </>
  );
}