import { Component, inject, signal, computed, effect, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  // SIGNAL: ID del libro actual (desde la URL)
  bookId = signal<number>(0);

  // COMPUTED: Libro actual basado en el ID
  book = computed<Book | undefined>(() =>
    this.bookService.getBookById(this.bookId())
  );

  // COMPUTED: ¿Existe el libro?
  bookExists = computed(() => this.book() !== undefined);

  // COMPUTED: Libros del mismo género (recomendaciones)
  relatedBooks = computed(() => {
    const current = this.book();
    if (!current) return [];
    return this.bookService.books()
      .filter(b => b.genre === current.genre && b.id !== current.id);
  });

  constructor() {
    // EFFECT: Log cada vez que se ve un libro diferente
    effect(() => {
      const b = this.book();
      if (b) {
        console.log(`Viendo libro: "${b.title}" de ${b.author}`);
      }
    });
  }

  ngOnInit() {
    // Leer el parámetro :id de la URL
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.bookId.set(id);
    });
  }

  toggleAvailability() {
    this.bookService.toggleAvailability(this.bookId());
  }

  deleteAndGoBack() {
    this.bookService.deleteBook(this.bookId());
    // Navegación programática: volver al catálogo
    this.router.navigate(['/libros']);
  }
}