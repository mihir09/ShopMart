import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { AppUser } from 'src/models/app-user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<firebase.User | null>;
  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(switchMap((user: any) => {
      if (user) return this.userService.get(user!.uid).valueChanges();
      return of(null);
    }))
  }

}
