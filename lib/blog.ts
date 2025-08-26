// src/lib/blog.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { PostData } from '@/types'; // Assuming your PostData type is defined in @/types

// --- This is the main change: A function to get the correct directory based on language ---
const getPostsDirectory = (locale: string) => path.join(process.cwd(), 'content/blog', locale);

/**
 * Fetches sorted post data for a specific locale.
 * @param locale - The language of the posts to fetch (e.g., 'en', 'fr', 'ar').
 */
export function getSortedPostsData(locale: string): Omit<PostData, 'contentHtml'>[] {
    const postsDirectory = getPostsDirectory(locale);

    // Gracefully handle cases where a language directory doesn't exist yet
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const data = matterResult.data as {
            title?: string;
            date?: string;
            author?: string;
            description?: string;
            image?: string;
        };

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

/**
 * Generates all possible paths (id + locale) for static site generation.
 * @param locales - An array of all supported locales (e.g., ['en', 'fr', 'ar']).
 */
export function getAllPostIds(locales: string[]) {
    const paths: { params: { id: string; locale: string } }[] = [];

    locales.forEach((locale) => {
        const postsDirectory = getPostsDirectory(locale);

        if (fs.existsSync(postsDirectory)) {
            const fileNames = fs.readdirSync(postsDirectory);
            fileNames.forEach((fileName) => {
                paths.push({
                    params: {
                        id: fileName.replace(/\.md$/, ''),
                        locale: locale,
                    },
                });
            });
        }
    });

    return paths;
}

/**
 * Fetches the full data for a single post, based on its ID and locale.
 * @param id - The ID of the post (the filename without .md).
 * @param locale - The language of the post to fetch.
 */
export async function getPostData(id: string, locale: string): Promise<PostData> {
    const fullPath = path.join(getPostsDirectory(locale), `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(remarkGfm)
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();
    const restData = matterResult.data as Omit<PostData, 'id' | 'contentHtml'>;

    // Ensure image URL is absolute here as well for consistency
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.upmerce.com';
    const imagePath = restData.image || '';
    const absoluteImageUrl = imagePath.startsWith('http')
        ? imagePath
        : `${baseUrl}${imagePath}`;

    return {
        id,
        contentHtml,
        ...restData,
        image: absoluteImageUrl, // Override with the absolute URL
    };
}