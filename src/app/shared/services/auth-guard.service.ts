import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {
  
  constructor(private auth:AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
    return this.auth.user$.pipe(map((user: any)=>
    {if (user) return true;
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }));
  }
}
