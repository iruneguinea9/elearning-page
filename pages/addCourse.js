// Name: Add Course
// Author: Irune Guinea
// This is the page to add a new course, here the admin can add a course with the parameters needed
// and also add as many lessons as they need to
// Last update 03/04/2023 - V16

// ########################################## IMPORTS ##########################################

import { useState, useEffect } from 'react';
import fetcherPost from './api/fetcherPost';
import { useRouter } from "next/router"
import { parseCookies , destroyCookie} from 'nookies';

// ########################################## FUNCTION ##########################################


function AddCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lessons: [],
    disabled: false,
  });
  const router = useRouter()
  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies.token;

    if (accessToken === undefined) {
      router.push("/");
      return;
    }
  }, [router]);
  
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
    setFormData({ ...formData, [e.target.name]: value } || {});
  };

/*################################## SUBMIT ######################################*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookies = parseCookies();
    const accessToken = cookies.token;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/courses`;
    const datasend = JSON.stringify(formData)
    console.log("DATASEND ####",datasend)
    const data = await fetcherPost(url, accessToken, datasend);  // Fetcher for posting
    
    console.log(data)
    if(data!==null){
      alert(`The course ${formData.title} has been added!`);
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
  // ########################################## RETURN ##########################################

  return (
    <>
        <div className="m-20 auto max-w-800">
          <h1 className="font-bold text-4xl text-center my-20  text-green-600">Create a new course</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between mx-auto">
              <div className="flex flex-col mb-4">
              <label className="label text-white text-2xl">Course Name:</label>
                <input
                  className="rounded-lg border-green-600 border-4 p-2 bg-green-100" 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="label text-white text-2xl">Description:</label>
                <input
                  className="rounded-lg border-green-600 border-4 p-2 bg-green-100" 
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
                      className="rounded-lg border-green-600 border-4 p-2 bg-green-100" 
                      type="text"
                      name="title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="label text-white text-2xl">Content:</label>
                    <input
                      className="rounded-lg border-green-600 border-4 p-2 bg-green-100" 
                      type="text"
                      name="content"
                      value={lesson.content}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <button  className="w-48 py-2 my-5 mx-auto rounded-md bg-green-400 text-white" type="button" onClick={() => handleLessonRemove(index)}>Remove Lesson</button>
                  </div>
                </div>
              ))}
              <div className="mt-5 flex justify-center">
                <button  className="w-48 py-2 my-5 mx-auto rounded-md bg-green-500 text-white" type="button" onClick={handleAddLesson}>Add Lesson</button>
              </div>
              <button className="w-64 py-2 my-5 mx-auto rounded-md bg-green-500 text-white" type="submit">Add Course</button>
            </div>
          </form>
        </div>
    </>
  );
}


export default AddCourse;