import { useEffect } from 'react';
import { DataContext } from "@/src/DataContext";
import { useRouter } from 'next/router';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'; 



export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        
    }, []);
    // className="block w-full py-4 px-4 mb-8 font-bold border-2 border-gray-900 rounded-md shadow text-gray-900 bg-green-500"
    return (
        <div className="px-5 pt-10 flex justify-center">
            <div className='w-full md:w-1/3 py-4 px-4 mb-8 font-bold border-2 border-gray-900 rounded-md shadow text-gray-900 btn-fix'>
                <ResetPasswordForm token={token} />
            </div>
        </div>
    );
}