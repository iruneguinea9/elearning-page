// Name : Header
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 29/03/2023 - V7

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
    <header className="bg-blue-300 relative">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-center py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mx-auto">
          <Link href="/authenticatedindex">
            <h1 className="font-bold text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center cursor-pointer">eLearning platform</h1>
          </Link>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}