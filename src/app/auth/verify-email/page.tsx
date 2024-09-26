'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {account} from "@/share/lib/appwrite";

const VerifyEmail = () => {
    const [emailSent, setEmailSent] = useState(false);
    const router = useRouter();

    const sendVerificationEmail = async () => {
        try {
            await account.createVerification(process.env.NEXT_PUBLIC_APPWRITE_VERIFICATION_URL || '');
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
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Email Verification Required</h2>
                <p className="mb-4">
                    Please verify your email to access your account. We’ve sent a verification email to your address.
                </p>
                {emailSent ? (
                    <p className="text-green-600">Verification email sent! Please check your inbox.</p>
                ) : (
                    <button
                        onClick={sendVerificationEmail}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Resend Verification Email
                    </button>
                )}
                <button
                    onClick={() => router.push('/auth/signin')}
                    className="w-full py-2 px-4 bg-gray-600 text-white rounded mt-4 hover:bg-gray-700 transition duration-200"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;
