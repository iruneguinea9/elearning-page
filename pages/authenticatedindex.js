// Name : Courses
// Author : Irune Guinea
// This is an index page but for the already authenticated users
// Last update 16/03/2023 - V1


// ########################################## IMPORTS ##########################################
import { parseCookies } from 'nookies';
import utilStyles from '../styles/utils.module.css'
import Head from "next/head"
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import Courses from '../components/courses';
import styles from "../styles/styles.module.css"
import Link from 'next/link';

export default function AuthenticatedFormat(props) {
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
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <div className={styles.header}>
              <Link href="/addCourse" className={styles.addButton}>
              +
              </Link>
            </div>
            <h2 className={utilStyles.headingLg}>All the Courses</h2>
            <Courses/>
          </section>
        </Format>
      </>
    );
  }