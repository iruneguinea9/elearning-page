import { parseCookies } from 'nookies';
import utilStyles from '../styles/utils.module.css'
import Head from "next/head"
import Format from '../layout/format';
import Courses from '../components/courses';
import { useRouter } from 'next/router';

export default function AuthenticatedFormat(props) {
  const cookies = parseCookies();
  const accessToken = cookies.token;
  const router = useRouter();
  if(accessToken===undefined){
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
            <p>You need to log in to have access to the courses</p>
            <button onClick={() => router.push('/singin')}>Sign in</button>
          </section></div>
        </Format>
      
    );
  }
  return (
    <> <Format>
            <Head>
                <title>eLearning</title>
            </Head>

         <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Courses</h2>
          <Courses/>
        </section>
        </Format>
        </>
  )
}