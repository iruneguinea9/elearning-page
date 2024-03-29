// Name : Courses
// Author : Irune Guinea
// This component is to display each of the courses
// Last update 15/05/2023 - V14


// ########################################## IMPORTS ##########################################
import { useState, useEffect, useContext } from 'react';
import fetcher from '../pages/api/fetcher';
import { parseCookies ,destroyCookie} from 'nookies';
import { useRouter } from 'next/router';
import { DataContext } from "@/src/DataContext";


const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { token } = useContext(DataContext);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("API_URL -> ",API_URL);
  const url = `${API_URL}/users/me`;
  
  useEffect(() => {
    const getCourses = async () => {
      try {
         // Fetch user information
         const userData = await fetcher(url, token);
         const user_id = userData._id;
 
         // Fetch courses using the user_id
         const coursesUrl = `${API_URL}/users/${user_id}/courses`;
         const coursesData = await fetcher(coursesUrl, token);

        setCourses(coursesData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        destroyCookie(null, 'token');
        console.log(error);
        router.push('/auth/login');
        
      }
    };

    if (typeof window !== 'undefined') {
      getCourses();
    }
  }, []);
// ########################################## LOADING ##########################################
  if (isLoading) {
    return <div className="text-center py-92  bg-gray-900 text-green-600 min-h-screen" >Loading...</div>;
  }
  const navigateToCoursePage = (courseId) => {
    router.push(`/courses/${courseId}`);
  }
  // ########################################## RETURN ##########################################
  return (
    <div key={courses.map(course => course._id).join(',')} className="flex flex-col items-center ">
      {courses?.map((course, index) => (
        <div key={index} className="flex items-center mb-4 w-3/4 border bg-green-500 border-green-300 hover:border-green-500 hover:scale-105 transition-all duration-300 rounded-3xl">
          <a  onClick={() => navigateToCoursePage(course._id)} className="items-center">
            <img src="/images/sample_pic.jpg" alt="Pic goes here" className="mr-4 max-h-250 max-w-500 rounded-t-3xl" />
            <h2 className="font-bold text-2xl text-white text-center py-4">{course.title}</h2>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;