import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth.service';
@Component({
selector: 'app-no-permission',
standalone: true,
imports: [RouterLink],
template: `
<div class="denied-container">
<div class="denied-card">
<h2>Acceso Denegado</h2>
<p>
Tu rol actual es <strong>{{ authService.roleName() }}</strong>.
No tienes permisos para acceder a esta secci\u00f3n.
</p>
<div class="actions">
<a routerLink="/inicio" class="btn">Ir al inicio</a>
<a routerLink="/login" class="btn btn-alt">Cambiar usuario</a>
</div>
</div>
</div>
`,
styles: [`
.denied-container { display: flex; justify-content: center;
align-items: center; min-height: calc(100vh - 56px); }
.denied-card { text-align: center; background: white;
padding: 48px; border-radius: 16px;
box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 450px; }
h2 { color: #c62828; margin-bottom: 12px; }
p { color: #666; margin-bottom: 24px; line-height: 1.6; }
.actions { display: flex; gap: 12px; justify-content: center; }
.btn { padding: 10px 20px; background: #1565c0; color: white;
border-radius: 8px; text-decoration: none; font-weight: 600; }
.btn-alt { background: #f5f5f5; color: #333; border: 1px solid #ddd; }
`]
})
export class NoPermission {
authService = inject(AuthService);
}