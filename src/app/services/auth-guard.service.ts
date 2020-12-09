import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }
  // canActivate permet de proteger mes routes de tout acces sans authentification.
  // cette methode retournera soit une Obersevable, une Promise ou une boolean
  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    return new Promise(
      (resolve, reject) =>{
        firebase.auth().onAuthStateChanged(
          // ici sera retourné un user, s'il existe et resolve sera true sinon false
          (user)=>{
            if(user){
              resolve(true);
            }else{
              // on renavige vers l'authentification ou dans se reconneter à nouveau
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
