import { Routes } from '@angular/router';
export const routes: Routes = [
{
path: 'inicio',
loadComponent: () =>
import('./pages/home/home').then(m => m.Home)
},
{
path: 'libros',
loadComponent: () =>
import('./pages/book-list/book-list').then(m => m.BookList)
},
{
path: 'libros/:id', // Ruta dinámica con parámetro
loadComponent: () =>
import('./pages/book-detail/book-detail').then(m => m.BookDetail)
},
{
path: 'agregar',
loadComponent: () =>
import('./pages/add-book/add-book').then(m => m.AddBook)
},
{
path: 'estadisticas',
loadComponent: () =>
import('./pages/stats/stats').then(m => m.Stats)
},
{
path: '',
redirectTo: 'inicio',
pathMatch: 'full'
},
{
path: '**', // Cualquier ruta no definida
redirectTo: 'inicio'
}
];