import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBook {
  author = signal('');

  description = signal('');

  genre = signal<'Ficción' | 'Técnico' | 'Historia' | 'Ciencia'>('Técnico');

  rating = signal(3);

  title = signal('');

  year = signal(2026);

  private bookService = inject(BookService);

  private router = inject(Router);

  submit() {
    if (!this.title().trim() || !this.author().trim()) return;

    this.bookService.addBook({
      title: this.title(),
      author: this.author(),
      year: this.year(),
      genre: this.genre(),
      rating: this.rating(),
      description: this.description(),
      available: true,
    });

    // Navegación programática al catálogo
    this.router.navigate(['/libros']);
  }
}
