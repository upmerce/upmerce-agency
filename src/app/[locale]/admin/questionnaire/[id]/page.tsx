// src/app/admin/questionnaire/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth'; // Firebase Client Auth
import { auth } from '@/lib/firebase';
import { useLocale } from 'next-intl';

interface FormDataDisplayProps {
  data: Record<string, unknown> | null; // more explicit than any
}

const FormDataDisplay: React.FC<FormDataDisplayProps> = ({ data }) => {
  if (!data) return <p className="text-gray-400">No data available.</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white space-y-4">
      <h3 className="text-xl font-bold mb-4">Questionnaire Details:</h3>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="grid grid-cols-2 gap-4 border-b border-gray-700 pb-2 last:border-b-0">
          <span className="font-medium text-gray-300">{key}:</span>
          <span className="text-gray-200">
            {Array.isArray(value)
              ? value.length > 0 ? value.join(', ') : 'None selected'
              : typeof value === 'boolean'
                ? value ? 'Yes' : 'No'
                : value === undefined || value === null || value === ''
                  ? 'N/A'
                  : String(value)}
          </span>
        </div>
      ))}
    </div>
  );
};


export default function AdminQuestionnairePage() {
  const router = useRouter();
  const locale = useLocale();
  const params = useParams();
  const questionnaireId = params.id as string;

  // user state is not used directly; auth status is handled via onAuthStateChanged and token checks
  const [, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<Record<string, unknown> | null>(null); // State to hold fetched form data
  const [error, setError] = useState<string | null>(null);

  const fetchQuestionnaireData = React.useCallback(async (idToken: string) => {
    try {
      const response = await fetch('/api/admin/get-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ questionnaireId }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch questionnaire data.');
      }

      const result = await response.json();
      setFormData(result.formData ?? null);
    } catch (err: unknown) {
      console.error("Error fetching questionnaire data:", err);
      const e = err as { message?: string };
      setError(e.message || "Could not load questionnaire data.");
    }
  }, [questionnaireId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push(`/${locale}/admin/login`); // Redirect to admin login if not logged in
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        // Force refresh token to get latest claims
        const idTokenResult = await currentUser.getIdTokenResult(true); 

        if (idTokenResult.claims.admin) { // Check for the custom claim
          setIsAdmin(true);
          // Fetch questionnaire data ONLY if admin
          await fetchQuestionnaireData(idTokenResult.token); 
        } else {
          setError("Access Denied: You are not an administrator.");
          router.push(`/${locale}/admin/access-denied`); // Redirect if not admin
        }
      } catch (err) {
        console.error("Error checking admin claims:", err);
        setError("Error verifying admin status.");
        router.push(`/${locale}/admin/login`); // Redirect on error
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [questionnaireId, router, fetchQuestionnaireData, locale]);

  // fetchQuestionnaireData moved above and wrapped in useCallback


  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading admin panel...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">{error}</div>;
  }

  if (!isAdmin) {
    // This case should be handled by redirects above, but as a fallback
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">Access Denied.</div>;
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin: Questionnaire Review</h1>
        <p className="text-gray-400 mb-8">Questionnaire ID: <span className="font-mono text-blue-300">{questionnaireId}</span></p>
        {formData ? (
          <FormDataDisplay data={formData} />
        ) : (
          <p className="text-gray-400">Loading form data...</p>
        )}
        <button
          onClick={() => router.push(`/${locale}/admin/dashboard`)} // Example for going back
          className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200"
        >
          Back to Admin Dashboard
        </button>
      </div>
    </div>
  );
}