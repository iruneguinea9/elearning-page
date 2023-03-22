// Name : Courses
// Author : Irune Guinea
// This component is to display each of the courses
// Last update 22/03/2023 - V4


// ########################################## IMPORTS ##########################################
import useSWR from 'swr';
import { parseCookies } from 'nookies';
import fetcher from '../lib/fetcher';

const CoursesPage = () => {
  const { data: coursesData, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/courses`, (url) =>
    fetcher(url, parseCookies().token)
  );

  if (error) return <div>Error loading data.</div>;
  if (!coursesData) return <div>Loading data...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {coursesData.map((course, index) => (
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