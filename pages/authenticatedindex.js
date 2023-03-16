import { parseCookies } from 'nookies';
import utilStyles from '../styles/utils.module.css'
import Head from "next/head"
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import Courses from '../components/courses';

export default function AuthenticatedFormat(props) {
  const cookies = parseCookies();
  const accessToken = cookies.token;
  if(accessToken===undefined){
    return (
      <Login></Login>
     
    );
  }
  return (
    <> <Format>
            <Head>
                <title>eLearning</title>
            </Head>

         <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>All the Courses</h2>
          <Courses/>
        </section>
        </Format>
        </>
  )
}