// src/app/[locale]/blog/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { getSortedPostsData } from '../../../../lib/blog';

export const metadata: Metadata = {
  title: 'The Upmerce Agency Blog',
  description: 'Articles and insights from the Upmerce team.',
};
type BlogProps = Promise<{ locale: string }>;

export default async function BlogPage({ params }: { params: BlogProps }) {
  const { locale } = await params;
  const allPostsData = getSortedPostsData(locale);

  return (
    <section style={{ padding: '2rem' }}>
      <h1>The Upmerce Blog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allPostsData.map(({ id, date, title, author }) => (
          <li key={id} style={{ marginBottom: '1.5rem' }}>
            <Link href={`/blog/${id}`} style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
              {title}
            </Link>
            <br />
            <small style={{ color: '#666' }}>
              By {author} on {date}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}