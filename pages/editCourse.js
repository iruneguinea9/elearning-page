// Name: Edit Course
// Author: Irune Guinea
// This is the page to edit a course
// Last update 21/03/2023 - V5

import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import styles from "../styles/styles.module.css";
import fetcherPut from '../lib/fetcherPut';
import { useRouter } from "next/router"
import useSWR from 'swr';
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

 

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cookies = parseCookies();
    const accessToken = cookies.token;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`;
    const datasend = JSON.stringify(formData)
    
    const data = await fetcherPut(url, accessToken, datasend);
    console.log(data)
    if(data!==null){
      alert(`The course ${formData.title} has been updated!`)
      router.push("/authenticatedindex")
    }
  };

  const handleLessonChange = (e, index) => {
    const { name, value } = e.target;
    const lessons = [...formData.lessons];
    lessons[index][name] = value;
    setFormData({ ...formData, lessons });
  };

  const handleLessonRemove = (index) => {
    const lessons = [...formData.lessons];
    lessons.splice(index, 1);
    setFormData({ ...formData, lessons });
  };

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

  
  return (
    <>
      <Format>
        <div style={{ margin: '0 auto', maxWidth: '800px' }}>
          <h1 className={styles.title}>Edit the course</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <div className={styles.inputGroup}>
              <label className="label">Course Name:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className="label">Description:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
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
                  <div className={styles.inputGroup}>
                    <label className="label">Title:</label>
                    <input
                      className={styles.formInput}
                      type="text"
                      name="title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className="label">Content:</label>
                    <input
                      className={styles.formInput}
                      type="text"
                      name="content"
                      value={lesson.content}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <button  className={styles.btn2} type="button" onClick={() => handleLessonRemove(index)}>Remove Lesson</button>
                  </div>
                </div>
              ))}
              <div className={styles.addLessonButton}>
                <button  className={styles.btn} type="button" onClick={handleAddLesson}>Add Lesson</button>
              </div>
              <button className={styles.btn} type="submit">Update Course</button>
            </div>
          </form>
        </div>
      </Format>
    </>
  );
}


export default EditCourse;