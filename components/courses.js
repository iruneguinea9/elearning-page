import { useState, useEffect } from 'react';
import fetcher from '../lib/fetcher';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const url = `${process.env.NEXT_PUBLIC_API_URL}/courses`;
        const coursesData = await fetcher(url, accessToken).then(data => console.log(data)).catch(error => console.error(error));
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
        {courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesPage;