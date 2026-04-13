import { Injectable, signal, computed, effect } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private booksSignal = signal<Book[]>([
    {
      id: 1,
      title: 'Clean	Code',
      author: 'Robert	C. Martin',
      year: 2008,
      genre: 'Técnico',
      rating: 5,
      description: 'Guía	esencial	sobre	cómo	escribir	código	limpio	y	mantenible.',
      available: true,
    },
    {
      id: 2,
      title: 'Cien	años	de	soledad',
      author: 'Gabriel	García	Márquez',
      year: 1967,
      genre: 'Ficción',
      rating: 5,
      description: 'La	obra	maestra	del	realismo	mágico	latinoamericano.',
      available: true,
    },
    {
      id: 3,
      title: 'Sapiens',
      author: 'Yuval	Noah	Harari',
      year: 2011,
      genre: 'Historia',
      rating: 4,
      description: 'Breve	historia	de	la	humanidad	desde	los	orígenes.',
      available: false,
    },
    {
      id: 4,
      title: 'El	universo	en	una	cáscara	de	nuez',
      author: 'Stephen	Hawking',
      year: 2001,
      genre: 'Ciencia',
      rating: 4,
      description: 'Exploración	accesible	de	la	física	moderna	y	cosmología.',
      available: true,
    },
    {
      id: 5,
      title: 'Design	Patterns',
      author: 'Gang	of	Four',
      year: 1994,
      genre: 'Técnico',
      rating: 5,
      description: 'El	libro	fundacional	sobre	patrones	de	diseño	de	software.',
      available: true,
    },
  ]);

  readonly books = this.booksSignal.asReadonly();

  searchTerm = signal('');

  genreFilter = signal<string>('');

  totalBooks = computed(() => this.books().length);

  availableBooks = computed(() => this.books().filter((b) => b.available).length);

  genres = computed(() => {
    const g = this.books().map((b) => b.genre);
    return [...new Set(g)];
  });

  filteredBooks = computed(() => {
    let result = this.books();
    const search = this.searchTerm().toLowerCase().trim();
    const genre = this.genreFilter();

    if (search) {
      result = result.filter(
        (b) => b.title.toLowerCase().includes(search) || b.author.toLowerCase().includes(search),
      );
    }
    if (genre) {
      result = result.filter((b) => b.genre === genre);
    }
    return result;
  });

  averageRating = computed(() => {
    const all = this.books();
    if (all.length === 0) return 0;
    const sum = all.reduce((acc, b) => acc + b.rating, 0);
    return Math.round((sum / all.length) * 10) / 10;
  });

  getBookById(id: number): Book | undefined {
    return this.books().find((b) => b.id === id);
  }
  addBook(book: Omit<Book, 'id'>) {
    const maxId = Math.max(0, ...this.books().map((b) => b.id));
    this.booksSignal.update((list) => [...list, { ...book, id: maxId + 1 }]);
  }
  toggleAvailability(id: number) {
    this.booksSignal.update((list) =>
      list.map((b) => (b.id === id ? { ...b, available: !b.available } : b)),
    );
  }
  deleteBook(id: number) {
    this.booksSignal.update((list) => list.filter((b) => b.id !== id));
  }
}
