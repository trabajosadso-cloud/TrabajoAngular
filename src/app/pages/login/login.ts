import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, User } from '../../services/Auth.service';
@Component({
selector: 'app-login',
standalone: true,
template: `
<div class="login-container">
<div class="login-card">
<h2>Iniciar Sesi\u00f3n</h2>
<p class="subtitle">Selecciona un usuario para simular el login</p>
<div class="form-field">
<label>Nombre de usuario:</label>
<input
[value]="username()"
(input)="username.set($any($event.target).value)"
placeholder="Escribe tu nombre..."
/>
</div>
<div class="form-field">
<label>Rol:</label>
<select
[value]="selectedRole()"
(change)="selectedRole.set($any($event.target).value)">
<option value="admin">Administrador</option>
<option value="editor">Editor</option>
<option value="viewer">Lector</option>
</select>
</div>
<button
(click)="login()"
[disabled]="!username().trim()"
class="btn-login">
Entrar como {{ selectedRole() }}
</button>
<div class="demo-note">
<strong>Nota:</strong> En una app real, aqu\u00ed ir\u00eda
autenticaci\u00f3n contra un backend con HTTP.
</div>
</div>
</div>
`,
styles: [`
.login-container { display: flex; justify-content: center;
align-items: center; min-height: calc(100vh - 56px);
background: linear-gradient(135deg, #e3f2fd, #f5f5f5); }
.login-card { background: white; padding: 40px;
border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);
width: 100%; max-width: 420px; }
h2 { color: #1a237e; margin-bottom: 8px; }
.subtitle { color: #888; margin-bottom: 24px; font-size: 14px; }
.form-field { margin-bottom: 16px; display: flex;
flex-direction: column; gap: 6px; }
.form-field label { font-weight: 600; font-size: 14px; }
.form-field input, .form-field select { padding: 10px;
border: 1px solid #ccc; border-radius: 8px; font-size: 14px; }
.btn-login { width: 100%; padding: 12px; background: #1565c0;
color: white; border: none; border-radius: 8px; font-size: 16px;
font-weight: 600; cursor: pointer; margin-top: 8px; }
.btn-login:disabled { background: #ccc; cursor: not-allowed; }
.btn-login:hover:not(:disabled) { background: #0d47a1; }
.demo-note { margin-top: 20px; padding: 12px; background: #fff8e1;
border-radius: 8px; font-size: 13px; color: #666;
border-left: 3px solid #f9a825; }
`]
})
export class Login {
private authService = inject(AuthService);
private router = inject(Router);
private route = inject(ActivatedRoute);
username = signal('');
selectedRole = signal<User['role']>('editor');
login() {
const name = this.username().trim();
if (!name) return;
// Autenticar
this.authService.login(name, this.selectedRole());
// Redirigir a la URL original (si ven\u00eda de un guard)
const returnUrl = this.route.snapshot.queryParams['returnUrl'];
this.router.navigateByUrl(returnUrl || '/inicio');
}
}