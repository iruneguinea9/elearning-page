// Name : Courses
// Author : Irune Guinea
// This component is to display each of the courses
// Last update 21/03/2023 - V3


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
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {courses?.map((course, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
           <a href={`/courses/${course._id}`} style={{ fontSize: '1.2rem' }}>
            <img src="/images/sample_pic.png" alt="Pic goes here" width="400" height="400" style={{ marginRight: '1rem' }} />
            {course.title}
          </a>       
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;