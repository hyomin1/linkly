export interface Link {
  id: number;
  title: string;
  description: string;
  image: string;
  siteName: string;
  url: string;
  isFavorite: boolean;
  createdAt: string;
  categoryId: number | null;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
}

export type Favorite = 'all' | 'favorite';
