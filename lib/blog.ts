// src/lib/blog.ts

import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostData } from '@/types';
import remarkGfm from 'remark-gfm';

// Corrected path pointing to the project root
const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getSortedPostsData(): Omit<PostData, 'contentHtml'>[] {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const data = matterResult.data as { [key: string]: any };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.upmerce.com';
    const imagePath = data.image || '';

    const absoluteImageUrl = imagePath.startsWith('http')
      ? imagePath
      : `${baseUrl}${imagePath}`;

    return {
      id,
      title: data.title || '',
      date: data.date || '',
      author: data.author || '',
      description: data.description || '',
      image: absoluteImageUrl,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();
  const restData = matterResult.data as Omit<PostData, 'id' | 'contentHtml'>;
  
  return {
    id,
    contentHtml,
    ...restData,
  };
}