import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {serverTimestamp} from 'firebase/firestore';
import { Router } from '@angular/router';
import { Profil } from '../model/profil';
import { Observable, map, of, switchMap, from, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<Profil>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(user);
          return this.db.doc(`users/${user.uid}`).valueChanges();
        } else {
          console.log('null');
          return of(null);
        }
      }),
      map(data => data as Profil)
    )
  }

  signIn(email: string, password: string): Observable<any> {
    console.log(email, password);
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(user => {
        console.log('user');
        if (user.user) {
          console.log('connecte');
          return this.db.doc(`users/${user.user.uid}`).valueChanges();
        } else {
          console.log("introuvable");
          return of(null);
        }
      }),
      catchError((err) => {
        console.error('Erreur Firebase:', err);
        return throwError(err);
      })
    )
  }

  signUp(credentials: Profil, mdp: string) {
    console.log(credentials);
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, mdp).then(data => {
      if(data.user){
        return this.db.doc(`users/${data.user.uid}`).set({
          nom: credentials.nom,
          prenom: credentials.prenom,
          tel: credentials.tel,
          adresse: credentials.adresse,
          email: credentials.email,
          created: serverTimestamp()
        });
      } else {
        throw new Error('L\'inscription de l\'utilisateur a échoué')
      }
    });
  }

  sendPasswordReset(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  /*updateUser(name) {
    return this.db.doc(`users/${firebase.auth().currentUser.uid}`).update({
      name
    });
  }*/
}
