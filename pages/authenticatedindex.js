// Name : Authenticated index
// Author : Irune Guinea
// This is an index page but for the already authenticated users
// Last update 21/03/2023 - V6


// ########################################## IMPORTS ##########################################
import { parseCookies } from 'nookies';
import utilStyles from '../styles/utils.module.css'
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import Courses from '../components/courses';
import styles from "../styles/styles.module.css"

export default function AuthenticatedIndex() {
  const cookies = parseCookies();
  const accessToken = cookies.token;
  if(accessToken===undefined){
    return (
      <Login></Login>
     
    );
  }
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
