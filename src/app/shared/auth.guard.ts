import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Changement: isAdmin() retourne maintenant un boolean
  if (authService.isAdmin()) {
    return true;
  } else {
    router.navigate(["/home"]);
    return false;
  }
};

