import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

// permet à tout le monde de voir mais pas de modifier au lieu de d'avoir deux roles diff
export const authGuard: CanActivateFn = (route, state) => {
  return true; // Autoriser tous les utilisateurs à accéder aux routes de base
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isAdmin().then(isAdmin => {
    if (isAdmin) {
      return true;
    } else {
      router.navigate(["/home"]);
      return false;
    }
  });
};

