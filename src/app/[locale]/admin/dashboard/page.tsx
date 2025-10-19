// src/app/admin/dashboard/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useLocale } from 'next-intl';

export default function AdminDashboardPage() {
  const router = useRouter();
  const locale = useLocale();
  const handleLogout = async () => {
    await signOut(auth);
    router.push(`/${locale}/admin/login`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg text-gray-300 mb-8">Welcome administrator, From here you can manage client questionnaires.</p>
      <div className="space-x-4">
        <button
          onClick={() => router.push(`/${locale}/admin/questionnaires`)} // You might list all questionnaires here later
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200"
        >
          View Questionnaires
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}