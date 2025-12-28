// src/app/[locale]/blog/[id]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../../../../lib/blog';
import mediumStyles from './MediumPost.module.css';
import Image from 'next/image';
import { generateCustomMetadata } from '../../../../../lib/metadata';
import { siteConfig } from '@/app/config/site';
import ShareButtons from '@/components/ui/ShareButtons';
import AuthorBio from '@/components/ui/AuthorBio';
import BlogCallToAction from '@/components/ui/BlogCallToAction';
import RelatedPostsSection from '@/components/ui/RelatedPostsSection';
import PostCategoriesAndTags from '@/components/ui/PostCategoriesAndTags';
import { Box, Chip, Divider, Avatar, Stack, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type PostPageProps = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateStaticParams() {
  const paths = getAllPostIds(['en', 'fr', 'ar']);
  return paths.map(path => path.params);
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const { id, locale } = await params;
    const postData = await getPostData(id, locale);
    const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'https://upmerce.com';
    
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'mainEntityOfPage': { '@type': 'WebPage', '@id': `${siteUrl}/blog/${id}` },
      'headline': postData.title,
      'description': postData.description,
      'image': `${siteUrl}${postData.image}`,
      'author': { '@type': 'Organization', 'name': postData.author },
      'publisher': {
        '@type': 'Organization',
        'name': siteConfig.brandName,
        'logo': { '@type': 'ImageObject', 'url': `${siteUrl}${siteConfig.logo}` }
      },
      'datePublished': postData.date,
    };

    const baseMetadata = generateCustomMetadata({
      title: postData.title,
      description: postData.description,
      pathname: `/blog/${id}`,
      images: [{ src: postData.image, alt: postData.title }],
      type: 'article',
      publishedTime: postData.date,
      author: { name: postData.author },
      keywords: postData.tags || [],
    });

    return {
      ...baseMetadata,
      other: { 'script[type="application/ld+json"]': JSON.stringify(jsonLd) },
    };
  } catch {
    return { title: 'Post not found' };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { id, locale } = await params;
    const postData = await getPostData(id, locale);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://upmerce.com';
    const currentPostUrl = `${siteUrl}/${locale}/blog/${id}`;
    const allPosts = await getSortedPostsData(locale);

    return (
      <main className={mediumStyles["medium-post-bg"]}>
        {/* Progress Bar could be added here later */}
        
        <article className={mediumStyles["medium-post-container"]}>
          
          {/* 1. HEADER SECTION (Pt: Top padding) */}
          <Box sx={{ pt: { xs: 12, md: 16 }, pb: 6, textAlign: 'center' }}>
            
            {/* Category Pill */}
            {postData.categories && postData.categories[0] && (
               <Chip 
                label={postData.categories[0]} 
                sx={{ 
                  mb: 4, 
                  bgcolor: 'rgba(217, 119, 6, 0.1)', // Amber tint
                  color: '#fbbf24', // Amber text
                  fontWeight: 700, 
                  letterSpacing: 1,
                  border: '1px solid rgba(217, 119, 6, 0.2)',
                  textTransform: 'uppercase'
                }} 
              />
            )}

            {/* The Title */}
            <h1 className={mediumStyles["medium-post-title"]} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '2rem' }}>
              {postData.title}
            </h1>

            {/* Author & Meta */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center" 
              alignItems="center"
              sx={{ color: 'text.secondary' }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#D97706', fontSize: '0.875rem' }}>
                  {postData.author?.charAt(0) || 'U'}
                </Avatar>
                <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                  {postData.author}
                </Typography>
              </Stack>
              
              <Box sx={{ display: { xs: 'none', sm: 'block' }, width: 4, height: 4, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)' }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {postData.date}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* 2. MAIN IMAGE (Cinematic) */}
          {postData.image && (
            <Box sx={{ position: 'relative', mb: 8 }}>
               <Image
                src={postData.image}
                alt={postData.title}
                className={mediumStyles["medium-post-image"]}
                width={1200}
                height={630}
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </Box>
          )}

          {/* 3. THE CONTENT */}
          <div
            className={mediumStyles["medium-post-content"]}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
          />

          {/* 4. FOOTER ACTIONS */}
          <Box sx={{ mt: 10, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
             <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                <Box>
                   <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1 }}>
                      Share this insight
                   </Typography>
                   <ShareButtons postUrl={currentPostUrl} postTitle={postData.title} />
                </Box>
                {/* Tags */}
                {postData.tags && (
                   <Stack direction="row" spacing={1}>
                      {postData.tags.map(tag => (
                         <Chip key={tag} label={`#${tag}`} size="small" sx={{ color: 'rgba(255,255,255,0.6)', bgcolor: 'rgba(255,255,255,0.05)' }} />
                      ))}
                   </Stack>
                )}
             </Stack>
          </Box>

          {/* 5. AUTHOR & CTA */}
          <Box sx={{ mt: 8 }}>
            <AuthorBio authorName={postData.author} locale={locale} />
          </Box>

          <Box sx={{ mt: 8 }}>
            <BlogCallToAction locale={locale} />
          </Box>

          {/* 6. RELATED POSTS */}
          <Box sx={{ mt: 12, pt: 8, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 6, textAlign: 'center' }}>
               Further Intelligence
            </Typography>
            <RelatedPostsSection
              currentPostId={id}
              currentPostCategories={postData.categories || []}
              currentPostTags={postData.tags || []}
              allPosts={allPosts}
              locale={locale}
            />
          </Box>

        </article>
      </main>
    );
  } catch {
    notFound();
  }
}