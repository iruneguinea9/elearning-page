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

  return (
    <div>
      <h1>All Courses</h1>
      <ul>
        {courses?.map((course, index) => (
          <li key={index}>
            <Link href="/courses/[id]" as={`/courses/${course._id}`}>
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesPage;