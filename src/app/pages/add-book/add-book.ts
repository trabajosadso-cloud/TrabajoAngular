import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { HasUnsavedChanges } from '../../guards/unsaved-changes.guard';
@Component({
selector: 'app-add-book',
standalone: true,
imports: [FormsModule],
templateUrl: './add-book.html',
styleUrl: './add-book.css'
})
export class AddBook implements HasUnsavedChanges {
private bookService = inject(BookService);
private router = inject(Router);
title = signal('');
author = signal('');
year = signal(2026);
genre = signal<'Ficci\u00f3n' | 'T\u00e9cnico' | 'Historia' | 'Ciencia'>('T\u00e9cnico');
rating = signal(3);
description = signal('');
// SIGNAL: Indica si el formulario fue enviado exitosamente
private submitted = signal(false);
// COMPUTED: \u00bfHay datos escritos en el formulario?
private formHasData = computed(() =>
this.title().trim().length > 0 ||
this.author().trim().length > 0 ||
this.description().trim().length > 0
);
// Implementaci\u00f3n de la interfaz HasUnsavedChanges
hasUnsavedChanges(): boolean {
// Hay cambios si el formulario tiene datos Y no se ha enviado
return this.formHasData() && !this.submitted();
}
submit() {
if (!this.title().trim() || !this.author().trim()) return;
this.bookService.addBook({
title: this.title(),
author: this.author(),
year: this.year(),
genre: this.genre(),
rating: this.rating(),
description: this.description(),
available: true
});
this.submitted.set(true); // Marcar como enviado
this.router.navigate(['/libros']);
}
}