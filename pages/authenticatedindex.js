// Name : Authenticated index
// Author : Irune Guinea
// This is an index page but for the already authenticated users
// Last update 28/03/2023 - V8


// ########################################## IMPORTS ##########################################
import { parseCookies,destroyCookie } from 'nookies';
import utilStyles from '../styles/utils.module.css'
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import Courses from '../components/courses';
import styles from "../styles/styles.module.css"

export default function AuthenticatedIndex() {
  try {
    // I made this so it redirects to login when needed

  } catch (error) {
    alert("Session has expired, log in again to continue")
    destroyCookie(null, 'token');
    router.push('/singin');
  }

  /*

  // Here is the hydration problem, it tries to get the data from parseCookies and it fails

  const cookies = parseCookies();
  const accessToken = cookies.token;
  if(accessToken===undefined){
    return (
      <Login></Login>
     
    );
  }*/
    // ########################################## RETURN ##########################################
    return (
      <>
        <Format>          
          <div>
            <div>
              <a href="/addCourse" className={styles.addButton}>
                +
              </a>
            </div>
            <div>
              <h2 className={utilStyles.headingLg}>All the Courses</h2>
              <Courses/>
            </div>
          </div>
        </Format>
      </>
    );
  }
