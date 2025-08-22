import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostData } from '@/types';
import remarkGfm from 'remark-gfm'; // <-- 1. Import the plugin


const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getSortedPostsData(): PostData[] {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id and ensure required fields are present
    const { title, date, author, description = '', image = '' } = matterResult.data as {
      title: string;
      date: string;
      author: string;
      description?: string;
      image?: string;
    };
    return {
      id,
      title,
      date,
      author,
      description,
      image,
    };
  });

  // Sort posts by date in descending order (newest first)
  return allPostsData.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'why-upmerce-is-the-best'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into an HTML string
  const processedContent = await remark()
    .use(html)
    .use(remarkGfm) // <-- 2. Use the GFM plugin
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  const restData = matterResult.data as Omit<PostData, 'id'>;
  return {
    id,
    contentHtml,
    ...restData,
  };
}