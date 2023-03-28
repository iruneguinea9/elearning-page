// Name : Header
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 28/03/2023 - V6

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

        <div className="absolute top-0 right-0 py-3 pr-4">
          <button className="text-white font-medium" onClick={handleLogout}>
            Log out
          </button>
        </div>

      <div className="xl:container xl:mx-auto flex flex-col items-center sm:justify-between text-center py-3">
        <Link href="/authenticatedindex">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">eLearning platform</h1>
        </Link>
      </div>
    </header>
  );
}