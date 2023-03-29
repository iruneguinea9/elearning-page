// Name : Authenticated index
// Author : Irune Guinea
// This is an index page but for the already authenticated users
// Last update 29/03/2023 - V9


// ########################################## IMPORTS ##########################################
import { parseCookies,destroyCookie } from 'nookies';
import utilStyles from '../styles/utils.module.css'
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import Courses from '../components/courses';

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
          <div className="flex flex-col items-center relative">
            <div className="fixed right-5 bottom-5">
              <a href="/addCourse" className="text-2xl bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out">
                +
              </a>
            </div>
            <div className="w-full px-4 py-6 max-w-screen-lg">
              <h2 className="text-3xl font-bold mb-8">All the Courses</h2>
              <Courses/>
            </div>
          </div>
        </Format>
      </>
    );
  }