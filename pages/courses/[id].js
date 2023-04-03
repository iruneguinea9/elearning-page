// Name : ID
// Author : Irune Guinea
// With this page, each course has it's own page, it has the content of the course and
// A side navigation bar that allows the user to access the lesson they want to 
// Last update 03/04/2023 - V10


// ########################################## IMPORTS ##########################################
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetcher from '../../lib/fetcher';
import fetcherDelete from '../../lib/fetcherDelete';
import useSWR from 'swr';
import { parseCookies } from 'nookies';
import Format from '../../layout/format';
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
  if (error) {
    alert("Session has expired, log in again to continue")
    destroyCookie(null, 'token');
    router.push('/singin');}
  if (!course) return <div>Loading course data...</div>;
  if (!course.lessons) return <div>No lessons found for this course.</div>;
  


  // ####################### FOR LATER USE -> VIDEOS ###########################################
/*
  AWS Identity and Access Management (IAM) to set permissions 
  To ensure that your video files are accessible to users
  AWS SDK for JavaScript

  import AWS from 'aws-sdk';

  export default function VideoPage() {
    // Initialize the AWS SDK with your credentials and region
    AWS.config.update({
      accessKeyId: 'your-access-key-id',
      secretAccessKey: 'your-secret-access-key',
      region: 'your-aws-region',
    });

    // Get the video file URL from your S3 bucket
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: 'your-video-file-name.mp4',
    };
    const videoUrl = s3.getSignedUrl('getObject', params);
    
  <video class="w-full h-full object-cover rounded shadow focus:outline-none" controls>
      <source src="https://s3-{region}.amazonaws.com/{bucket}/{object}" type="video/mp4" />
  </video>

  object wil be the name of the video file
  bucket the name of the bucket
  and the region is the one where the bucket is located

  You can set attributes to the video such as
  autoplay, loop, preload, and posters

  With the link that is feched from the lesson content (I don't know how it looks yet)

  <video className="w-full h-full object-cover rounded shadow focus:outline-none" controls>
    <source src={`https://s3-{region}.amazonaws.com/{bucket}/${selectedLessons.content}`} type="video/mp4" />
  </video>

  useful video https://www.youtube.com/watch?v=WP7Dpvrl8Ic
*/
  // ########################################## RETURN ##########################################
  return (
    <>
      <Format>
        <div className="relative">
          <div className="bg-green-400 absolute top-0 left-0 z-10 h-90vh w-0 overflow-hidden transition-all duration-500 ease-in-out" style={{ width: showNav ? '200px' : '0px' }}>
            <ul className="list-none p-0">
              {course.lessons.map((lesson) => (
                <li key={lesson.title}>
                  <a
                    className="block w-full py-2 px-4 text-white text-center bg-gray-800 hover:bg-green-300 cursor-pointer"
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
          <div className="ml-0 md:ml-200px">
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: '1', width: '100%' }}>
              <div style={{ marginLeft: '200px' }}>
                <div style={{ position: 'absolute', top: 10, left: 10, cursor: 'pointer' }} onClick={() => setShowNav(!showNav)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16" id="IconChangeColor">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" id="mainIconPathAttribute" fill="#ffffff"></path>
                  </svg>
                </div>
                <div className="flex" style={{ position: 'absolute', top: 0, left: 0, cursor: 'pointer', marginLeft: '200px' }}>
            <div className=" h-400 p-20">
              <h1 className="text-3xl font-bold mb-10 text-white">{course.title}</h1>
              <p className='text-white'>{course.description}</p>
              {selectedLesson && (
                <div key={selectedLesson.title} className="mb-40 mt-10">
                  <h2 className='text-white' id={selectedLesson.title}>{selectedLesson.title}</h2>
                  <p className='text-white'>{selectedLesson.content}</p>
                </div>
              )}
            </div>
      {selectedLesson && (
        <div className="w-600 h-400 ">
          <video className="w-full h-full mb-40 mt-10 object-cover rounded-lg border-4 border-green-500 shadow-lg focus:outline-none" controls>
            <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </div>
              {showButtons && (
                <div className={`fixed top-10 right-20 flex flex-col transition-opacity duration-200 opacity-0} ${showButtons ? 'opacity-100' : ''}`}>
                  <button className={"fixed bottom-16 right-20 bg-green-400 hover:bg-green-600 text-white  rounded-full cursor-pointer text-center inline-block transition-all duration-200 ease-in-out transform hover:scale-110"} onClick={() => callEdit()}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className={"fixed bottom-28 right-5 bg-green-400 hover:bg-green-600 text-white  rounded-full cursor-pointer text-center inline-block transition-all duration-200 ease-in-out transform hover:scale-110"} onClick={() => callDelete()}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              )}
              <button className={"fixed bottom-16 right-5 bg-green-400 hover:bg-green-600 text-white  rounded-full cursor-pointer text-center transition-all duration-200 ease-in-out transform hover:scale-110"} onClick={() => setShowButtons(!showButtons)}>
                <FontAwesomeIcon icon={faCog} />
              </button>
            </div>
          </div>
        </div>
        </div>
      </Format>
    </>
  );
}