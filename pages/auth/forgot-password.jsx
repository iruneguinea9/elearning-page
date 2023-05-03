import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';



export default function ResetPassword() {
    
    const router = useRouter();

    useEffect(() => {
        
    }, []);
    // className="block w-full py-4 px-4 mb-8 font-bold border-2 border-gray-900 rounded-md shadow text-gray-900 bg-green-500"
    return (
        <div className="px-5 pt-10 flex justify-center">
            <div className='w-full md:w-1/3 py-4 px-4 mb-8 font-bold border-2 border-gray-900 rounded-md shadow text-gray-900 btn-fix'>
                <ForgotPasswordForm />
            </div>
        </div>
    );
}