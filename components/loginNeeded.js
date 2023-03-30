// Name : Login Needed
// Author : Irune Guinea
// With this component I redirect to the sign in page to a user that is not logged in and 
// is trying to access a protected area
// Last update 30/03/2023 - V2

// ########################################## IMPORTS ##########################################
import Format from '../layout/format';
import Head from "next/head"
import { useRouter } from 'next/router';

export default function loginNeeded() {
    
    const router = useRouter(); //this is for redirection
  // ########################################## RETURN ##########################################
return (
    <Format>
    <div className="flex justify-center items-center">   
        <Head>
          <title>eLearning</title>
        </Head>
        <section>
        <div>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight my-4">Courses</h2>
      </div>
      <p className="mb-28">You need to be logged in to have access to the courses</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push('/signin')}>
        Sign in
      </button>
    </section></div>
      </Format>
   
  );
}