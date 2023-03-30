// Name : Header
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 30/03/2023 - V9

// ########################################## IMPORTS ##########################################
import React from 'react';
import Link from 'next/link';
import {destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    console.log('logout')
    destroyCookie(null, 'token');
    router.push('/');
  };

  return (
    <header className="bg-blue-300 relative py-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-center py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mx-auto text-center">
        <Link href="/authenticatedindex">
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center cursor-pointer hover:scale-105 transition duration-300">eLearning platform</h1>
        </Link>
        </div>
      </div>
      <div className="absolute top-10 right-5 items-center mt-4 sm:mt-0">
          <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out" onClick={handleLogout}>
            Log out
          </button>
        </div>
    </header>
  );
}