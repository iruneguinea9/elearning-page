// Name : Login Needed
// Author : Irune Guinea
// With this component I redirect to the sign in page to a user that is not logged in and 
// is trying to access a protected area
// Last update 16/03/2023 - V1

// ########################################## IMPORTS ##########################################
import Format from '../layout/format';
import Head from "next/head"
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/course.module.css';
import { useRouter } from 'next/router';

export default function loginNeeded() {
    
    const router = useRouter(); //this is for redirection
  // ########################################## RETURN ##########################################
return (
    <Format>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>   
        <Head>
          <title>eLearning</title>
        </Head>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} style={{ marginLeft: "20px" }}>
          <div>
            <h2 className={utilStyles.headingLg} style={{ fontSize: "28px" }}>Courses</h2>
          </div>
          <p style={{ marginBottom: "28px" }}>You need to be logged in to have access to the courses</p>
          <button className={styles.lessonButton} onClick={() => router.push('/singin')}>Sign in</button>
        </section></div>
      </Format>
   
  );
}