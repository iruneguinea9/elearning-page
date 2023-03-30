// Name : Index
// Author : Irune Guinea
// This is the index page of the app, here in the future could be like an introduction of what the page is and then
// the access to the login page
// Last update 30/03/2023 - V7


// ########################################## IMPORTS ##########################################
import Link from 'next/link';
import Footer from '../components/footer';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

export default function Home({}) {
  const cookies = parseCookies();
  const accessToken = cookies.token;
  const router = useRouter();
  // ################################## REDIRECT IF LOGGED IN ####################################
  if(accessToken!==undefined){
    router.push('/authenticatedindex')

  }
  const handleLogin = () => {
    router.push('/singin');
  };
    // ########################################## RETURN ##########################################

    return (
      <>
        <header className="bg-blue-300 relative">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-center py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mx-auto">
            <Link href="/">
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center cursor-pointer hover:scale-105 transition duration-300">eLearning platform</h1>
        </Link>
             </div>
          
          <div className="flex items-center mt-4 sm:mt-0">
            <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out" onClick={handleLogin}>
              Log in
            </button>
          </div>
        </div>
        </header>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to our eLearning platform!</h1>
            <p className="text-lg mb-4">Here you can find a wide range of courses that will help you improve your skills and knowledge.</p>
            <p className="text-lg mb-4">Please sign in to access the courses.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
              Sign in
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }