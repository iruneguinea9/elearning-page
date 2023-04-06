// Name : Header
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 06/04/2023 - V12

// ########################################## IMPORTS ##########################################
import React from 'react';
import {destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
// ############################## HANDLER FOR THE LOG OUT ######################################
  const handleLogout = () => {
    console.log('logout')
    destroyCookie(null, 'token');
    router.push('/singin');
  };
// ########################################## RETURN ##########################################
  return (
    <header className="relative bg-gray-900 overflow-hidden shadow-lg ">
      <nav className="relative px-6 py-6 flex justify-between items-center">
        <a className="text-white text-3xl font-bold leading-none" href="/authenticatedindex">
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center cursor-pointer hover:scale-105 transition duration-300">eLearning platform</h1>
        </a>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-white p-3" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
        <a className="hidden lg:inline-block py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-l-xl rounded-t-xl transition duration-200"  onClick={handleLogout}>Log out</a>
      </nav>
    </header>
  );
}