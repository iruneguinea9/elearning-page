import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Btn from '../btn';
import { validatePassword } from './validators';
import PasswordStrengthIndicator from './PasswordStrengthIndicator.jsx';

function ResetPasswordForm({ token }) {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState("");
    const [disabledBtn, setDisabledBtn] = useState(true);

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/auth/reset-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    token: token,
                })
            })
            if (response.ok) {
                const data = await response.json();
                router.push('/auth/login');
            } else {
                const data = await response.json();
                // console.log(data.message.detail);
            }
        } catch (error) {
            setError('An error occurred.');
        }

    };

    const [
        {
            strength,
            score,
            hasSixChar,
            hasLowerCase,
            hasNumericChar,
            hasSpecialChar,
            hasUpperCase,
            maxThirtySixChar,
        },
        setValidations,
    ] = useState({ ...validatePassword(password || '') });


    useEffect(() => {
        if (!token) {
            setError('No token');
            return;
        } else {
            setError('');
        }
        const validationData = validatePassword(password);
        setValidations({ ...validationData });
        if (validationData.isValid) {
            if (password === confirm) {
                setError('');
                setDisabledBtn(false);
            } else {
                setError('Passwords do not match.');
            }
        } else {
            console.log(validationData);
            setError('Password is not valid.');
            setDisabledBtn(true);
        }
    }
        , [password, confirm, token]);

    return (
        <form onSubmit={handleSubmit} className='mx-2 lg:mx-10'>
            <label>
                <input className="w-full mt-8 mb-4 py-3 px-6 h-12 text-sm font-bold placeholder-black border-2 border-black rounded-md focus:outline-indigo"
                    type="password" placeholder="New password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <label>
                <input className="w-full mb-4 py-3 px-6 h-12 text-sm font-bold placeholder-black border-2 border-black rounded-md focus:outline-indigo"
                    type="password" placeholder="Confirm new password" name="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </label>
            <br />
            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
            <br />
            <PasswordStrengthIndicator
                // strength, hasSixChar, hasLowerCase, hasUpperCase, hasNumericChar, hasSpecialChar, maxThirtySixChar
                score={score}
                strength={strength}
                hasSixChar={hasSixChar}
                hasLowerCase={hasLowerCase}
                hasUpperCase={hasUpperCase}
                hasNumericChar={hasNumericChar}
                hasSpecialChar={hasSpecialChar}
                maxThirtySixChar={maxThirtySixChar}
            />
            <br />
            <Btn className={""} disabled={error} bg_color="bg-green-500">Reset password</Btn>
        </form>
    );
}

export default ResetPasswordForm;

