import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import LoginForm from '@/components/auth/LoginForm';



export default function Login() {
    const token = "";
    const router = useRouter();



    useEffect(() => {
        if (token) {
            // console.log(token);
            // router.push('/');
        }
    }, [token]);

    return (
        <div className="px-5 pt-10 flex justify-center">
            <div className='w-full md:w-1/3 py-4 px-4 mb-8 font-bold border-2 border-gray-900 rounded-md shadow text-gray-900 btn-fix'>           
                
                <div className='mt-5 flex-grow text-center'>
                    <LoginForm />
                    <Link href="/auth/forgot-password" className="hover:text-indigo-500">Forgot password?</Link>
                </div>
            </div>
        </div>
    );
}