// Name: Edit Course
// Author: Irune Guinea
// This is the page to edit a course it fills the form with the current information of the course, so
// that the admin can edit whatever they want and update the course
// Last update 11/04/2023 - V12



// ########################################## IMPORTS ##########################################

import { useState, useEffect, useContext } from 'react';
import { parseCookies } from 'nookies';
import fetcherPut from './api/fetcherPut';
import { useRouter } from "next/router"
import useSWR from 'swr';
import { DataContext } from "@/src/DataContext";

// ########################################## FUNCTION ##########################################

function EditCourse() {
    const router = useRouter()
    const { token } = useContext(DataContext);
    const id = router.query.courseData ? router.query.courseData.replace(/"/g, '') : null;
    const { data: course, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        (url) => fetcher(url, token)
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

  /*########################### TROUBLESHOOTING ################################# */
  try {
    // If there is an error, it logs out

  } catch (error) {
    alert("Session has expired, log in again to continue")
    destroyCookie(null, 'token');
    router.push('/singin');
  }

 /*################################ CHANGES #####################################*/

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

/*################################## SUBMIT ######################################*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`;
    const datasend = JSON.stringify(formData)
    
    const data = await fetcherPut(url, token, datasend);  // Fetcher for updating
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
    const lessons = [...formData.lessons, { title: '', content: '' ,s3url: '' }];
    setFormData({ ...formData, lessons });
  };



    // ########################################## RETURN ##########################################

  return (
    <>  <h1 className="font-bold text-4xl text-center my-20  text-green-600">Edit the course</h1>
        <div className="m-20 auto max-w-800">          
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between mx-auto">
              <div className="flex flex-col mb-4">
              <label className="label text-white text-2xl">Course Name:</label>
                <input
                  className="rounded-lg border-black border p-2 bg-green-100" 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="label text-white text-2xl">Description:</label>
                <input
                  className="rounded-lg border-black border p-2 bg-green-100" 
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="label text-white text-2xl">Disabled:</label>
                <div>
                  <input
                    type="checkbox"
                    name="disabled"
                    checked={formData.disabled}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <h2 className="font-bold padding2px mb-10 text-green-600 text-3xl">Lessons:</h2>
              {formData.lessons.map((lesson, index) => (
                <div key={index}>
                  <div className="flex flex-col mb-4">
                    <label className="label text-white text-2xl">Title:</label>
                    <input
                      className="rounded-lg border-black border p-2 bg-green-100" 
                      type="text"
                      name="title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="label text-white text-2xl">Content:</label>
                    <input
                       className="rounded-lg border-black border p-2 bg-green-100" 
                      type="text"
                      name="content"
                      value={lesson.content}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="label text-white text-2xl">Lesson url:</label>
                    <input
                      className="rounded-lg border-green-600 border-4 p-2 bg-green-100" 
                      type="text"
                      name="s3url"
                      value={lesson.s3url}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <button  className="w-48 py-2 my-5 mx-auto rounded-md bg-green-400 hover:bg-green-500 text-white" type="button" onClick={() => handleLessonRemove(index)}>Remove Lesson</button>
                  </div>
                </div>
              ))}
              <div className="mt-5 flex justify-center">
                <button  className="w-48 py-2 my-5 mx-auto rounded-md bg-green-500 hover:bg-green-600 text-white" type="button" onClick={handleAddLesson}>Add Lesson</button>
              </div>
              <button className="w-64 py-2 my-5 mx-auto rounded-md bg-green-500 hover:bg-green-700 text-white" type="submit">Update Course</button>
            </div>
          </form>
        </div>
    </>
  );
}


export default EditCourse;