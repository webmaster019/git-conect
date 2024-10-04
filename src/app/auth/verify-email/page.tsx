'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/share/lib/appwrite';

const VerifyEmail = () => {
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const sendVerificationEmail = async () => {
    try {
      await account.createVerification(
        process.env.NEXT_PUBLIC_APPWRITE_VERIFICATION_URL || ''
      );
      setEmailSent(true);
    } catch (error: unknown) {
      console.error('Failed to send verification email', error.message);
    }
  };

  useEffect(() => {
    // Optionally auto-send the verification email when the page loads
    sendVerificationEmail();
  }, []);

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-2xl font-semibold'>
          Email Verification Required
        </h2>
        <p className='mb-4'>
          Please verify your email to access your account. We’ve sent a
          verification email to your address.
        </p>
        {emailSent ? (
          <p className='text-green-600'>
            Verification email sent! Please check your inbox.
          </p>
        ) : (
          <button
            onClick={sendVerificationEmail}
            className='w-full rounded bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700'
          >
            Resend Verification Email
          </button>
        )}
        <button
          onClick={() => router.push('/auth/signin')}
          className='mt-4 w-full rounded bg-gray-600 px-4 py-2 text-white transition duration-200 hover:bg-gray-700'
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
