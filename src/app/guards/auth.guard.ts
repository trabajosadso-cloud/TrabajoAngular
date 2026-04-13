import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
/**
* Guard de autenticación.
* Verifica si el usuario ha iniciado sesión.
* Si NO está autenticado, redirige a /login.
 */
export const authGuard: CanActivateFn = (route, state) => {
// inject() funciona dentro de guards funcionales
const authService = inject(AuthService);
const router = inject(Router);
// Leer el computed signal directamente
if (authService.isAuthenticated()) {
	// Usuario autenticado: permitir acceso
	return true;
}
// No autenticado: redirigir a login
// Guardamos la URL original para redirigir después del login
console.log('[GUARD] Acceso denegado. Redirigiendo a /login');
return router.createUrlTree(['/login'], {
queryParams: { returnUrl: state.url }
});
};