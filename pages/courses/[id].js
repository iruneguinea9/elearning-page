// Name : ID
// Author : Irune Guinea
// With this page, each course has it's own page, it has the content of the course and
// A side navigation bar that allows the user to access the lesson they want to 
// Last update 16/03/2023 - V1


// ########################################## IMPORTS ##########################################
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
  // ########################################## FETCHING ##########################################
  const { data: course, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
    (url) => fetcher(url, cookies.token)
  );

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };  
  // #################################### OTHER POSSIBLE RETURNS ################################
  if(cookies.token===undefined){
    return (
      <Login></Login>
     
    );
  }
  
  if (error) return <div>Error loading course data.</div>;
  if (!course) return <div>Loading course data...</div>;
  // ########################################## RETURN ##########################################
  return (
    <>
      <Format>
        <Head>
          <title>eLearning</title>
        </Head>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flex: '0 0 200px', display: showNav ? 'block' : 'none' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {course.lessons.map((lesson) => (
                <li key={lesson.title}>
                  <a
                    className={styles.lessonButton}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setShowNav(false);
                    }}
                  >
                    {lesson.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1', marginLeft: '20px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 5, left: 0, cursor: 'pointer' }} onClick={toggleNav}>
              <img src="/images/moreinfo.png" alt="Toggle navigation" />
            </div>
            <div style={{ position: 'absolute', top: 0, left: 100, cursor: 'pointer' }}>
            <h1 style={{ fontSize: '3em'}}>{course.title}</h1>
            <p>{course.description}</p>
            {selectedLesson && (
              <div key={selectedLesson.title} style={{ marginBottom: '40px', marginTop: '10px' }}>
                <h2 id={selectedLesson.title}>{selectedLesson.title}</h2>
                <p>{selectedLesson.content}</p>
              </div>
            )}</div>
          </div>
        </div>
      </Format>
    </>
  );
}