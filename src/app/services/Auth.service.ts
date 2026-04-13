import { Injectable, signal, computed, effect } from '@angular/core';
// Modelo del usuario
export interface User {
id: number;
username: string;
role: 'admin' | 'editor' | 'viewer';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
static isAuthenticated() {
    throw new Error('Method not implemented.');
}
// ============================
// SIGNAL: Estado del usuario actual
// ============================
private currentUserSignal = signal<User | null>(null);
// Solo lectura para consumidores externos
readonly currentUser = this.currentUserSignal.asReadonly();
// ============================
// COMPUTED: Valores derivados
// ============================
/** ¿Está autenticado? (cualquier usuario logueado) */
isAuthenticated = computed(() =>
this.currentUser() !== null
);
/** ¿Es administrador? */
isAdmin = computed(() =>
this.currentUser()?.role === 'admin'
);
/** ¿Es al menos editor? (admin o editor) */
isEditorOrAbove = computed(() => {
const role = this.currentUser()?.role;
return role === 'admin' || role === 'editor';
});
/** Nombre para mostrar en la UI */
displayName = computed(() =>
this.currentUser()?.username ?? 'Invitado'
);
/** Rol formateado */
roleName = computed(() => {
const role = this.currentUser()?.role;
switch (role) {
case 'admin': return 'Administrador';
case 'editor': return 'Editor';
case 'viewer': return 'Lector';
default: return 'Sin rol';
}
});
constructor() {
// EFFECT: Logging de cambios de autenticación
effect(() => {
const user = this.currentUser();
if (user) {
console.log(
`[AUTH] Sesión iniciada: ${user.username} (rol: ${user.role})`
);
} else {
console.log('[AUTH] Sesión cerrada');
}
});
// EFFECT: Sincronizar con localStorage
effect(() => {
const user = this.currentUser();
if (user) {
localStorage.setItem('bookshelf_user', JSON.stringify(user));
} else {
localStorage.removeItem('bookshelf_user');
}
});
// Restaurar sesión al iniciar
this.restoreSession();
}
// ============================
// MÉTODOS
// ============================
login(username: string, role: User['role']) {
this.currentUserSignal.set({
id: Date.now(),
username,
role
});
}
logout() {
this.currentUserSignal.set(null);
}
private restoreSession() {
try {
const saved = localStorage.getItem('bookshelf_user');
if (saved) {
const user = JSON.parse(saved) as User;
this.currentUserSignal.set(user);
}
} catch {
localStorage.removeItem('bookshelf_user');
}
}
}