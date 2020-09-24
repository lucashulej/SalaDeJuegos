import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { errorMonitor } from 'events';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public afAuth: AngularFireAuth) { }

  signIn(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then((response: any) => {
        resolve(response);
      },(error: any) => {
        console.log(error);
        switch(error.code) {
          case "auth/wrong-password":
            reject("contrasena incorrecta");
            break;
          case "auth/user-not-found":
            reject("usuario no encontrado");
            break;
          case "auth/invalid-email":
            reject("mail invalido");
            break;
          case "auth/wrong-password":
            reject("contrasenia invalida");
            break;
          default:
            reject("ERROR desconocido");
            break;
        }
      });
    });
  }

  singUp(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((response: any) => {
        resolve(response);
      },(error: any) => {
        console.log(error);
        switch(error.code) {
          case "auth/weak-password":
            reject("contrasena corta");
            break;
          case "auth/user-not-found":
            reject("usuario no encontrado");
            break;
          case "auth/invalid-email":
            reject("mail invalido");
            break;
          case "auth/wrong-password":
            reject("contrasenia invalida");
            break;
          default:
            reject("ERROR desconocido");
            break;
        }
      });
    });
  }

  getUser() {
    return this.afAuth.currentUser;
  }

  signOut() {
    this.afAuth.signOut();
  }
}
