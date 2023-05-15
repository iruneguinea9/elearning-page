// Name : Authenticated index
// Author : Irune Guinea
// This is an index page but for the already authenticated users
// Last update 15/05/2023 - V13


// ########################################## IMPORTS ##########################################
import { parseCookies, destroyCookie } from 'nookies';
import Courses from '../components/courses';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { DataContext } from "@/src/DataContext";
import fetcher from './api/fetcher';



export default function AuthenticatedIndex() {
  const { token } = useContext(DataContext);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState(null);

  const callAdd = () => {
    router.push('/addCourse');
  };

  useEffect(() => {
    if (!token) {
      console.log("no token");
      router.push('/auth/login');
    } else {
      const fetchUser = async () => {
        try {
          const userData = await fetcher(`${API_URL}/users/me`, token);
          setUser(userData);
          console.log(userData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();
      
      console.log('Page loaded');
    }
  }, [token]);

  // ########################################## RETURN ##########################################
  return (
    <>
      <div className="flex flex-col items-center relative">
      {user && user.type === 'admin' && (
          <button className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full cursor-pointer text-center inline-block transition-all duration-200 ease-in-out transform hover:scale-110" onClick={() => callAdd()}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
        <div className="w-full px-4 py-6 max-w-screen-lg">
          <h2 className="text-3xl font-bold mb-8 text-green-500">All the Courses</h2>
          <Courses />
        </div>
      </div>
    </>
  );
}