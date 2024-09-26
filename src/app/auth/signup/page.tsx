'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import {account} from "@/share/lib/appwrite";
import {SignupDto} from "@/share/types/user.type";
import {useRouter} from "next/navigation";


const Signup = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignupDto>();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const onSubmit: SubmitHandler<SignupDto> = async (data) => {
        try {
            // Create the user in Appwrite
            await account.create('unique()', data.email, data.password, data.name);

            // Show success message
            setSuccess('User created successfully!');
            setError('');
            reset();  // Reset form fields
            router.push('/auth/verify-email')
        } catch (error: unknown) {
            if (error.code === 409) {
                setError('Email already exists. Please use a different email.');
            } else {
                setError(error.message);
            }
            setSuccess('');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-black mb-4">Create User</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 w-full border rounded text-black"
                            placeholder="Enter name"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 w-full border rounded text-black"
                            placeholder="Enter email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address',
                                },
                            })}
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
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Sign Up
                    </button>

                    {/* Error and Success Messages */}
                    {error && <p className="text-red-600">{error}</p>}
                    {success && <p className="text-green-600">{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
