// Name : Header
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 21/03/2023 - V4

// ########################################## IMPORTS ##########################################
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleLogout = () => {
    destroyCookie(null, 'token');
    router.push('/');
  };

  return (
    <header className="bg-blue-300 relative">
      {accessToken && (
        <div className="absolute top-0 right-0 py-3 pr-4">
          <button className="text-white font-medium" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
      <div className="xl:container xl:mx-auto flex flex-col items-center sm:justify-between text-center py-3">
        <Link href="/authenticatedindex">
          <h1 className="font-bold text-4xl">eLearning platform</h1>
        </Link>
      </div>
    </header>
  );
}