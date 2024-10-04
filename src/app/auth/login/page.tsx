'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import { account } from '@/share/lib/appwrite';
import { LoginDto } from '@/share/types/user.type';
import { loginWithGitHub } from '@/share/helpers/user.helper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    await account
      .createEmailPasswordSession(data.email, data.password)
      .then(async (response) => {
        console.log('response', response);
        router.push('/account/');
      })
      .catch((error) => {
        setError(error.message || 'Failed to log in.');
      });
  };

  return (
    <div className='py-4 md:py-8 dark:bg-gray-800'>
      <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>

            <button
              className='mb-2 mr-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
              type='button'
              onClick={loginWithGitHub}
            >
              <svg
                width='35'
                height='33'
                viewBox='0 0 97.707 98.907'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
                  fill='#ffffff'
                />
              </svg>
              Sign in with Github
            </button>

            <div className='flex items-center'>
              <div className='h-0.5 w-full bg-gray-200 dark:bg-gray-700'></div>
              <div className='px-5 text-center text-gray-500 dark:text-gray-400'>
                or
              </div>
              <div className='h-0.5 w-full bg-gray-200 dark:bg-gray-700'></div>
            </div>

            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-teal-600 focus:ring-teal-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='Enter email'
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className='mt-2 text-red-600'>{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Enter password'
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-teal-600 focus:ring-teal-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
                {errors.password && (
                  <p className='m-2 text-red-600'>{errors.password.message}</p>
                )}
              </div>

              {error && <p className='mt-2 text-red-600'>{error}</p>}
              <button
                type='submit'
                className='w-full rounded bg-teal-600 px-4 py-1.5 font-bold text-white'
              >
                Sign in
              </button>

              <Link
                href='/auth/signup'
                className='text-sm font-light text-gray-500 dark:text-gray-400'
              >
                Don’t have an account yet?{' '}
                <a
                  href=''
                  className='font-medium text-teal-600 hover:underline dark:text-teal-500'
                >
                  Sign up
                </a>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
