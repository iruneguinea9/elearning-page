import Link from 'next/link';
import Footer from '../components/footer';

export default function Home({}) {
  return (
    <>
      <header className="bg-blue-300">
        <div className="xl:container xl:mx-auto flex flex-col items-center sm:justify-between text-center py-3">
          <Link href="/">
            <h1 className="font-bold text-4xl">eLearning platform</h1>
          </Link>
        </div>
      </header>
      <div className="flex justify-center items-center" style={{ minHeight: '450px' }}>
        <div>
          <Link href={`singin`}>
          <h1> In the future this will be a cool page to access the login</h1>
  
            click here to log in</Link>
   
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}