import Head from 'next/head'
import { useState, useEffect } from 'react';

export default function Courses() {
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/courses/');
      const json = await res.json();
      console.log(json)
      setCourses(json);
    }
    fetchCourses();
  }, [])

  function handleChange(e) {
    setCourse(e.target.value);
  }

  async function handleSubmit() {
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: course,
        completed: false
      })
    })
    const json = await res.json();
    setCourses([...courses, json])
  }

  return (
    <div>
      <Head>
        <title>Courses</title>
      </Head>
      <div className="container mx-auto p-10 m-10">
        <div className="flex flex-col">
          <h1 className="font-bold mb-3">Courses</h1>
          <div>
            <ul>
              {courses && courses.map((course) =>
                  <li key={course.id} className="bg-yellow-100 m-3 p-3 border-yellow-200 border-2">{course.title}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}