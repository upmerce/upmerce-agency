// src/app//not-found.tsx
'use client';
// Note: In Next.js App Router, standard metadata exports might not work directly in not-found.tsx 
// if it's rendered inside a layout that already has metadata.
// However, this file structure is correct for the 404 UI.

import NotFoundContent from '@/components/layout/NotFoundContent';

export default function NotFound() {
  return <NotFoundContent />;
}