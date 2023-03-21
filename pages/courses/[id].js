// Name : ID
// Author : Irune Guinea
// With this page, each course has it's own page, it has the content of the course and
// A side navigation bar that allows the user to access the lesson they want to 
// Last update 20/03/2023 - V2


// ########################################## IMPORTS ##########################################
import { useState } from 'react';
import { useRouter } from 'next/router';
import fetcher from '../../lib/fetcher';
import useSWR from 'swr';
import { parseCookies } from 'nookies';
import Head from 'next/head';
import Format from '../../layout/format';
import styles from '../../styles/course.module.css';
import styles2 from '../../styles/styles.module.css';
import Login from '../../components/loginNeeded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog ,faTrashAlt,faEdit } from '@fortawesome/free-solid-svg-icons';

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
  const [showButtons, setShowButtons] = useState(false);
  const callEdit = () => {
      router.push({
    pathname: '/editCourse',
    query: { courseData: JSON.stringify(id) }
  });
  };

  // this is for managing the buttons in the bottom-right corner
  const toggleButtons = () => {
    setShowButtons(!showButtons);
    const container = document.querySelector(`.${styles2.buttonContainer}`);
    container.style.opacity = showButtons ? 0 : 1;
  };

  // #################################### OTHER POSSIBLE RETURNS ################################
  if (cookies.token === undefined) {
    return <Login />;
  }

  if (error) return <div>Error loading course data.</div>;
  if (!course) return <div>Loading course data...</div>;

  // ########################################## RETURN ##########################################
  return (
    <>
      <Format>
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
                      setShowButtons(false);
                    }}
                  >
                    {lesson.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1', marginLeft: '20px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 5, left: 0, cursor: 'pointer' }} onClick={() => setShowNav(!showNav)}>
              <img src="/images/moreinfo.png" alt="Toggle navigation" />
            </div>
            <div style={{ position: 'absolute', top: 0, left: 100, cursor: 'pointer' }}>
              <h1 style={{ fontSize: '3em' }}>{course.title}</h1>
              <p>{course.description}</p>
              {selectedLesson && (
                <div key={selectedLesson.title} style={{ marginBottom: '40px', marginTop: '10px' }}>
                  <h2 id={selectedLesson.title}>{selectedLesson.title}</h2>
                  <p>{selectedLesson.content}</p>
                </div>
              )}
            </div>
            {showButtons && (
              <div className={`${styles2.buttonContainer} ${showButtons ? styles2.showButtons : ''}`}>
                <button className={styles2.innerButton1}  onClick={() => callEdit()}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className={styles2.innerButton2}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            )}

          <button className={styles2.addButton} onClick={() => setShowButtons(!showButtons)}>
            <FontAwesomeIcon icon={faCog} />
          </button>
          
        </div>
      </div>
    </Format>
  </>
  );
}