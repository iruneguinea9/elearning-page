// Name : ID
// Author : Irune Guinea
// With this page, each course has it's own page, it has the content of the course and
// A side navigation bar that allows the user to access the lesson they want to 
// Last update 27/03/2023 - V4


// ########################################## IMPORTS ##########################################
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetcher from '../../lib/fetcher';
import fetcherDelete from '../../lib/fetcherDelete';
import useSWR from 'swr';
import { parseCookies } from 'nookies';
import Format from '../../layout/format';
import styles from '../../styles/course.module.css';
import styles2 from '../../styles/styles.module.css';
import Login from '../../components/loginNeeded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const [cookies, setCookies] = useState({});

  useEffect(() => {
    setCookies(parseCookies());
  }, []);

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
  const callDelete = async () => {
    try {
      await fetcherDelete(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, cookies.token);
      router.push('/authenticatedindex');
    } catch (error) {
      console.error(error);
    }
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
  if (!course.lessons) return <div>No lessons found for this course.</div>;
  // test

  // ########################################## RETURN ##########################################
  return (
    <>
      <Format>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: '2', width: showNav ? '200px' : '0px', overflow: 'hidden' }}>
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
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: '1', width: '100%' }}>
            <div style={{ marginLeft: showNav ? '200px' : '0px' }}>
              <div style={{ position: 'absolute', top: 5, left: 0, cursor: 'pointer' }} onClick={() => setShowNav(!showNav)}>
                <img src="/images/moreinfo.png" alt="Toggle navigation" />
              </div>
              <div style={{ marginTop: '10px' }}>
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
                  <button className={styles2.innerButton1} onClick={() => callEdit()}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className={styles2.innerButton2} onClick={() => callDelete()}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              )}
              <button className={styles2.addButton} onClick={() => setShowButtons(!showButtons)}>
                <FontAwesomeIcon icon={faCog} />
              </button>
            </div>
          </div>
        </div>
      </Format>
    </>
  );
}