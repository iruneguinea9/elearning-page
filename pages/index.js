// Name : Index
// Author : Irune Guinea
// This is the index page of the app, here in the future could be like an introduction of what the page is and then
// the access to the login page
// Last update 06/04/2023 - V10


// ########################################## IMPORTS ##########################################
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { DataContext } from "@/src/DataContext";
import { useState, useEffect, useContext } from 'react';

export default function Home({}) {
  const { token, logout } = useContext(DataContext);
  const cookies = parseCookies();
  const accessToken = cookies.token;
  const router = useRouter();



  const handleLogin = () => {
    router.push('/api/auth/login');
  };

// ################################## REDIRECT IF LOGGED IN ####################################
  useEffect(() => {
    if (token) {
      console.log("Token");
      router.push('/authenticatedindex');
    } else {
      // This function will run when the component is mounted
      console.log('Page loaded');
    }
  }, [token]);
// ########################################## RETURN ##########################################

    return (
      <>
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="relative pt-20 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
                <div className="w-full text-center lg:text-left">
                  <div className="max-w-md mx-auto lg:mx-10">
                    <h2 className="mb-3 text-4xl lg:text-5xl text-white font-bold">
                      <span>Welcome to our </span>
                      <span className="text-green-600">eLearning platform</span>
                    </h2>
                  </div>
                  <div className="max-w-sm mx-auto lg:mx-10">
                    <p className="mb-6 text-gray-400 leading-loose">Here you can find a wide range of courses that will help you improve your skills and knowledge.

                      Please log in to access the courses.</p>
                    <div>
                      <a className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-green-600 hover:bg-green-700 text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200" href="/auth/login">Log in</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4 flex items-center justify-center">
                <img src="/images/men-on-chair.png" alt="this goes the pic"/>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }