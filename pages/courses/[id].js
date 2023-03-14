import { useRouter } from 'next/router'
import fetcher from '../../lib/fetcher';
import useSWR from 'swr';
import { parseCookies } from 'nookies';

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const cookies = parseCookies();

  const { data: course, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, (url) => fetcher(url, cookies.token));

  if (error) return <div>Error loading course data.</div>; 
  if (!course) return <div>Loading course data...</div>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <div>Number of lessons: {course.lessons.length}</div>
    </div>
  );
}