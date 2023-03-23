// Name : Index
// Author : Irune Guinea
// This is the index page of the app, here in the future could be like an introduction of what the page is and then
// the access to the login page
// Last update 23/03/2023 - V3


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
      <header className="bg-blue-300">
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
      <div className="flex justify-center items-center" style={{ minHeight: '450px' }}>
        <div>

          <h1> This will be a cool welcoming page with information about the platform!</h1>

   
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}