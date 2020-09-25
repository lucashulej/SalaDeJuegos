import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  usuarios: Observable<any[]>;
  lista: any[];

  constructor(private authService : AuthService,private db : AngularFireDatabase) { 
    this.usuarios = this.db.list('usuarios').valueChanges(); 
    this.usuarios.subscribe(usuarios => this.lista = usuarios, error => console.log(error));
  }

  gano() {
    this.authService.getUser().then((response:any) => {
      console.log(response.uid);
      for (const usuario of this.lista) {
        if(usuario.id == response.uid) {
          this.db.list('usuarios').set(usuario.id,{email:usuario.email,password:usuario.password,gano:usuario.gano+1,perdio:usuario.perdio,id:usuario.id});
          break;
        }
      }
    });
  }

  perdio() {
    this.authService.getUser().then((response:any) => {
      console.log(response.uid);
      for (const usuario of this.lista) {
        if(usuario.id == response.uid) {
          this.db.list('usuarios').set(usuario.id,{email:usuario.email,password:usuario.password,gano:usuario.gano,perdio:usuario.perdio+1,id:usuario.id});
          break;
        }
      }
    });
  }
}
