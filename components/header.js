// Name : Header
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 21/03/2023 - V3

// ########################################## IMPORTS ##########################################
import React, { useEffect } from 'react';
import Link from 'next/link';
import { parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

export default function Header() {
  const cookies = parseCookies();
  const accessToken = cookies.token;
  const router = useRouter();

  useEffect(() => {
    // Client-side code that uses the router object
  }, []);

  const handleLogout = () => {
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
          <h1 className="font-bold text-4xl">eLearning platform</h1>
        </Link>
      </div>
    </header>
  );
}