// Name : Courses
// Author : Irune Guinea
// This component is to display each of the courses
// Last update 05/04/2023 - V10


// ########################################## IMPORTS ##########################################
import { useState, useEffect } from 'react';
import fetcher from '../lib/fetcher';
import { parseCookies ,destroyCookie} from 'nookies';
import { useRouter } from 'next/router';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const getCourses = async () => {
      try {
        const cookies = parseCookies();
        const accessToken = cookies.token;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/courses`;
        const coursesData = await fetcher(url, accessToken);
        setCourses(coursesData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert("Session has expired, log in again to continue")
        destroyCookie(null, 'token');
        router.push('/');
      }
    };

    if (typeof window !== 'undefined') {
      getCourses();
    }
  }, []);

  if (isLoading) {
    return <div className="text-center py-8  bg-gray-900 text-green-600 min-h-screen" >Loading...</div>;
  }
  return (
    <div key={courses.map(course => course._id).join(',')} className="flex flex-col items-center ">
      {courses?.map((course, index) => (
        <div key={index} className="flex items-center mb-4 w-3/4 border bg-green-500 border-green-300 hover:border-green-500 hover:scale-105 transition-all duration-300 rounded-3xl">
          <a href={`/courses/${course._id}`} className="items-center">
            <img src="/images/sample_pic.jpg" alt="Pic goes here" className="mr-4 max-h-250 max-w-500 rounded-t-3xl" />
            <h2 className="font-bold text-2xl text-white text-center py-4">{course.title}</h2>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;