// Name : Add Course
// Author : Irune Guinea
// This is the page to add a new course, here the admin can add a course with the parameters needed
// and also add as many lessons as they need to
// Last update 16/03/2023 - V6

import { useState } from 'react';
import { parseCookies } from 'nookies';
import Head from "next/head";
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import styles from "../styles/styles.module.css";

function AddCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lessons: [],
    disabled: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (e.target.name === 'lessons') {
      const lessons = formData.lessons.map((lesson, index) => {
        if (index === parseInt(e.target.dataset.index)) {
          return { ...lesson, [e.target.dataset.field]: value };
        }
        return lesson;
      });
      setFormData({ ...formData, lessons });
    } else {
      setFormData({ ...formData, [e.target.name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // FETCHING
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    // Reset form data
    setFormData({
      title: '',
      description: '',
      lessons: formData.lessons,
      disabled: false
    });
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

  // RETURN
  return (
    <>
      <Format>
        <h1 className={styles.title}>Create a new course</h1>
        
              <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Course Name:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>Disabled:</label>
            <input type="checkbox" name="disabled" checked={formData.disabled} onChange={handleChange} />
          </div>
          <h2>Lessons:</h2>
          {formData.lessons.map((lesson, index) => (
            <div key={index}>
              <div className={styles.inputGroup}>
                <label>Title:</label>
                <input type="text" name="title" value={lesson.title} data-index={index} data-field="title" onChange={handleChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Content:</label>
                <input type="text" name="content" value={lesson.content} data-index={index} data-field="content" onChange={handleChange} />
              </div>
            </div>
          ))}
          <button className={styles.lessonButton} onClick={() => setFormData({ ...formData, lessons: [...formData.lessons, { title: '', content: '' }] })}>Add Lesson</button>
          <button className={styles.lessonButton} type="submit">Add Course</button>
        </div>  
      </form>
      </Format>
    </>
  );
}


export default AddCourse;