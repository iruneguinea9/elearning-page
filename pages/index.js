// Name : Index
// Author : Irune Guinea
// This is the index page of the app, here in the future could be like an introduction of what the page is and then
// the access to the login page
// Last update 05/04/2023 - V9


// ########################################## IMPORTS ##########################################
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
      <section class="relative bg-gray-900 overflow-hidden">
        <header>
          <nav class="relative px-6 py-6 flex justify-between items-center">
            <a class="text-white text-3xl font-bold leading-none" href="/">
              <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center cursor-pointer hover:scale-105 transition duration-300">eLearning platform</h1>
            </a>
            <div class="lg:hidden">
              <button class="navbar-burger flex items-center text-white p-3" onClick={handleLogin}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </button>
            </div>
            <a class="hidden lg:inline-block py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-l-xl rounded-t-xl transition duration-200"  onClick={handleLogin}>Log in</a>
          </nav>
        </header>
        <div class="relative pt-20 pb-20">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap -mx-4">
              <div class="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
                <div class="w-full text-center lg:text-left">
                  <div class="max-w-md mx-auto lg:mx-10">
                    <h2 class="mb-3 text-4xl lg:text-5xl text-white font-bold">
                      <span>Welcome to our </span>
                      <span class="text-green-600">eLearning platform</span>
                    </h2>
                  </div>
                  <div class="max-w-sm mx-auto lg:mx-10">
                    <p class="mb-6 text-gray-400 leading-loose">Here you can find a wide range of courses that will help you improve your skills and knowledge.

                      Please log in to access the courses.</p>
                    <div>
                      <a class="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-green-600 hover:bg-green-700 text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200" href="/singin">Log in</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-1/2 px-4 flex items-center justify-center">
                <img src="/images/men-on-chair.png" alt="this goes the pic"/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      </>
    );
  }