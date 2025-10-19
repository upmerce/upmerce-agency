// src/app/admin/login/page.tsx
'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useLocale } from 'next-intl';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const locale = useLocale();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On successful login, Firebase Auth will trigger onAuthStateChanged in AdminQuestionnairePage
      // The AdminQuestionnairePage will then check for claims and redirect appropriately.
      // For now, let's redirect to a default admin dashboard or back to the questionnaire if that's the intent.
      router.push(`/${locale}/admin/dashboard`); 
    } catch (err: unknown) {
      console.error("Login error:", err);
      const e = err as { message?: string };
      setError(e.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}