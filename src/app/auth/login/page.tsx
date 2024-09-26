'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import {useEffect, useState} from 'react';
import {account, OAuthProvider} from "@/share/lib/appwrite";
import {LoginDto} from "@/share/types/user.type";


const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginDto>();
    console.log("reset", reset)
    const [error, setError] = useState('');

    const onSubmit: SubmitHandler<LoginDto> = async (data) => {
       // try {
            // Attempt to sign in with Appwrite email/password
            await account.createEmailPasswordSession(data.email, data.password).then(async (response)=>{
                console.log("response", response)
                const user = await account.get();
                console.log("user", user)
            }).catch(error=>{
                setError(error.message || 'Failed to log in.');
            })

       /*     // Check if the user's email is verified
            const user = await account.get();
            if (!user.emailVerification) {
                setError('Please verify your email before logging in.');
                return;
            }

            // If email is verified, log in with NextAuth
            const result: unknown = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false, // Handle redirect manually
            });

            if (!result?.error) {
                router.push('/');
            } else {
                setError(result.error || 'Failed to log in.');
            }
        } catch (error: unknown) {
            setError(error.message || 'Failed to log in.');
        }*/
    };

    const loginWithGitHub = () => {
        account.createOAuth2Session(
            OAuthProvider.Github,
            'http://localhost:3000/success',
            'http://localhost:3000/auth/error',
            ['repo', 'user']
        );
    }
    useEffect(() => {
        (async ()=>{
            await account?.deleteSessions()
        })()
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-black">LogIn</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 w-full border rounded text-black"
                            placeholder="Enter email"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full border rounded text-black"
                            placeholder="Enter password"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>

                    <button
                        onClick={loginWithGitHub}
                        type="button"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        loginWithGitHub
                    </button>

                    {/* Error Messages */}
                    {error && <p className="text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
