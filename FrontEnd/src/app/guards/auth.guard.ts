import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private acc: AccountService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.acc.isLoggesIn.pipe(take(1), map((loginstatus: boolean) => {
      if (!loginstatus) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      } else { return true; }
      // return false;
    }));
  }

}
