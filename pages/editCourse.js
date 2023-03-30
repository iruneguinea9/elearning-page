// Name: Edit Course
// Author: Irune Guinea
// This is the page to edit a course it fills the form with the current information of the course, so
// that the admin can edit whatever they want and update the course
// Last update 30/03/2023 - V10



// ########################################## IMPORTS ##########################################

import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import fetcherPut from '../lib/fetcherPut';
import { useRouter } from "next/router"
import useSWR from 'swr';

// ########################################## FUNCTION ##########################################

function EditCourse() {
    const router = useRouter()
    const id = router.query.courseData ? router.query.courseData.replace(/"/g, '') : null;
    const { data: course, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        (url) => fetcher(url, cookies.token)
      );
      console.log(id)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lessons: [],
    disabled: false,
  });
  useEffect(() => {
    if (course) {
      setFormData(course);
    }
  }, [course]);

 /*################################ CHANGES #####################################*/

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

/*################################## SUBMIT ######################################*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cookies = parseCookies();
    const accessToken = cookies.token;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`;
    const datasend = JSON.stringify(formData)
    
    const data = await fetcherPut(url, accessToken, datasend);  // Fetcher for updating
    console.log(data)
    if(data!==null){
      alert(`The course ${formData.title} has been updated!`)
      router.push("/authenticatedindex")
    }
  };

   /*############################ LESSON CHANGES ##################################*/

  const handleLessonChange = (e, index) => {
    const { name, value } = e.target;
    const lessons = [...formData.lessons];
    lessons[index][name] = value;
    setFormData({ ...formData, lessons });
  };

     /*############################ LESSON REMOVE ##################################*/

  const handleLessonRemove = (index) => {
    const lessons = [...formData.lessons];
    lessons.splice(index, 1);
    setFormData({ ...formData, lessons });
  };
     /*############################## ADD LESSON  ###################################*/
  const handleAddLesson = () => {
    const lessons = [...formData.lessons, { title: '', content: '' }];
    setFormData({ ...formData, lessons });
  };

  const cookies = parseCookies();
  const accessToken = cookies.token;

  if (accessToken === undefined) {
    return (
      <>
        <Login />
      </>
    );
  }

    // ########################################## RETURN ##########################################

  return (
    <>
      <Format >
        <div className="m-20 auto max-w-800">
          <h1 className="font-bold text-3xl text-center my-20">Edit the course</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between mx-auto">
              <div className="flex flex-col mb-4">
              <label className="label">Course Name:</label>
                <input
                  className="rounded-lg border-black border p-2 bg-blue-100" 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="label">Description:</label>
                <input
                  className="rounded-lg border-black border p-2 bg-blue-100" 
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="label">Disabled:</label>
                <div>
                  <input
                    type="checkbox"
                    name="disabled"
                    checked={formData.disabled}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <h2 className="font-bold padding1px">Lessons:</h2>
              {formData.lessons.map((lesson, index) => (
                <div key={index}>
                  <div className="flex flex-col mb-4">
                    <label className="label">Title:</label>
                    <input
                      className="rounded-lg border-black border p-2 bg-blue-100" 
                      type="text"
                      name="title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="label">Content:</label>
                    <input
                       className="rounded-lg border-black border p-2 bg-blue-100" 
                      type="text"
                      name="content"
                      value={lesson.content}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <button  className="w-48 py-2 my-5 mx-auto rounded-md bg-blue-400 text-white" type="button" onClick={() => handleLessonRemove(index)}>Remove Lesson</button>
                  </div>
                </div>
              ))}
              <div className="mt-5 flex justify-center">
                <button  className="w-48 py-2 my-5 mx-auto rounded-md bg-blue-500 text-white" type="button" onClick={handleAddLesson}>Add Lesson</button>
              </div>
              <button className="w-64 py-2 my-5 mx-auto rounded-md bg-blue-500 text-white" type="submit">Update Course</button>
            </div>
          </form>
        </div>
      </Format>
    </>
  );
}


export default EditCourse;