import { useRouter } from 'next/router'
import { parseCookies } from 'nookies';
import fetcher from '../../lib/fetcher';

export default function Course({ course }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { courseId } = params
  const cookies = parseCookies();
  const accessToken = cookies.token;
  // Retrieve the course data from the API using the courseId parameter
  const data = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`, accessToken)

  return {
    props: {
      course: data
    }
  }
}