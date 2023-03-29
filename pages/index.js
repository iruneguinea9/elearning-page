// Name : Index
// Author : Irune Guinea
// This is the index page of the app, here in the future could be like an introduction of what the page is and then
// the access to the login page
// Last update 29/03/2023 - V5


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
          <div className="xl:container xl:mx-auto flex flex-col items-center sm:justify-between text-center py-3">
            <Link href="/">
              <h1 className="font-bold text-4xl">eLearning platform</h1>
            </Link>
          </div>
          <div className="absolute top-0 right-0 py-3 pr-4">
            <button className="text-white font-medium" onClick={handleLogin}>
              Log in
            </button>
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