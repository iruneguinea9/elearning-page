// Name : Authenticated index
// Author : Irune Guinea
// This is an index page but for the already authenticated users
// Last update 30/03/2023 - V12


// ########################################## IMPORTS ##########################################
import { parseCookies, destroyCookie } from 'nookies';
import Courses from '../components/courses';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { DataContext } from "@/src/DataContext";

export default function AuthenticatedIndex() {
  const { token } = useContext(DataContext);
  const router = useRouter();


  const callAdd = () => {
    router.push('/addCourse');
  };

  useEffect(() => {
    if (!token) {
      console.log("no token");
      router.push('/auth/login');
    } else {
      // This function will run when the component is mounted
      console.log('Page loaded');
    }
  }, [token]);

  // ########################################## RETURN ##########################################
  return (
    <>
      <div className="flex flex-col items-center relative">
        <button className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full cursor-pointer text-center inline-block transition-all duration-200 ease-in-out transform hover:scale-110" onClick={() => callAdd()}>              <FontAwesomeIcon icon={faPlus} />
        </button>
        <div className="w-full px-4 py-6 max-w-screen-lg">
          <h2 className="text-3xl font-bold mb-8 text-green-500">All the Courses</h2>
          <Courses />
        </div>
      </div>
    </>
  );
}