// Name : ID
// Author : Irune Guinea
// With this page, each course has it's own page, it has the content of the course and
// A side navigation bar that allows the user to access the lesson they want to 
// Last update 29/03/2023 - V7


// ########################################## IMPORTS ##########################################
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetcher from '../../lib/fetcher';
import fetcherDelete from '../../lib/fetcherDelete';
import useSWR from 'swr';
import { parseCookies } from 'nookies';
import Format from '../../layout/format';
import styles from '../../styles/styles.module.css';
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
    <div className="relative">
      <div className="bg-blue-400 absolute top-0 left-0 z-10 h-90vh w-0 overflow-hidden" style={{ width: showNav ? '200px' : '0px' }}>
        <ul className="list-none p-0">
          {course.lessons.map((lesson) => (
            <li key={lesson.title}>
              <a
                className="block w-full py-2 px-4 text-white text-center bg-gray-400 hover:bg-blue-300 cursor-pointer"
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
            <div style={{ marginLeft: '200px' }}>
              <div style={{ position: 'absolute', top: 10, left: 5, cursor: 'pointer' }} onClick={() => setShowNav(!showNav)}>
                <img src="/images/moreinfo.png" alt="Toggle navigation" />
              </div>
              <div className="relative h-400 w-fit-content p-20 ml-10 flex-grow-1 mt-10">
                <h1 className="text-3xl font-bold mb-10">{course.title}</h1>
                <p>{course.description}</p>
                {selectedLesson && (
                  <div key={selectedLesson.title} className="mb-40 mt-10">
                    <h2 id={selectedLesson.title}>{selectedLesson.title}</h2>
                    <p>{selectedLesson.content}</p>
                  </div>
                )}
              </div>
              {showButtons && (
                <div className={`fixed top-10 right-20 flex flex-col transition-opacity duration-200 opacity-0} ${showButtons ? 'opacity-100' : ''}`}>
                  <button className={"fixed bottom-16 right-20 bg-blue-500 hover:bg-blue-600 text-white  rounded-full cursor-pointer text-center inline-block transition-all duration-200 ease-in-out"} onClick={() => callEdit()}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className={"fixed bottom-28 right-5 bg-blue-500 hover:bg-blue-600 text-white  rounded-full cursor-pointer text-center inline-block transition-all duration-200 ease-in-out"} onClick={() => callDelete()}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              )}
              <button className={"fixed bottom-16 right-5 bg-blue-500 hover:bg-blue-600 text-white  rounded-full cursor-pointer text-center"} onClick={() => setShowButtons(!showButtons)}>
                <FontAwesomeIcon icon={faCog} />
              </button>
            </div>
          </div>
        </div>
      </Format>
    </>
  );
}