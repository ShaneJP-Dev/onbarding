import React from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-6">
          We have received your company registration form. 
          Our team will contact you shortly to process your request.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/" 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}