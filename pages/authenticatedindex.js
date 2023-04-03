// Name : Authenticated index
// Author : Irune Guinea
// This is an index page but for the already authenticated users
// Last update 30/03/2023 - V12


// ########################################## IMPORTS ##########################################
import { parseCookies,destroyCookie } from 'nookies';
import Format from '../layout/format';
import Login from '../components/loginNeeded';
import Courses from '../components/courses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function AuthenticatedIndex() {
  const router = useRouter();
  try {
    // I made this so it redirects to login when needed

  } catch (error) {
    alert("Session has expired, log in again to continue")
    destroyCookie(null, 'token');
    router.push('/singin');
  }
  const callAdd = () => {
    router.push('/addCourse');
  };
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
          <button className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full cursor-pointer text-center inline-block transition-all duration-200 ease-in-out transform hover:scale-110" onClick={() => callAdd()}>              <FontAwesomeIcon icon={faPlus} />
            </button>
            <div className="w-full px-4 py-6 max-w-screen-lg">
              <h2 className="text-3xl font-bold mb-8 text-green-500">All the Courses</h2>
              <Courses/>
            </div>
          </div>
        </Format>
      </>
    );
  }