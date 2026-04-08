export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: 'Ficción' | 'Técnico' | 'Historia' | 'Ciencia';
  rating: number; // 1 a 5
  description: string;
  available: boolean;
}
