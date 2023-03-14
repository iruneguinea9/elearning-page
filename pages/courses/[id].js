import { useRouter } from 'next/router'
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
  const { id } = params
  const url = `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`;
  const data = await fetcher(url);

  return {
    props: {
      course: data
    }
  }
}