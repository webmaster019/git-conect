'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { account } from '@/share/lib/appwrite';
import { SignupDto } from '@/share/types/user.type';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupDto>();
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
      reset(); // Reset form fields
      router.push('/auth/verify-email');
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
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-2xl font-semibold text-black'>Create User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Name Field */}
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-black'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              className='mt-1 w-full rounded border p-2 text-black'
              placeholder='Enter name'
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className='text-red-600'>{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-black'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              className='mt-1 w-full rounded border p-2 text-black'
              placeholder='Enter email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className='text-red-600'>{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-black'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='mt-1 w-full rounded border p-2 text-black'
              placeholder='Enter password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className='text-red-600'>{errors.password.message}</p>
            )}
          </div>

          <button
            type='submit'
            className='w-full rounded bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700'
          >
            Sign Up
          </button>

          {/* Error and Success Messages */}
          {error && <p className='text-red-600'>{error}</p>}
          {success && <p className='text-green-600'>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
