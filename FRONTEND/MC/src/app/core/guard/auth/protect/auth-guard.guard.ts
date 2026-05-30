import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map, catchError, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {

    return this.authService.isAuthenticated().pipe(
      map(() => true), 

      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}