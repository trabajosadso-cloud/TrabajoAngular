import { Component, inject } from '@angular/core';
  import { RouterLink } from '@angular/router';
  import { BookService } from '../../services/book.service';
  
  @Component({
    selector: 'app-book-list',
    standalone: true,
    imports: [RouterLink],
   templateUrl: './book-list.html',
   styleUrl: './book-list.css'
 })
 export class BookList {
   bookService = inject(BookService);
 }