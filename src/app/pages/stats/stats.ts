import { Component, inject, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
@Component({
selector: 'app-stats',
standalone: true,
imports: [RouterLink],
templateUrl: './stats.html',
styleUrl: './stats.css'
})
export class Stats {
private bookService = inject(BookService);
// Acceso a signals del servicio
totalBooks = this.bookService.totalBooks;
availableBooks = this.bookService.availableBooks;
averageRating = this.bookService.averageRating;
// COMPUTED: Libros por género
booksByGenre = computed(() => {
const books = this.bookService.books();
const groups: Record<string, number> = {};
for (const b of books) {
groups[b.genre] = (groups[b.genre] || 0) + 1;
}
return Object.entries(groups).map(([genre, count]) => ({
genre, count
}));
});
// COMPUTED: Top libros por rating
topRated = computed(() =>
[...this.bookService.books()]
.sort((a, b) => b.rating - a.rating)
.slice(0, 3)
);
// COMPUTED: Porcentaje de disponibilidad
availabilityPercent = computed(() => {
const total = this.totalBooks();
if (total === 0) return 0;
return Math.round((this.availableBooks() / total) * 100);
});
constructor() {
// EFFECT: Actualizar título de la página
effect(() => {
document.title =
`BookShelf Stats - ${this.totalBooks()} libros`;
});
}
}