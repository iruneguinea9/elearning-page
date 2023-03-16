import Format from '../layout/format';
import Head from "next/head"
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/course.module.css';
import { useRouter } from 'next/router';

export default function loginNeeded() {
    
    const router = useRouter();
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