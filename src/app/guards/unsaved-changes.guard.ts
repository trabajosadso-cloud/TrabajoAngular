import { CanDeactivateFn } from '@angular/router';
/**
* Interfaz que deben implementar los componentes
* que quieran usar este guard.
*/
export interface HasUnsavedChanges {
hasUnsavedChanges(): boolean;
}
/**
* Guard que pregunta al usuario antes de salir
* si tiene cambios sin guardar.
*/
export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> =
(component) => {
// Si el componente NO tiene cambios sin guardar, permitir salir
if (!component.hasUnsavedChanges()) {
return true;
}
// Si tiene cambios, preguntar al usuario
return window.confirm(
'Tienes cambios sin guardar. \u00bfSeguro que quieres salir?'
);
};