import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Btn from '../btn';

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter email.');
            return;
        }
        try {
            const response = await fetch('/auth/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            })
            if (response.ok) {
                const data = await response.json();
                // router.push('/');
            } else {
                const data = await response.json();
                // console.log(data.message.detail);
                setError(data.message.detail);
            }
        } catch (error) {
            setError('An error occurred.');
        }

    };


    return (
        <form onSubmit={handleSubmit} className='mx-2 lg:mx-10'>
            <input className="w-full mt-8 mb-4 py-3 px-6 h-12 text-sm font-bold placeholder-black border-2 border-black rounded-md focus:outline-indigo"
                type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
            <br />
            <Btn className={"bg-green-500"}>Send email</Btn>
        </form>
    );
}

export default ForgotPasswordForm;

