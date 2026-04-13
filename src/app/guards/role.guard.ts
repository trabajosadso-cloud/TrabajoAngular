import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
/**
* Fábrica de guard de roles.
* Recibe los roles permitidos y retorna un guard.
*
 * Uso:
 * canActivate: [roleGuard('admin')]
 * canActivate: [roleGuard('admin', 'editor')]
 */
export function roleGuard(...allowedRoles: string[]): CanActivateFn {
return (route, state) => {
const authService = inject(AuthService);
const router = inject(Router);
// Primero: ¿está autenticado?
if (!authService.isAuthenticated()) {
console.log('[ROLE GUARD] No autenticado');
return router.createUrlTree(['/login'], {
queryParams: { returnUrl: state.url }
});
}
// Segundo: ¿tiene el rol permitido?
const userRole = authService.currentUser()?.role;
if (userRole && allowedRoles.includes(userRole)) {
console.log(`[ROLE GUARD] Acceso permitido (rol: ${userRole})`);
return true;
}
// Rol insuficiente: redirigir a página de acceso denegado
console.log(
`[ROLE GUARD] Acceso denegado. Rol ${userRole} no está en [${allowedRoles}]`
);
return router.createUrlTree(['/sin-permisos']);
};
}