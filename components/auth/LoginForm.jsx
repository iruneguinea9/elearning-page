import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DataContext } from "@/src/DataContext";
import Btn from '../btn';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');
    const userContext = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        try {
            const response = await fetch('/api/auth/get-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                body: JSON.stringify({
                    username,
                    password
                })
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data.token)
                userContext.setToken(data.token)
                router.push('/');
            } else {
                const data = await response.json();
                // console.log(data.message.detail);
                setError(data.message.detail);
            }
        } catch (error) {
            setError('An error occurred while logging in.');
        }

    };

    useEffect(() => {
        if (userContext.token) {
            // router.push('/');
        }
    } , [userContext.token])


    return (
        <form onSubmit={handleSubmit} className='mx-2 lg:mx-10'>
            <label>
                <input className="w-full mb-4 py-3 px-6 h-12 text-sm font-bold placeholder-black border-2 border-black rounded-md focus:outline-indigo"
                    type="text" placeholder="Username/Email" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                <input className="w-full mb-4 py-3 px-6 h-12 text-sm font-bold placeholder-black border-2 border-black rounded-md focus:outline-indigo"
                    type="password" placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <br />
            <Btn className={"bg-green-500"}>Log In</Btn>
        </form>
    );
}

export default LoginForm;

