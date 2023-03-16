import { useState } from 'react';
import { parseCookies } from 'nookies';
import Head from "next/head"
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import styles from "../styles/styles.module.css"

function AddCourse() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setFormData({ name: '', description: '', price: '' });
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
            <form onSubmit={handleSubmit}>
                <div className={styles.form} >
                    <label>
                        Course Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={formData.description} onChange={handleChange} />
                    </label>
                    <label>
                        Price:
                        <input type="text" name="price" value={formData.price} onChange={handleChange} />
                    </label>
                    <button type="submit">Add Course</button>
                </div>
            </form>
        </Format>
    </>
  );
}

export default AddCourse;