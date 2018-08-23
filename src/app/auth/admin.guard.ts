import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService
  ) {  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check();
  }

  check() : boolean {
    if (this.userService.isAdmin()) {
      return true
    }
    this.toastrService.info('You need to be logged in as admin for this action.')
    this.router.navigate(['/auth/signin'])
    return false
  }
}
