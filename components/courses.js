// Name : Courses
// Author : Irune Guinea
// This component is to display each of the courses
// Last update 16/03/2023 - V1


// ########################################## IMPORTS ##########################################
import { useState, useEffect } from 'react';
import fetcher from '../lib/fetcher';
import Link from 'next/link';
import { parseCookies } from 'nookies';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const cookies = parseCookies();
        const accessToken = cookies.token;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/courses`;
        const coursesData = await fetcher(url, accessToken);
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    getCourses();
  }, []);


  // ########################################## RETURN ##########################################
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {courses?.map((course, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
           <Link href="/courses/[id]" as={`/courses/${course._id}`} style={{ fontSize: '1.2rem' }}>
          <img src="/images/sample_pic.png" alt="Pic goes here" width="400" height="400" style={{ marginRight: '1rem' }} />
          
           
             {course.title}
            </Link>
          
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;