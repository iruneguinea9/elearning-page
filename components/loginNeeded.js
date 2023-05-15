// Name : Login Needed
// Author : Irune Guinea
// With this component I redirect to the sign in page to a user that is not logged in and 
// is trying to access a protected area
// Last update 04/04/2023 - V4

// ########################################## IMPORTS ##########################################
import Head from "next/head"
import { useRouter } from 'next/router';

export default function loginNeeded() {
    
    const router = useRouter(); //this is for redirection
  // ########################################## RETURN ##########################################
return (

    <div className="flex justify-center items-center">   
        <Head>
          <title>eLearning</title>
        </Head>
        <section  className="mb-28">
        <div>
        <h2 className="text-2xl md:text-4xl text-white font-extrabold tracking-tight my-4">Courses</h2>
      </div>
      <p className="mb-28  text-white ">You need to be logged in to have access to the courses</p>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 my-4 rounded"
        onClick={() => router.push('/pages/api/auth/login')}>
        Sign in
      </button>
    </section></div>

   
  );
}