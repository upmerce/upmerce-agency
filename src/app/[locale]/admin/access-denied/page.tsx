// src/app/admin/access-denied/page.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function AccessDeniedPage() {
  const router = useRouter();
  const locale = useLocale();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-300 mb-6">You do not have the necessary permissions to view this page.</p>
        <button
          onClick={() => router.push(`/${locale}/admin/login`)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}