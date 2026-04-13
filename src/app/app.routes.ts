import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
export const routes: Routes = [
// ===== RUTAS P\u00daBLICAS (sin guard) =====
{
path: 'inicio',
loadComponent: () =>
import('./pages/home/home').then(m => m.Home)
},
{
path: 'login',
loadComponent: () =>
import('./pages/login/login').then(m => m.Login)
},
{
path: 'sin-permisos',
loadComponent: () =>
import('./pages/no-permission/no-permission')
.then(m => m.NoPermission)
},
// ===== RUTAS PROTEGIDAS (requieren autenticaci\u00f3n) =====
{
path: 'libros',
loadComponent: () =>
import('./pages/book-list/book-list').then(m => m.BookList),
canActivate: [authGuard] // Solo usuarios autenticados
},
{
path: 'libros/:id',
loadComponent: () =>
import('./pages/book-detail/book-detail')
.then(m => m.BookDetail),
canActivate: [authGuard] // Solo usuarios autenticados
},
{
path: 'estadisticas',
loadComponent: () =>
import('./pages/stats/stats').then(m => m.Stats),
canActivate: [authGuard] // Solo usuarios autenticados
},
// ===== RUTAS CON ROL ESPEC\u00cdFICO =====
{
path: 'agregar',
loadComponent: () =>
import('./pages/add-book/add-book').then(m => m.AddBook),
canActivate: [roleGuard('admin', 'editor')], // Admin o Editor
canDeactivate: [unsavedChangesGuard] // Proteger salida
},
// ===== REDIRECCIONES =====
{
path: '',
redirectTo: 'inicio',
pathMatch: 'full'
},
{
path: '**',
redirectTo: 'inicio'
}
];