// in types/index.ts

export type PostData = {
  id: string;
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
  contentHtml?: string;
  tags?: string[];
};