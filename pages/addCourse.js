import { useState } from 'react';
import { parseCookies } from 'nookies';
import Head from "next/head"
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import styles from "../styles/styles.module.css"

function AddCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lessons: [], // initialize lessons to an empty array
    disabled: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (e.target.name === 'lessons') {
      // update lessons array
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
  if(accessToken===undefined){
    return (
      <Login></Login>
     
    );
  }
  return (
    <>
        <Format>
            <Head>
            <title>eLearning</title>
            </Head>
            <h1 className={styles.title}>Create a new course</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.form} >
                    <label>
                        Course Name: 
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={formData.description} onChange={handleChange} />
                    </label>
                    <label>
                        Disabled:
                        <input type="checkbox" name="disabled" checked={formData.disabled} onChange={handleChange} />
                    </label>
                    <h2>Lessons:</h2>
                    {formData.lessons.map((lesson, index) => (
                      <div key={index}>
                        <label>
                          Title:
                          <input type="text" name="title" value={lesson.title} data-index={index} data-field="title" onChange={handleChange} />
                        </label>
                        <label>
                          Content:
                          <input type="text" name="content" value={lesson.content} data-index={index} data-field="content" onChange={handleChange} />
                        </label>
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