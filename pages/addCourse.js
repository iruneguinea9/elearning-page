// Name: Add Course
// Author: Irune Guinea
// This is the page to add a new course, here the admin can add a course with the parameters needed
// and also add as many lessons as they need to
// Last update 17/03/2023 - V8

import { useState } from 'react';
import { parseCookies } from 'nookies';
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import styles from "../styles/styles.module.css";
import fetcherPost from '../lib/fetcherPost';

function AddCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lessons: [],
    disabled: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookies = parseCookies();
    const accessToken = cookies.token;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/courses`;
    const datasend = JSON.stringify(formData)
    const data = await fetcherPost(url, accessToken, datasend);
    setFormData({
      title: '',
      description: '',
      lessons: [],
      disabled: false,
    });
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
          <h1 className={styles.title}>Create a new course</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Course Name:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Description:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Disabled:</label>
                <div>
                  <input
                    type="checkbox"
                    name="disabled"
                    checked={formData.disabled}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <h2>Lessons:</h2>
              {formData.lessons.map((lesson, index) => (
                <div key={index}>
                  <div className={styles.inputGroup}>
                    <label>Title:</label>
                    <input
                      className={styles.formInput}
                      type="text"
                      name="title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Content:</label>
                    <input
                      className={styles.formInput}
                      type="text"
                      name="content"
                      value={lesson.content}
                      onChange={(e) => handleLessonChange(e, index)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <button type="button" onClick={() => handleLessonRemove(index)}>Remove Lesson</button>
                  </div>
                </div>
              ))}
              <div className={styles.addLessonButton}>
                <button type="button" onClick={handleAddLesson}>Add Lesson</button>
              </div>
              <button className={styles.btn} type="submit">Add Course</button>
            </div>
          </form>
        </div>
      </Format>
    </>
  );
}


export default AddCourse;