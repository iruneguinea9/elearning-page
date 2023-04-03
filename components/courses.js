// Name : Courses
// Author : Irune Guinea
// This component is to display each of the courses
// Last update 29/03/2023 - V7


// ########################################## IMPORTS ##########################################
import { useState, useEffect } from 'react';
import fetcher from '../lib/fetcher';
import { parseCookies } from 'nookies';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.error(error);
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      getCourses();
    }
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  return (
    <div key={courses.map(course => course._id).join(',')} className="flex flex-col items-center ">
      {courses?.map((course, index) => (
        <div key={index} className="flex items-center mb-4 w-auto border bg-green-500 border-green-300 hover:border-green-500 hover:scale-105 transition-all duration-300 rounded-3xl">
          <a href={`/courses/${course._id}`} className="items-center">
            <img src="/images/sample_pic.png" alt="Pic goes here" className="mr-4 max-h-300 max-w-500 rounded-t-3xl" />
            <h2 className="font-bold text-2xl text-white text-center">{course.title}</h2>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;