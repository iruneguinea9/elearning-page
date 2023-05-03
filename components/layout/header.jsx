// Name : Header
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 06/04/2023 - V12

// ########################################## IMPORTS ##########################################
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import { DataContext } from "@/src/DataContext";

export default function Header() {
  const router = useRouter();
  // ############################## HANDLER FOR THE LOG OUT ######################################
  const { token, logout } = useContext(DataContext);
  
  // ########################################## RETURN ##########################################
  return (
    <header className="relative bg-gray-900 overflow-hidden shadow-lg ">
      <nav className="relative px-6 py-6 flex justify-between items-center">
        <a className="text-white text-3xl font-bold leading-none" href="/authenticatedindex">
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center cursor-pointer hover:scale-105 transition duration-300">eLearning platform</h1>
        </a>
        <div className="">
          {token ? (
            <>
              <button onClick={() => {
                logout();
              }} className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-green-600 hover:bg-green-700 text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200">Log out</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="mr-2">
                <button className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-green-600 hover:bg-green-700 text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200">
                  <div className="flex flex-row mr-0 justify-center">
                    <span className="mx-1">Log In</span><svg fill="#FFFFFF" width="20px" height="24px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-login"><path d="M5 1H17V2H18V20H17V21H5V20H4V14H6V19H16V3H6V8H4V2H5V1M8 6H10V7H11V8H12V9H13V10H14V12H13V13H12V14H11V15H10V16H8V14H9V13H10V12H2V10H10V9H9V8H8V6Z" /></svg>
                  </div>
                </button>
              </Link>
              
            </>
          )}
        </div>
      </nav>
    </header>
  );
}